import React, { useState } from 'react';
import '../styles/MyProblems.css';

const BASE_URL = 'http://localhost:5000/api';

const CATEGORIES = [
  'Hardware', 'Software', 'Network',
  'Printer', 'Email', 'Security', 'Other'
];

function MyProblems({ user, problems, onUpdateProblem, onDeleteProblem }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // ✅ MongoDB _id use karo (user ki jagah userId nahi)
  const userProblems = problems.filter(p => 
    p.user?._id === user.id || p.user === user.id
  );

  const filteredProblems = userProblems.filter(problem => {
    const categoryMatch = filterCategory === 'all' || problem.category === filterCategory;
    const statusMatch = filterStatus === 'all' || problem.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  // ✅ Rating API call
  const handleRating = async (problemId, rating) => {
    try {
      const res = await fetch(`${BASE_URL}/problems/${problemId}/rate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ rating })
      });

      const data = await res.json();

      if (res.ok) {
        onUpdateProblem(data.data); // ✅ updated problem state mein save
      }
    } catch (error) {
      console.error('Rating error:', error);
    }
  };

  return (
    <div className="my-problems">
      <div className="container">
        <div className="my-problems-header">
          <h1>My Problems</h1>
          <p>View and manage all your submitted problems</p>
        </div>

        <div className="filters">
          <div>
            <label>Category: </label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Status: </label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="solved">Solved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {filteredProblems.length > 0 ? (
          <div className="problems-list">
            {filteredProblems.map(problem => (
              <div key={problem._id} className="problem-card">
                <div className="problem-card-header">
                  <div>
                    <div className="problem-card-title">{problem.title}</div>
                    <div className="problem-card-meta">
                      <span className={`badge badge-${problem.status === 'solved' ? 'success' : 'warning'}`}>
                        {problem.category}
                      </span>
                      <span>•</span>
                      <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={`badge badge-${problem.status === 'solved' ? 'success' : 'warning'}`}>
                        {problem.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="problem-card-body">
                  <div className="problem-card-description">
                    {problem.description}
                  </div>

                  {problem.solution && (
                    <div className="problem-card-solution">
                      <h4>Solution:</h4>
                      <ol className="solution-steps">
                        {problem.solution.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                      {problem.solution.additionalInfo && (
                        <p style={{ marginTop: '10px', fontSize: '13px', color: '#0c4a6e' }}>
                          💡 {problem.solution.additionalInfo}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="problem-card-footer">
                  <div>
                    <span style={{ marginRight: '10px', fontSize: '14px', color: '#6b7280' }}>
                      Rate this solution:
                    </span>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={`star ${problem.rating >= star ? 'filled' : ''}`}
                          onClick={() => handleRating(problem._id, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteProblem(problem._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-problems-message">
            <h3>No problems found</h3>
            <p>
              {filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by submitting your first problem!'}
            </p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/submit-problem'}>
              Submit Problem
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProblems;