import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    question: '',
    answer: ''
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/faqs');
      setFaqs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch FAQs');
      console.error('Error fetching FAQs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      question: '',
      answer: ''
    });
    setEditingFaq(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(null);
      
      if (editingFaq) {
        // Update existing FAQ
        await axios.put(`/faqs/${editingFaq.id}`, formData);
      } else {
        // Add new FAQ
        const newId = Math.max(...faqs.map(f => f.id), 0) + 1;
        await axios.post('/faqs', { ...formData, id: newId });
      }
      
      resetForm();
      fetchFaqs();
    } catch (err) {
      setError(editingFaq ? 'Failed to update FAQ' : 'Failed to add FAQ');
      console.error('Error saving FAQ:', err);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      id: faq.id,
      question: faq.question,
      answer: faq.answer
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    try {
      setError(null);
      await axios.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (err) {
      setError('Failed to delete FAQ');
      console.error('Error deleting FAQ:', err);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="admin-panel">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>⚙️ FAQ Management</h2>
        <p>Add, edit, or delete frequently asked questions about Indian labor laws</p>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="admin-content">
        <div className="form-section">
          <div className="card">
            <h3>{editingFaq ? '✏️ Edit FAQ' : '➕ Add New FAQ'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="question" className="form-label">Question:</label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter the question..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="answer" className="form-label">Answer:</label>
                <textarea
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Enter the answer..."
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingFaq ? 'Update FAQ' : 'Add FAQ'}
                </button>
                {editingFaq && (
                  <button type="button" onClick={handleCancel} className="btn btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="faqs-section">
          <div className="card">
            <h3>📋 Current FAQs ({faqs.length})</h3>
            {faqs.length === 0 ? (
              <div className="empty-state">
                <p>No FAQs found. Add your first FAQ above!</p>
              </div>
            ) : (
              <div className="faqs-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <div className="faq-content">
                      <h4>Q: {faq.question}</h4>
                      <p>A: {faq.answer}</p>
                    </div>
                    <div className="faq-actions">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="btn btn-secondary"
                        title="Edit FAQ"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="btn btn-danger"
                        title="Delete FAQ"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 