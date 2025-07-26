import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
from chromadb.api.types import Documents, Embeddings
from embeddings import embed_texts
from typing import List, Dict

CHROMA_COLLECTION = "faqs"

class VectorStore:
    def __init__(self, persist_directory="chroma_db"):
        self.client = chromadb.Client(Settings(persist_directory=persist_directory))
        self.collection = self.client.get_or_create_collection(CHROMA_COLLECTION)

    def add_faqs(self, faqs: List[Dict]):
        questions = [faq["question"] for faq in faqs]
        ids = [str(faq["id"]) for faq in faqs]
        embeddings = embed_texts(questions)
        self.collection.add(ids=ids, documents=questions, embeddings=embeddings, metadatas=faqs)

    def update_faq(self, faq: Dict):
        self.delete_faq(faq["id"])
        self.add_faqs([faq])

    def delete_faq(self, faq_id):
        self.collection.delete(ids=[str(faq_id)])

    def query(self, query: str, n_results=3):
        embedding = embed_texts([query])[0]
        results = self.collection.query(query_embeddings=[embedding], n_results=n_results)
        return results 