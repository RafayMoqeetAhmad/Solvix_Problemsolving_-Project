import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard({ user, problems }) {
  const navigate = useNavigate();

  const solvedCount = problems.filter(p => p.status === 'solved').length;
  const pendingCount = problems.filter(p => p.status === 'pending').length;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user.name}!</h1>
          <p>Here's an overview of your problem-solving journey</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Problems</h3>
            <p>{problems.length}</p>
          </div>
          <div className="stat-card success">
            <h3>Solved</h3>
            <p>{solvedCount}</p>
          </div>
          <div className="stat-card warning">
            <h3>Pending</h3>
            <p>{pendingCount}</p>
          </div>
          <div className="stat-card info">
            <h3>Success Rate</h3>
            <p>{problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0}%</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <div className="action-card" onClick={() => navigate('/submit-problem')}>
              <div className="action-card-icon">➕</div>
              <h3>Submit New Problem</h3>
              <p>Get AI-powered solutions instantly</p>
            </div>
            <div className="action-card" onClick={() => navigate('/tutorials')}>
              <div className="action-card-icon">📚</div>
              <h3>Browse Tutorials</h3>
              <p>Learn from step-by-step guides</p>
            </div>
            <div className="action-card" onClick={() => navigate('/my-problems')}>
              <div className="action-card-icon">📋</div>
              <h3>My Problems</h3>
              <p>View all your submissions</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="recent-problems">
            <h3>Recent Problems</h3>
            {problems.length > 0 ? (
              problems.slice(0, 5).map(problem => (
                <div key={problem._id} className="problem-item">
                  <div className="problem-item-header">
                    <div className="problem-item-title">{problem.title}</div>
                    <span className="problem-item-category">{problem.category}</span>
                  </div>
                  <div className="problem-item-description">{problem.description}</div>
                  <div className="problem-item-footer">
                    <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
                    <span className={`problem-status ${problem.status}`}>
                      {problem.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-problems">
                <p>No problems submitted yet. Start by submitting your first problem!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;