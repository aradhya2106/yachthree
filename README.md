# Legal Rights FAQ Chatbot for Indian Labor Laws

A comprehensive RAG (Retrieval-Augmented Generation) chatbot that helps employees and employers navigate Indian labor law queries using AI-powered responses grounded in a curated knowledge base.

##  Features

- **AI-Powered Chat Interface**: Ask questions about Indian labor laws and get instant, accurate answers
- **Live FAQ Management**: Add, edit, or delete FAQs through an intuitive admin panel
- **Real-time Updates**: Changes to the knowledge base immediately affect chatbot responses
- **Source Attribution**: See which FAQs were used to generate each answer
- **Modern UI**: Clean, responsive design with glassmorphism effects and smooth animations
- **Vector Search**: Fast semantic search using ChromaDB embeddings

##  Tech Stack

### Backend
- **Python 3.8+** with FastAPI
- **ChromaDB**: Free, local vector database for embeddings
- **Sentence Transformers**: For generating text embeddings
- **Groq Llama-3**: Open-source LLM for answer generation

### Frontend
- **React 18** with modern hooks
- **Axios**: HTTP client for API communication
- **CSS3**: Custom styling with glassmorphism and animations

##  Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.8 or higher**
- **Node.js 14 or higher**
- **npm or yarn**
- **Git**

##  Quick Start

### 1. Clone the Repository
```bash
git clone 
cd legal-rights-chatbot
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
# Install all required packages
pip install -r requirements.txt
```

#### Configure API Key
The project uses Groq's Llama-3 API. You need to:
1. Get a free API key from [Groq Console](https://console.groq.com/)
2. Replace the API key in `main.py`:
```python
GROQ_API_KEY = "your_groq_api_key_here"
```

#### Start the Backend Server
```bash
# Start FastAPI server with auto-reload
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Install Node.js Dependencies
```bash
# Install React dependencies
npm install
```

#### Start the React Development Server
```bash
# Start React development server
npm start
```

The frontend will be available at `http://localhost:3000`

##  Usage

### Chat Interface
1. Navigate to the **Chat Interface** tab
2. Ask questions about Indian labor laws, such as:
   - "What is the minimum wage in India?"
   - "What are the rules for paid leave?"
   - "Can an employer terminate without notice?"
   - "How is overtime calculated?"
3. View AI-generated answers with source attribution

### Admin Panel
1. Navigate to the **Admin Panel** tab
2. **Add FAQ**: Fill in the form and click "Add FAQ"
3. **Edit FAQ**: Click the edit button (✏️) on any FAQ
4. **Delete FAQ**: Click the delete button (🗑️) on any FAQ
5. All changes are immediately reflected in the chatbot

## 🔧 API Endpoints

### Chat
- `POST /chat` - Send a question and get an AI-generated answer

### FAQ Management
- `GET /faqs` - Get all FAQs
- `POST /faqs` - Add a new FAQ
- `PUT /faqs/{id}` - Update an existing FAQ
- `DELETE /faqs/{id}` - Delete a FAQ



##  Demo Flow

1. **Add a new FAQ** through the Admin Panel
2. **Ask a related question** in the Chat Interface
3. **Observe the change** - the bot's response reflects the new information
4. **View sources** - see which FAQs were used to generate the answer

##  Environment Variables

The following environment variables can be configured:

- `GROQ_API_KEY`: Your Groq API key (required for LLM integration)


# If ChromaDB import fails
pip install chromadb

# If sentence-transformers fails
pip install sentence-transformers

# If FastAPI fails to start
pip install fastapi uvicorn
```

#### Frontend Issues
```bash
# If npm install fails
npm cache clean --force
npm install

# If React fails to start
npm start --reset-cache
```

#### API Connection Issues
- Ensure backend is running on `http://localhost:8000`
- Check that Groq API key is valid
- Verify network connectivity

### Port Conflicts
If ports are already in use:
```bash
# Backend (change port)
uvicorn main:app --reload --port 8001

# Frontend (change port)
PORT=3001 npm start
```

## 🚀 Deployment

### Backend Deployment
```bash
# Production server
uvicorn main:app --host 0.0.0.0 --port 8000

# With Gunicorn (recommended for production)
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve static files
npx serve -s build
```

## Development

### Adding New Features
1. Backend changes: Modify `main.py` and related files
2. Frontend changes: Modify React components in `src/`
3. Styling changes: Update CSS files
4. Test thoroughly before committing

### Code Style
- Python: Follow PEP 8 guidelines
- JavaScript: Use ES6+ features
- CSS: Use CSS custom properties and modern features


##  Acknowledgments

- **Groq** for providing the Llama-3 API
- **ChromaDB** for the vector database
- **FastAPI** for the high-performance web framework
- **React** for the UI framework
- The open-source community for the tools and libraries used

<img width="1915" height="898" alt="image" src="https://github.com/user-attachments/assets/12da4d81-c027-4252-a241-2dfe8cc62ee1" />

<img width="1874" height="881" alt="image" src="https://github.com/user-attachments/assets/a4797b96-e132-4a86-8dd8-0359bd4913d8" />
<img width="1261" height="838" alt="image" src="https://github.com/user-attachments/assets/40127f15-e078-4933-b1c1-99bfccf54ff7" />

