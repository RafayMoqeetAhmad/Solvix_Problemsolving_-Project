# Frontend Integration Guide

## Connecting React Frontend to Backend API

### Step 1: Update Frontend to Use API

In your React app, create an API utility file:

**`src/utils/api.js`**
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

### Step 2: Update Authentication

**`src/services/authService.js`**
```javascript
import api from '../utils/api';

export const authService = {
  // Register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  }
};
```

### Step 3: Update Problem Service

**`src/services/problemService.js`**
```javascript
import api from '../utils/api';

export const problemService = {
  // Create problem
  createProblem: async (problemData) => {
    const response = await api.post('/problems', problemData);
    return response.data;
  },

  // Get all user problems
  getProblems: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/problems?${params}`);
    return response.data;
  },

  // Get single problem
  getProblem: async (id) => {
    const response = await api.get(`/problems/${id}`);
    return response.data;
  },

  // Update problem
  updateProblem: async (id, data) => {
    const response = await api.put(`/problems/${id}`, data);
    return response.data;
  },

  // Rate problem
  rateProblem: async (id, rating, feedback) => {
    const response = await api.put(`/problems/${id}/rate`, { rating, feedback });
    return response.data;
  },

  // Delete problem
  deleteProblem: async (id) => {
    const response = await api.delete(`/problems/${id}`);
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get('/problems/stats');
    return response.data;
  }
};
```

### Step 4: Update Tutorial Service

**`src/services/tutorialService.js`**
```javascript
import api from '../utils/api';

export const tutorialService = {
  // Get all tutorials
  getTutorials: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/tutorials?${params}`);
    return response.data;
  },

  // Get single tutorial
  getTutorial: async (id) => {
    const response = await api.get(`/tutorials/${id}`);
    return response.data;
  },

  // Create tutorial (admin)
  createTutorial: async (tutorialData) => {
    const response = await api.post('/tutorials', tutorialData);
    return response.data;
  },

  // Update tutorial (admin)
  updateTutorial: async (id, data) => {
    const response = await api.put(`/tutorials/${id}`, data);
    return response.data;
  },

  // Delete tutorial (admin)
  deleteTutorial: async (id) => {
    const response = await api.delete(`/tutorials/${id}`);
    return response.data;
  },

  // Mark as helpful
  markHelpful: async (id) => {
    const response = await api.put(`/tutorials/${id}/helpful`);
    return response.data;
  }
};
```

### Step 5: Update Admin Service

**`src/services/adminService.js`**
```javascript
import api from '../utils/api';

export const adminService = {
  // Get platform stats
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Get all users
  getUsers: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/admin/users?${params}`);
    return response.data;
  },

  // Get single user
  getUser: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, data) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};
```

### Step 6: Update Login Component

**Update `src/pages/Login.js`**
```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ username, password });
      
      if (response.success) {
        onLogin(response.data.user);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

### Step 7: Update Submit Problem Component

**Update `src/pages/SubmitProblem.js`**
```javascript
import React, { useState } from 'react';
import { problemService } from '../services/problemService';
import { CATEGORIES } from '../data/mockData';
import '../styles/SubmitProblem.css';

function SubmitProblem({ user, onAddProblem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [solution, setSolution] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await problemService.createProblem({
        title,
        description,
        category
      });

      if (response.success) {
        setSolution(response.data.solution);
        onAddProblem(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit problem');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

### Step 8: Environment Variables

Create `.env` in React app root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Update `src/utils/api.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Step 9: Install Axios

```bash
cd solvix-app
npm install axios
```

### Step 10: Handle Errors Globally

**`src/utils/errorHandler.js`**
```javascript
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'Server not responding. Please try again later.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};
```

## Quick Start Both Applications

### Terminal 1 - Backend
```bash
cd solvix-backend
npm install
npm run seed    # Seed database
npm run dev     # Start backend on port 5000
```

### Terminal 2 - Frontend
```bash
cd solvix-app
npm install
npm start       # Start frontend on port 3000
```

## Testing the Integration

1. **Start Backend**: `npm run dev` (port 5000)
2. **Start Frontend**: `npm start` (port 3000)
3. **Login**: Use credentials from seed data
   - User: `user` / `user123`
   - Admin: `admin` / `admin123`
4. **Test Features**:
   - Submit a problem
   - View AI-generated solution
   - Rate solutions
   - Browse tutorials
   - Access admin panel (as admin)

## Common Issues

### CORS Error
Ensure backend `.env` has:
```env
CLIENT_URL=http://localhost:3000
```

### Authentication Error
Check if token is being sent:
```javascript
console.log('Token:', localStorage.getItem('token'));
```

### Connection Refused
Ensure MongoDB is running and backend is started

## API Response Examples

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Next Steps

1. Add loading states
2. Implement error boundaries
3. Add request/response interceptors
4. Implement token refresh
5. Add optimistic UI updates
6. Cache frequently accessed data
