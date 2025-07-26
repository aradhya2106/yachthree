from sentence_transformers import SentenceTransformer
from typing import List

model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_texts(texts: List[str]) -> List[list]:
    """Embed a list of texts into vectors."""
    return model.encode(texts, convert_to_numpy=True).tolist() 