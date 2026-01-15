from fastapi import FastAPI, UploadFile, File, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import google.generativeai as genai
from pypdf import PdfReader
import io
import json
import os
import time
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Storage
student_memory = {}

# Storage directories
STORAGE_DIR = "./student_data"
PROJECTS_FILE = os.path.join(STORAGE_DIR, "projects.json")
DRAWINGS_FILE = os.path.join(STORAGE_DIR, "drawings.json")
USERS_FILE = os.path.join(STORAGE_DIR, "users.json")

# Ensure storage directory exists
os.makedirs(STORAGE_DIR, exist_ok=True)

class TaskList(BaseModel):
    tasks: list[str]

class Project(BaseModel):
    id: int
    name: str
    tasks: list
    createdAt: str

class Drawing(BaseModel):
    id: int
    name: str
    data: str
    createdAt: str

class UserLogin(BaseModel):
    name: str
    email: str
    studentId: Optional[str] = None

class UserData(BaseModel):
    id: int
    name: str
    email: str
    studentId: Optional[str] = None
    loginTime: str

# --- THE FIX: DYNAMICALLY FIND A WORKING MODEL ---
def get_working_model(api_key):
    genai.configure(api_key=api_key)
    
    print("🔍 Asking Google for available models...")
    try:
        # Get list of ALL models your key can access
        all_models = list(genai.list_models())
        
        # Filter for models that can "generateContent" (Chat)
        chat_models = [m for m in all_models if 'generateContent' in m.supported_generation_methods]
        
        if not chat_models:
            raise Exception("Your key is valid, but has NO chat models allowed.")
        
        # Pick the first one found (e.g., 'models/nano-banana-pro-preview')
        best_model = chat_models[0]
        print(f"✅ Auto-Selected Model: {best_model.name}")
        return genai.GenerativeModel(best_model.name)
        
    except Exception as e:
        print(f"❌ Error finding models: {e}")
        raise e

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...), x_api_key: str = Header(None)):
    if not x_api_key: return JSONResponse(status_code=400, content={"message": "❌ API Key missing."})
    
    print(f"📥 Receiving file: {file.filename}")
    if not file.filename.lower().endswith('.pdf'):
        return JSONResponse(status_code=400, content={"message": "❌ Please upload a PDF."})

    try:
        content = await file.read()
        pdf = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf.pages:
            text += page.extract_text() + "\n"
        
        student_memory[x_api_key] = text
        print(f"✅ Success! Read {len(text)} characters.")
        return {"message": f"✅ Success! Read {len(pdf.pages)} pages."}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Server Error: {str(e)}"})

@app.get("/chat")
async def chat_with_gemini(query: str, x_api_key: str = Header(None)):
    if not x_api_key: return {"answer": "API Key missing."}
    
    context = student_memory.get(x_api_key, "")
    if not context: return {"answer": "⚠️ Please upload a PDF first!"}
    
    prompt = f"Context:\n{context}\n\nQuestion: {query}"
    
    try:
        # Auto-detect model
        model = get_working_model(x_api_key)
        response = model.generate_content(prompt)
        return {"answer": response.text}
    except Exception as e:
        return {"answer": f"❌ AI Error: {str(e)}"}

@app.post("/prioritize")
async def prioritize_tasks(data: TaskList, x_api_key: str = Header(None)):
    if not x_api_key: return {"plan": "API Key missing."}
    
    tasks_str = "\n".join(f"- {t}" for t in data.tasks)
    prompt = f"Prioritize these tasks:\n{tasks_str}"
    
    try:
        model = get_working_model(x_api_key)
        response = model.generate_content(prompt)
        return {"plan": response.text}
    except Exception as e:
        return {"plan": f"Error: {str(e)}"}

# --- PROJECTS ENDPOINTS ---
def load_projects(user_key: str) -> list:
    """Load projects for a user"""
    try:
        if os.path.exists(PROJECTS_FILE):
            with open(PROJECTS_FILE, 'r') as f:
                all_projects = json.load(f)
                return all_projects.get(user_key, [])
    except:
        pass
    return []

def save_projects(user_key: str, projects: list):
    """Save projects for a user"""
    all_projects = {}
    if os.path.exists(PROJECTS_FILE):
        try:
            with open(PROJECTS_FILE, 'r') as f:
                all_projects = json.load(f)
        except:
            pass
    all_projects[user_key] = projects
    with open(PROJECTS_FILE, 'w') as f:
        json.dump(all_projects, f, indent=2)

@app.get("/projects")
async def get_projects(x_api_key: str = Header(None)):
    if not x_api_key: return {"projects": []}
    projects = load_projects(x_api_key)
    return {"projects": projects}

@app.post("/projects")
async def save_projects_endpoint(projects: list, x_api_key: str = Header(None)):
    if not x_api_key: return {"success": False, "message": "API Key missing."}
    save_projects(x_api_key, projects)
    return {"success": True, "message": "Projects saved."}

# --- DRAWINGS ENDPOINTS ---
def load_drawings(user_key: str) -> list:
    """Load drawings for a user"""
    try:
        if os.path.exists(DRAWINGS_FILE):
            with open(DRAWINGS_FILE, 'r') as f:
                all_drawings = json.load(f)
                return all_drawings.get(user_key, [])
    except:
        pass
    return []

def save_drawings(user_key: str, drawings: list):
    """Save drawings for a user"""
    all_drawings = {}
    if os.path.exists(DRAWINGS_FILE):
        try:
            with open(DRAWINGS_FILE, 'r') as f:
                all_drawings = json.load(f)
        except:
            pass
    all_drawings[user_key] = drawings
    with open(DRAWINGS_FILE, 'w') as f:
        json.dump(all_drawings, f, indent=2)

@app.get("/drawings")
async def get_drawings(x_api_key: str = Header(None)):
    if not x_api_key: return {"drawings": []}
    drawings = load_drawings(x_api_key)
    return {"drawings": drawings}

@app.post("/drawings")
async def save_drawings_endpoint(drawings: list, x_api_key: str = Header(None)):
    if not x_api_key: return {"success": False, "message": "API Key missing."}
    save_drawings(x_api_key, drawings)
    return {"success": True, "message": "Drawings saved."}

# --- NOTES AI HELP ENDPOINT ---
class NotesAIHelp(BaseModel):
    prompt: str
    type: str

@app.post("/notes/ai-help")
async def notes_ai_help(data: NotesAIHelp, x_api_key: str = Header(None)):
    if not x_api_key: return {"result": "API Key missing."}
    
    try:
        model = get_working_model(x_api_key)
        response = model.generate_content(data.prompt)
        return {"result": response.text}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}

# --- USER AUTHENTICATION ENDPOINTS ---
def load_users() -> dict:
    """Load all users"""
    try:
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as f:
                return json.load(f)
    except:
        pass
    return {}

def save_user(user_data: dict):
    """Save or update user data"""
    users = load_users()
    user_id = str(user_data.get('id', user_data.get('email')))
    users[user_id] = user_data
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@app.post("/auth/login")
async def login_user(user: UserLogin):
    """Login or register a user"""
    try:
        # Check if user exists
        users = load_users()
        user_id = None
        
        # Find user by email
        for uid, u in users.items():
            if u.get('email') == user.email:
                user_id = uid
                break
        
        current_time = time.time()
        if user_id:
            # Update login time
            user_data = users[user_id]
            user_data['loginTime'] = time.strftime('%Y-%m-%dT%H:%M:%S', time.localtime(current_time))
            user_data['name'] = user.name  # Update name in case it changed
        else:
            # Create new user
            user_id = str(int(current_time * 1000))
            user_data = {
                'id': int(user_id),
                'name': user.name,
                'email': user.email,
                'studentId': user.studentId if user.studentId else None,
                'loginTime': time.strftime('%Y-%m-%dT%H:%M:%S', time.localtime(current_time))
            }
        
        save_user(user_data)
        return {"success": True, "user": user_data}
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "message": str(e)})

@app.get("/auth/user/{user_id}")
async def get_user(user_id: str):
    """Get user data by ID"""
    users = load_users()
    if user_id in users:
        return {"success": True, "user": users[user_id]}
    return JSONResponse(status_code=404, content={"success": False, "message": "User not found"})

@app.get("/auth/users")
async def get_all_users():
    """Get all users (admin endpoint)"""
    users = load_users()
    return {"success": True, "users": list(users.values())}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)