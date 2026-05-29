import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubmitProblem from './pages/SubmitProblem';
import MyProblems from './pages/MyProblems';
import Tutorials from './pages/Tutorials';
import Admin from './pages/Admin';
import './styles/App.css';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://solvix-problemsolving-backend.onrender.com/api';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('solvix_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [problems, setProblems] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const problemsUrl = user.role === 'admin'
          ? `${BASE_URL}/admin/problems`
          : `${BASE_URL}/problems`;

        const [problemsRes, tutorialsRes] = await Promise.all([
          fetch(problemsUrl, {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          fetch(`${BASE_URL}/tutorials`)
        ]);

        const problemsData = await problemsRes.json();
        const tutorialsData = await tutorialsRes.json();

        setProblems(problemsData.data || []);
        setTutorials(tutorialsData.data || []);
      } catch (error) {
        console.error('Data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogin = (userData) => {
    localStorage.setItem('solvix_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('solvix_user');
    setUser(null);
    setProblems([]);
    setTutorials([]);
  };

  // Backend khud email bhejta hai — frontend ko kuch nahi karna
  const handleAddProblem = (problem) => {
    setProblems(prev => [problem, ...prev]);
  };

  const handleUpdateProblem = (updatedProblem) => {
    setProblems(prev =>
      prev.map(p => p._id === updatedProblem._id ? updatedProblem : p)
    );
  };

  const handleDeleteProblem = async (problemId) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;
    try {
      await fetch(`${BASE_URL}/problems/${problemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProblems(prev => prev.filter(p => p._id !== problemId));
    } catch (error) {
      console.error('Problem delete error:', error);
    }
  };

  const handleAddTutorial = async (tutorial) => {
    try {
      const res = await fetch(`${BASE_URL}/tutorials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(tutorial)
      });
      const data = await res.json();
      setTutorials(prev => [...prev, data.data]);
    } catch (error) {
      console.error('Tutorial add error:', error);
    }
  };

  const handleDeleteTutorial = async (tutorialId) => {
    if (!window.confirm('Are you sure you want to delete this tutorial?')) return;
    try {
      await fetch(`${BASE_URL}/tutorials/${tutorialId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTutorials(prev => prev.filter(t => t._id !== tutorialId));
    } catch (error) {
      console.error('Tutorial delete error:', error);
    }
  };

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/" element={<ProtectedRoute><Dashboard user={user} problems={problems} /></ProtectedRoute>} />
          <Route path="/submit-problem" element={<ProtectedRoute><SubmitProblem user={user} onAddProblem={handleAddProblem} /></ProtectedRoute>} />
          <Route path="/my-problems" element={<ProtectedRoute><MyProblems user={user} problems={problems} onUpdateProblem={handleUpdateProblem} onDeleteProblem={handleDeleteProblem} /></ProtectedRoute>} />
          <Route path="/tutorials" element={<ProtectedRoute><Tutorials tutorials={tutorials} user={user} /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin user={user} problems={problems} onDeleteProblem={handleDeleteProblem} onUpdateProblem={handleUpdateProblem} tutorials={tutorials} onAddTutorial={handleAddTutorial} onDeleteTutorial={handleDeleteTutorial} /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;