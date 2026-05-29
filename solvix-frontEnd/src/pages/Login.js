// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

// const BASE_URL = 'http://localhost:5000/api';

// function Login({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isRegister, setIsRegister] = useState(false);

//   const navigate = useNavigate();

//   const resetFields = () => {
//     setName('');
//     setEmail('');
//     setUsername('');
//     setPassword('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // 🔥 Manual validation (important)
//     if (isRegister) {
//       if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
//         setError('All fields are required');
//         return;
//       }
//     } else {
//       if (!username.trim() || !password.trim()) {
//         setError('Username and password are required');
//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       const endpoint = isRegister ? '/auth/register' : '/auth/login';

//       const bodyData = isRegister
//         ? {
//             name: name.trim(),
//             email: email.trim(),
//             username: username.trim(),
//             password: password.trim(),
//           }
//         : {
//             username: username.trim(),
//             password: password.trim(),
//           };

//       const res = await fetch(`${BASE_URL}${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bodyData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Something went wrong');
//         setLoading(false);
//         return;
//       }

//       onLogin({ ...data.data.user, token: data.data.token });
//       resetFields();
//       navigate('/');
//     } catch (err) {
//       console.error('Auth error:', err);
//       setError('Server se connection nahi ho pa raha. Try again!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleMode = (e) => {
//     e.preventDefault();
//     setIsRegister(!isRegister);
//     setError('');
//     resetFields();   // 🔥 Important Fix
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-header">
//           <h1>🔧 Solvix</h1>
//           <p>
//             {isRegister
//               ? 'Create your account'
//               : 'Welcome back! Please login to your account'}
//           </p>
//         </div>

//         {error && <div className="login-error">{error}</div>}

//         <form className="login-form" onSubmit={handleSubmit}>
//           {isRegister && (
//             <>
//               <div className="form-group">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter email"
//                 />
//               </div>
//             </>
//           )}

//           <div className="form-group">
//             <label>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter username"
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary"
//             style={{ width: '100%' }}
//             disabled={loading}
//           >
//             {loading
//               ? 'Please wait...'
//               : isRegister
//               ? 'Register'
//               : 'Login'}
//           </button>
//         </form>

//         <div className="login-footer">
//           {isRegister ? (
//             <p>
//               Already have an account?{' '}
//               <a href="#" onClick={toggleMode}>
//                 Login here
//               </a>
//             </p>
//           ) : (
//             <p>
//               Don't have an account?{' '}
//               <a href="#" onClick={toggleMode}>
//                 Register here
//               </a>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const BASE_URL = 'http://localhost:5000/api';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const resetFields = () => {
    setName('');
    setEmail('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 🔥 Manual validation (important)
    if (isRegister) {
      if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
        setError('All fields are required');
        return;
      }
    } else {
      if (!username.trim() || !password.trim()) {
        setError('Username and password are required');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';

      const bodyData = isRegister
        ? {
            name: name.trim(),
            email: email.trim(),
            username: username.trim(),
            password: password.trim(),
          }
        : {
            username: username.trim(),
            password: password.trim(),
          };

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      onLogin({ ...data.data.user, token: data.data.token });
      resetFields();
      navigate('/');
    } catch (err) {
      console.error('Auth error:', err);
      setError('Server se connection nahi ho pa raha. Try again!');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
    setError('');
    resetFields();   // 🔥 Important Fix
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔧 Solvix</h1>
          <p>
            {isRegister
              ? 'Create your account'
              : 'Welcome back! Please login to your account'}
          </p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isRegister
              ? 'Register'
              : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={toggleMode} style={{background:"none",border:"none",color:"#4F46E5",cursor:"pointer",padding:0,font:"inherit",textDecoration:"underline"}}>
                Login here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={toggleMode} style={{background:"none",border:"none",color:"#4F46E5",cursor:"pointer",padding:0,font:"inherit",textDecoration:"underline"}}>
                Register here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;