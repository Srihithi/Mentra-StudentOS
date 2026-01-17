import google.generativeai as genai
import os


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))"

print(f"🔍 Testing API Key: {KEY[:10]}...")

try:
    genai.configure(api_key=KEY)
    
    # 1. List what models this key can actually access
    print("\n📋 available models for this key:")
    found_any = False
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f" - {m.name}")
            found_any = True
    
    if not found_any:
        print("❌ ERROR: This key cannot access ANY models. Check Google AI Studio settings.")
    else:
        # 2. Try to generate a simple "Hello"
        print("\n🧪 Attempting to generate text...")
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content("Hello")
        print(f"✅ SUCCESS! Response: {response.text}")

except Exception as e:
    print(f"\n🔥 FATAL ERROR:\n{str(e)}")