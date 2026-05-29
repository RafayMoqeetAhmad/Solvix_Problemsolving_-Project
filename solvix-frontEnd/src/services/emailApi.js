// src/services/emailApi.js

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// ─── Reusable fetch helper ─────────────────────────────────────────
const apiPost = async (endpoint, body) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    if (error.name === 'TypeError') {
      console.error(`❌ Network error — is backend running at ${BASE_URL}?`);
      return { success: false, error: 'Network error. Backend server se connection nahi hua.' };
    }
    console.error(`❌ API error [${endpoint}]:`, error.message);
    return { success: false, error: error.message };
  }
};

// ─── 1. Notify admin when user submits a problem ───────────────────
export const notifyAdminNewProblem = async (problem, user) => {
  if (!problem || !user) {
    console.warn('⚠️ problem aur user dono required hain');
    return { success: false, error: 'Missing problem or user data' };
  }
  return await apiPost('/api/email/notify-admin', { problem, user });
};

// ─── 2. Notify user when admin solves a problem ────────────────────
export const notifyUserProblemSolved = async (problem, adminReply) => {
  if (!problem || !adminReply) {
    console.warn('⚠️ problem aur adminReply dono required hain');
    return { success: false, error: 'Missing problem or adminReply data' };
  }
  return await apiPost('/api/email/notify-user', { problem, adminReply });
};