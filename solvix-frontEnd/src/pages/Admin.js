
// import React, { useState, useEffect } from 'react';
// import '../styles/Admin.css';

// function Admin({ tutorials, onAddTutorial, onDeleteTutorial, user }) {

//   const [activeTab, setActiveTab] = useState('overview');
//   const [platformStats, setPlatformStats] = useState({
//     totalUsers: 0, totalProblems: 0, solvedProblems: 0,
//     averageRating: 0, activeUsers: 0
//   });
//   const [adminProblems, setAdminProblems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Solve Modal state
//   const [solveModal, setSolveModal] = useState(false);
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [adminReply, setAdminReply] = useState('');
//   const [solvingLoading, setSolvingLoading] = useState(false);

//   // ✅ Filter state
//   const [statusFilter, setStatusFilter] = useState('');

//   const token = user?.token;

//   // Fetch Stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/admin/stats', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (data.success) {
//           setPlatformStats({
//             totalUsers: data.data.users.total,
//             activeUsers: data.data.users.active,
//             totalProblems: data.data.problems.total,
//             solvedProblems: data.data.problems.solved,
//             averageRating: data.data.problems.averageRating,
//           });
//         }
//       } catch (error) {
//         console.error('Stats fetch error:', error);
//       }
//     };
//     if (token) fetchStats();
//   }, [token]);

//   // Fetch Problems
//   const fetchProblems = async (status = '') => {
//     try {
//       setLoading(true);
//       const url = status
//         ? `http://localhost:5000/api/admin/problems?status=${status}`
//         : 'http://localhost:5000/api/admin/problems';

//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (data.success) {
//         setAdminProblems(data.data);
//       }
//     } catch (error) {
//       console.error('Problems fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchProblems(statusFilter);
//   }, [token, statusFilter]);

//   // ✅ Solve button click — modal kholo
//   const handleSolveClick = (problem) => {
//     setSelectedProblem(problem);
//     setAdminReply('');
//     setSolveModal(true);
//   };

//   // ✅ Problem solve karo — API call
//   const handleSolveSubmit = async () => {
//     if (!adminReply.trim()) {
//       alert('Reply likhna zaroori hai!');
//       return;
//     }
//     try {
//       setSolvingLoading(true);
//       const res = await fetch(
//         `http://localhost:5000/api/admin/problems/${selectedProblem._id}/solve`,
//         {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ adminReply })
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         alert(`✅ Problem has been resolved successfully! The user has also been notified via email.
// .`);
//         setSolveModal(false);
//         fetchProblems(statusFilter); // List refresh karo
//       } else {
//         alert(data.message || 'Any issue');
//       }
//     } catch (error) {
//       alert('Server error — dobara try karo');
//     } finally {
//       setSolvingLoading(false);
//     }
//   };

//   return (
//     <div className="admin-panel">
//       <div className="container">

//         <div className="admin-header">
//           <h1>Admin Dashboard</h1>
//           <p>Manage platform content and monitor analytics</p>
//         </div>

//         {/* Stats */}
//         <div className="admin-stats">
//           <div className="admin-stat-card primary">
//             <h3>Total Users</h3>
//             <p>{platformStats.totalUsers}</p>
//           </div>
//           <div className="admin-stat-card">
//             <h3>Total Problems</h3>
//             <p>{platformStats.totalProblems}</p>
//           </div>
//           <div className="admin-stat-card success">
//             <h3>Solved</h3>
//             <p>{platformStats.solvedProblems}</p>
//           </div>
//           <div className="admin-stat-card warning">
//             <h3>Pending</h3>
//             <p>{platformStats.totalProblems - platformStats.solvedProblems}</p>
//           </div>
//           <div className="admin-stat-card primary">
//             <h3>Active Users</h3>
//             <p>{platformStats.activeUsers}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="admin-tabs">
//           <button className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
//           <button className={`admin-tab ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => { setActiveTab('problems'); fetchProblems(statusFilter); }}>Problems</button>
//           <button className={`admin-tab ${activeTab === 'tutorials' ? 'active' : ''}`} onClick={() => setActiveTab('tutorials')}>Tutorials</button>
//         </div>

//         <div className="admin-content">

//           {/* ✅ Problems Tab */}
//           {activeTab === 'problems' && (
//             <div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <h2>All Problems ({adminProblems.length})</h2>

//                 {/* ✅ Filter buttons */}
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                   {['', 'pending', 'solved', 'closed'].map(s => (
//                     <button
//                       key={s}
//                       onClick={() => setStatusFilter(s)}
//                       style={{
//                         padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
//                         background: statusFilter === s ? '#4F46E5' : '#E5E7EB',
//                         color: statusFilter === s ? 'white' : '#374151',
//                         fontWeight: '500'
//                       }}
//                     >
//                       {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {loading ? (
//                 <p style={{ textAlign: 'center', padding: '30px' }}>Loading...</p>
//               ) : adminProblems.length === 0 ? (
//                 <p style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>Koi problem nahi mili</p>
//               ) : (
//                 <table className="admin-table">
//                   <thead>
//                     <tr>
//                       <th>User</th>
//                       <th>Email</th>
//                       <th>Title</th>
//                       <th>Category</th>
//                       <th>Status</th>
//                       <th>Date</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {adminProblems.map(problem => (
//                       <tr key={problem._id}>
//                         {/* ✅ User ka naam */}
//                         <td><strong>{problem.user?.name || 'Unknown'}</strong></td>
//                         {/* ✅ User ka email */}
//                         <td style={{ fontSize: '12px', color: '#6B7280' }}>{problem.user?.email || '-'}</td>
//                         <td>{problem.title}</td>
//                         <td>{problem.category}</td>
//                         <td>
//                           <span className={`badge badge-${problem.status === 'solved' ? 'success' : 'warning'}`}>
//                             {problem.status}
//                           </span>
//                         </td>
//                         <td>{new Date(problem.createdAt).toLocaleDateString()}</td>
//                         <td>
//                           {/* ✅ Solve button — sirf pending problems pe */}
//                           {problem.status === 'pending' ? (
//                             <button
//                               onClick={() => handleSolveClick(problem)}
//                               style={{
//                                 background: '#4F46E5', color: 'white', border: 'none',
//                                 padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
//                                 fontSize: '13px'
//                               }}
//                             >
//                               Solve ✍️
//                             </button>
//                           ) : (
//                             <span style={{ color: '#10B981', fontSize: '13px' }}>✅ Solved</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           )}

//           {/* Tutorials Tab */}
//           {activeTab === 'tutorials' && (
//             <div>
//               <h2>All Tutorials ({tutorials?.length || 0})</h2>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* ✅ Solve Modal */}
//       {solveModal && selectedProblem && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//           background: 'rgba(0,0,0,0.5)', display: 'flex',
//           alignItems: 'center', justifyContent: 'center', zIndex: 1000
//         }}>
//           <div style={{
//             background: 'white', borderRadius: '12px', padding: '30px',
//             width: '90%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
//           }}>
//             <h2 style={{ marginTop: 0, color: '#1F2937' }}>Problem Solve Karo ✍️</h2>

//             {/* Problem info */}
//             <div style={{ background: '#F3F4F6', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
//               <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#374151' }}>{selectedProblem.title}</p>
//               <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#6B7280' }}>
//                 👤 {selectedProblem.user?.name} ({selectedProblem.user?.email})
//               </p>
//               <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>{selectedProblem.description}</p>
//             </div>

//             {/* Admin Reply */}
//             <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
//               Aapka Jawab (User ko dikhega):
//             </label>
//             <textarea
//               value={adminReply}
//               onChange={(e) => setAdminReply(e.target.value)}
//               placeholder="Yahan solution likhein..."
//               rows={5}
//               style={{
//                 width: '100%', padding: '10px', borderRadius: '8px',
//                 border: '1px solid #D1D5DB', fontSize: '14px',
//                 resize: 'vertical', boxSizing: 'border-box'
//               }}
//             />

//             {/* Buttons */}
//             <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
//               <button
//                 onClick={handleSolveSubmit}
//                 disabled={solvingLoading}
//                 style={{
//                   flex: 1, background: '#4F46E5', color: 'white', border: 'none',
//                   padding: '10px', borderRadius: '8px', cursor: 'pointer',
//                   fontSize: '14px', fontWeight: '600'
//                 }}
//               >
//                 {solvingLoading ? 'Bhej raha hun...' : '✅ Solve Karo & Email Bhejo'}
//               </button>
//               <button
//                 onClick={() => setSolveModal(false)}
//                 style={{
//                   flex: 1, background: '#F3F4F6', color: '#374151', border: 'none',
//                   padding: '10px', borderRadius: '8px', cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Admin;

import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

function Admin({ tutorials, onAddTutorial, onDeleteTutorial, user }) {

  const [activeTab, setActiveTab] = useState('overview');
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 0, totalProblems: 0, solvedProblems: 0,
    averageRating: 0, activeUsers: 0
  });
  const [adminProblems, setAdminProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Solve Modal state
  const [solveModal, setSolveModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [solvingLoading, setSolvingLoading] = useState(false);

  // ✅ Filter state
  const [statusFilter, setStatusFilter] = useState('');

  const token = user?.token;

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setPlatformStats({
            totalUsers: data.data.users.total,
            activeUsers: data.data.users.active,
            totalProblems: data.data.problems.total,
            solvedProblems: data.data.problems.solved,
            averageRating: data.data.problems.averageRating,
          });
        }
      } catch (error) {
        console.error('Stats fetch error:', error);
      }
    };
    if (token) fetchStats();
  }, [token]);

  // Fetch Problems
  const fetchProblems = async (status = '') => {
    try {
      setLoading(true);
      const url = status
        ? `http://localhost:5000/api/admin/problems?status=${status}`
        : 'http://localhost:5000/api/admin/problems';

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAdminProblems(data.data);
      }
    } catch (error) {
      console.error('Problems fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProblems(statusFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, statusFilter]);

  // ✅ Solve button click — modal kholo
  const handleSolveClick = (problem) => {
    setSelectedProblem(problem);
    setAdminReply('');
    setSolveModal(true);
  };

  // ✅ Problem solve karo — API call
  const handleSolveSubmit = async () => {
    if (!adminReply.trim()) {
      alert('Reply likhna zaroori hai!');
      return;
    }
    try {
      setSolvingLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/admin/problems/${selectedProblem._id}/solve`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ adminReply })
        }
      );
      const data = await res.json();
      if (data.success) {
        alert(`✅ Problem solve ho gayi! User ko email bhi bhej di gayi.`);
        setSolveModal(false);
        fetchProblems(statusFilter); // List refresh karo
      } else {
        alert(data.message || 'Kuch masla hua');
      }
    } catch (error) {
      alert('Server error — dobara try karo');
    } finally {
      setSolvingLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="container">

        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage platform content and monitor analytics</p>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card primary">
            <h3>Total Users</h3>
            <p>{platformStats.totalUsers}</p>
          </div>
          <div className="admin-stat-card">
            <h3>Total Problems</h3>
            <p>{platformStats.totalProblems}</p>
          </div>
          <div className="admin-stat-card success">
            <h3>Solved</h3>
            <p>{platformStats.solvedProblems}</p>
          </div>
          <div className="admin-stat-card warning">
            <h3>Pending</h3>
            <p>{platformStats.totalProblems - platformStats.solvedProblems}</p>
          </div>
          <div className="admin-stat-card primary">
            <h3>Active Users</h3>
            <p>{platformStats.activeUsers}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`admin-tab ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => { setActiveTab('problems'); fetchProblems(statusFilter); }}>Problems</button>
          <button className={`admin-tab ${activeTab === 'tutorials' ? 'active' : ''}`} onClick={() => setActiveTab('tutorials')}>Tutorials</button>
        </div>

        <div className="admin-content">

          {/* ✅ Problems Tab */}
          {activeTab === 'problems' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>All Problems ({adminProblems.length})</h2>

                {/* ✅ Filter buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['', 'pending', 'solved', 'closed'].map(s => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      style={{
                        padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        background: statusFilter === s ? '#4F46E5' : '#E5E7EB',
                        color: statusFilter === s ? 'white' : '#374151',
                        fontWeight: '500'
                      }}
                    >
                      {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <p style={{ textAlign: 'center', padding: '30px' }}>Loading...</p>
              ) : adminProblems.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>Koi problem nahi mili</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminProblems.map(problem => (
                      <tr key={problem._id}>
                        {/* ✅ User ka naam */}
                        <td><strong>{problem.user?.name || 'Unknown'}</strong></td>
                        {/* ✅ User ka email */}
                        <td style={{ fontSize: '12px', color: '#6B7280' }}>{problem.user?.email || '-'}</td>
                        <td>{problem.title}</td>
                        <td>{problem.category}</td>
                        <td>
                          <span className={`badge badge-${problem.status === 'solved' ? 'success' : 'warning'}`}>
                            {problem.status}
                          </span>
                        </td>
                        <td>{new Date(problem.createdAt).toLocaleDateString()}</td>
                        <td>
                          {/* ✅ Solve button — sirf pending problems pe */}
                          {problem.status === 'pending' ? (
                            <button
                              onClick={() => handleSolveClick(problem)}
                              style={{
                                background: '#4F46E5', color: 'white', border: 'none',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '13px'
                              }}
                            >
                              Solve ✍️
                            </button>
                          ) : (
                            <span style={{ color: '#10B981', fontSize: '13px' }}>✅ Solved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Tutorials Tab */}
          {activeTab === 'tutorials' && (
            <div>
              <h2>All Tutorials ({tutorials?.length || 0})</h2>
            </div>
          )}

        </div>
      </div>

      {/* ✅ Solve Modal */}
      {solveModal && selectedProblem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: '12px', padding: '30px',
            width: '90%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ marginTop: 0, color: '#1F2937' }}>Problem Solve Karo ✍️</h2>

            {/* Problem info */}
            <div style={{ background: '#F3F4F6', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#374151' }}>{selectedProblem.title}</p>
              <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#6B7280' }}>
                👤 {selectedProblem.user?.name} ({selectedProblem.user?.email})
              </p>
              <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>{selectedProblem.description}</p>
            </div>

            {/* Admin Reply */}
            <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Aapka Jawab (User ko dikhega):
            </label>
            <textarea
              value={adminReply}
              onChange={(e) => setAdminReply(e.target.value)}
              placeholder="Yahan solution likhein..."
              rows={5}
              style={{
                width: '100%', padding: '10px', borderRadius: '8px',
                border: '1px solid #D1D5DB', fontSize: '14px',
                resize: 'vertical', boxSizing: 'border-box'
              }}
            />

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                onClick={handleSolveSubmit}
                disabled={solvingLoading}
                style={{
                  flex: 1, background: '#4F46E5', color: 'white', border: 'none',
                  padding: '10px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '14px', fontWeight: '600'
                }}
              >
                {solvingLoading ? 'Bhej raha hun...' : '✅ Solve Karo & Email Bhejo'}
              </button>
              <button
                onClick={() => setSolveModal(false)}
                style={{
                  flex: 1, background: '#F3F4F6', color: '#374151', border: 'none',
                  padding: '10px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;