// components/SubmitProblemForm.jsx
import { useState } from 'react';
import { notifyAdminNewProblem } from '../services/emailApi';

const SubmitProblemForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Get current logged-in user from localStorage (or your auth context)
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save problem to DB
      const res = await fetch('http://localhost:5000/api/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const savedProblem = await res.json();

      // 2. Send email notification to admin
      const emailResult = await notifyAdminNewProblem(
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
        },
        {
          name: currentUser?.name || currentUser?.username,
          email: currentUser?.email,
        }
      );

      if (emailResult.success) {
        setMessage('✅ Problem has been submitted successfully! The admin has been notified..');
        setFormData({ title: '', category: '', description: '' }); // form reset
      } else {
        setMessage('⚠️Problem was saved successfully, but the email was not sent.');
      }

    } catch (error) {
      console.error('Submit error:', error);
      setMessage('❌ Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Problem ka title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Category chunein</option>
        <option value="Technical">Technical</option>
        <option value="Billing">Billing</option>
        <option value="General">General</option>
      </select>

      <textarea
        name="description"
        placeholder="Problem ki detail likhein..."
        value={formData.description}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submit ho rahi hai...' : 'Problem Submit Karein'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default SubmitProblemForm;