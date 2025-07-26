import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from vector_store import VectorStore
import requests
from dotenv import load_dotenv
import os

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama3-8b-8192"

app = FastAPI()

vector_store = VectorStore()

with open("faqs.json", "r", encoding="utf-8") as f:
    faqs = json.load(f)
    # Initialize vector store with existing FAQs
    vector_store.add_faqs(faqs)

def save_faqs():
    with open("faqs.json", "w", encoding="utf-8") as f:
        json.dump(faqs, f, indent=2, ensure_ascii=False)

class FAQ(BaseModel):
    id: int
    question: str
    answer: str

class ChatRequest(BaseModel):
    question: str

def generate_llama3_answer(question: str, faqs: list) -> str:
    context = "\n".join([f"Q: {faq['question']}\nA: {faq['answer']}" for faq in faqs])
    prompt = (
        f"You are a helpful assistant for Indian labor law. "
        f"Use the following FAQs as context to answer the user's question.\n"
        f"FAQs:\n{context}\n"
        f"User question: {question}\n"
        f"Answer:"
    )
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant for Indian labor law."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 512,
        "temperature": 0.2
    }
    response = requests.post(GROQ_API_URL, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
    return result["choices"][0]["message"]["content"].strip()

@app.get("/")
def read_root():
    return {"message": "Legal Rights FAQ Chatbot Backend"}

@app.get("/faqs", response_model=List[FAQ])
def get_faqs():
    return faqs

@app.post("/faqs", response_model=FAQ)
def add_faq(faq: FAQ):
    if any(f["id"] == faq.id for f in faqs):
        raise HTTPException(status_code=400, detail="FAQ with this ID already exists.")
    faqs.append(faq.dict())
    save_faqs()
    vector_store.add_faqs([faq.dict()])
    return faq

@app.put("/faqs/{faq_id}", response_model=FAQ)
def update_faq(faq_id: int, faq: FAQ):
    for idx, f in enumerate(faqs):
        if f["id"] == faq_id:
            faqs[idx] = faq.dict()
            save_faqs()
            vector_store.update_faq(faq.dict())
            return faq
    raise HTTPException(status_code=404, detail="FAQ not found.")

@app.delete("/faqs/{faq_id}")
def delete_faq(faq_id: int):
    global faqs
    new_faqs = [f for f in faqs if f["id"] != faq_id]
    if len(new_faqs) == len(faqs):
        raise HTTPException(status_code=404, detail="FAQ not found.")
    faqs[:] = new_faqs
    save_faqs()
    vector_store.delete_faq(faq_id)
    return {"detail": "FAQ deleted."}

@app.post("/chat")
def chat(request: ChatRequest):
    results = vector_store.query(request.question, n_results=3)
    faqs_found = results["metadatas"][0] if results["metadatas"] else []
    answer = generate_llama3_answer(request.question, faqs_found)
    return {
        "question": request.question,
        "relevant_faqs": faqs_found,
        "answer": answer
    } 