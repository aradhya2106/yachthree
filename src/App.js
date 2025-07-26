import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>Legal Rights FAQ Chatbot</h1>
          <p>Indian Labor Law Assistant</p>
        </div>
      </header>

      <nav className="app-nav">
        <div className="container">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 Chat Interface
            </button>
            <button
              className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              ⚙️ Admin Panel
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        <div className="container">
          {activeTab === 'chat' ? <ChatInterface /> : <AdminPanel />}
        </div>
      </main>
    </div>
  );
}

export default App; 