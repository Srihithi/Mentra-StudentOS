import os
import time
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

class StudentAI:
    def __init__(self):
        self.db_path = "./student_db"
        # FIX: Uses Local CPU Embeddings (Free, No Quota Limits, No DLL Crash)
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
    def _get_llm(self, api_key: str):
        os.environ["GOOGLE_API_KEY"] = api_key
        return ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)

    def process_file(self, file_path: str, api_key: str):
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        # We can use small chunks now because local embeddings are free!
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        
        vectorstore = Chroma.from_documents(
            documents=splits, 
            embedding=self.embeddings, 
            persist_directory=self.db_path
        )
        return f"✅ Processed {len(splits)} segments using Local AI."

    def ask_question(self, query: str, api_key: str):
        llm = self._get_llm(api_key)
        vectorstore = Chroma(persist_directory=self.db_path, embedding_function=self.embeddings)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

        template = """
        You are a smart student assistant. Use the context below to answer.
        Context: {context}
        Question: {question}
        """
        prompt = ChatPromptTemplate.from_template(template)
        
        chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        return chain.invoke(query)

    def prioritize_tasks(self, tasks: list, api_key: str):
        """New Feature: Asks Gemini to organize your to-do list."""
        llm = self._get_llm(api_key)
        task_str = ", ".join(tasks)
        prompt = f"""
        I have these tasks to do: {task_str}. 
        Please reorder them by priority (what should I do first?) and give a 1-sentence reason why.
        Format as a simple numbered list.
        """
        return llm.invoke(prompt).content
class StudentAI:
    def __init__(self):
        self.db_path = "./student_db"
        # We define the tools, but we don't initialize them until we have the API Key
        
    def _get_tools(self, api_key):
        os.environ["GOOGLE_API_KEY"] = api_key
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
        return embeddings, llm

    def process_file(self, file_path: str, api_key: str):
        embeddings, _ = self._get_tools(api_key)
        
        # 1. Load PDF
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        
        # 2. Split Text
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        
        # 3. Initialize DB
        vectorstore = Chroma(
            persist_directory=self.db_path, 
            embedding_function=embeddings
        )

        # 4. SMART UPLOAD (Prevents 429 Quota Error)
        # We upload 5 chunks at a time, then wait 2 seconds.
        batch_size = 5
        total_batches = len(splits) // batch_size + 1
        
        print(f"Processing {len(splits)} chunks. This will take a moment to avoid limits...")
        
        for i in range(0, len(splits), batch_size):
            batch = splits[i : i + batch_size]
            if batch:
                vectorstore.add_documents(batch)
                print(f"Saved batch {i//batch_size + 1}/{total_batches}")
                time.sleep(2) # The magic pause that fixes the error
                
        return f"✅ Successfully studied {len(splits)} segments!"

    def ask_question(self, query: str, api_key: str):
        embeddings, llm = self._get_tools(api_key)
        
        vectorstore = Chroma(persist_directory=self.db_path, embedding_function=embeddings)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

        template = """
        You are a smart student assistant. Use the context below to answer.
        Context: {context}
        Question: {question}
        """
        prompt = ChatPromptTemplate.from_template(template)
        
        chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        return chain.invoke(query)

    def prioritize_tasks(self, tasks: list, api_key: str):
        _, llm = self._get_tools(api_key)
        task_str = ", ".join(tasks)
        prompt = f"""
        I have these tasks: {task_str}. 
        Please prioritize them (Most important first) and give a 1-sentence strategy for each.
        Return a simple numbered list.
        """
        return llm.invoke(prompt).content