from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chatbot import chat_with_ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {
        "message": "Portfolio AI Backend Running"
    }

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        reply = chat_with_ai(request.message)
        return {"reply": reply}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/test")
def test():
    return {"status": "working"}

@app.get("/test-groq")
def test_groq():
    return {
        "result": chat_with_ai("hello")
    }