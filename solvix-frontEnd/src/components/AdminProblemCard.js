// components/AdminProblemCard.jsx
import { useState } from 'react';
import { notifyUserProblemSolved } from '../services/emailApi';

const AdminProblemCard = ({ problem }) => {
  const [adminReply, setAdminReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSolved, setIsSolved] = useState(problem.status === 'solved');

  const handleResolve = async () => {
    if (!adminReply.trim()) {
      setMessage('⚠️ Read the reply first.');
      return;
    }

    setLoading(true);

    try {
      // 1. Update problem status in DB
      const res = await fetch(`http://localhost:5000/api/problems/${problem._id}/solve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'solved', adminReply }),
      });

      if (!res.ok) throw new Error('DB update failed');

      // 2. Email the user
      const emailResult = await notifyUserProblemSolved(
        {
          _id: problem._id,
          title: problem.title,
          category: problem.category,
          user: problem.user, // { name, email } must exist
        },
        adminReply
      );

      if (emailResult.success) {
        setMessage('✅Successfully resolved the issue and informed the user via email.”!');
        setIsSolved(true);
      } else {
        setMessage('⚠️ The status was updated successfully, but the email could not be sent.');
      }

    } catch (error) {
      console.error('Resolve error:', error);
      setMessage('❌ Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
      
      {/* Problem Info */}
      <h3>{problem.title}</h3>
      <p><strong>Category:</strong> {problem.category}</p>
      <p><strong>Description:</strong> {problem.description}</p>
      <p><strong>User:</strong> {problem.user?.name} ({problem.user?.email})</p>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: isSolved ? 'green' : 'orange' }}>
          {isSolved ? '✅ Solved' : '⏳ Pending'}
        </span>
      </p>

      {/* Reply Box — only show if not solved */}
      {!isSolved && (
        <>
          <textarea
            rows={4}
            placeholder="Issue has been resolved. Please check now.
..."
            value={adminReply}
            onChange={(e) => setAdminReply(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />

          <button
            onClick={handleResolve}
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              background: loading ? '#9CA3AF' : '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Processing...' : 'Mark as Solved & Notify User'}
          </button>
        </>
      )}

      {/* Feedback message */}
      {message && (
        <p style={{ marginTop: '8px', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminProblemCard;