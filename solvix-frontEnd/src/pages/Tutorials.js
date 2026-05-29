import React, { useState, useEffect } from 'react';
import '../styles/Tutorials.css';

const BASE_URL = 'http://localhost:5000/api';

function TutorialVideo({ videoQuery, videoUrl }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    if (videoUrl) {
      setEmbedUrl(videoUrl);
      setLoading(false);
      return;
    }
    if (videoQuery) {
      fetch(`${BASE_URL}/youtube/search?q=${encodeURIComponent(videoQuery)}`)
        .then(res => res.json())
        .then(data => {
          if (data.embedUrl) setEmbedUrl(data.embedUrl);
          else setError(true);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
      return;
    }
    setLoading(false);
    setError(true);
  }, [videoQuery, videoUrl]);

  if (loading) return (
    <div style={videoStyles.placeholder}>⏳ Video load ho rahi hai...</div>
  );
  if (error || !embedUrl) return (
    <div style={videoStyles.placeholder}>❌ Video nahi mili</div>
  );

  return (
    <div style={videoStyles.wrapper}>
      <iframe
        width="100%"
        height="280"
        src={embedUrl}
        title="Tutorial Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '8px', display: 'block' }}
      />
    </div>
  );
}

const videoStyles = {
  wrapper: {
    marginBottom: '24px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  placeholder: {
    background: '#f0f0f0',
    borderRadius: '10px',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '15px',
    marginBottom: '24px'
  }
};

function Tutorials({ tutorials, user }) {
  const [searchTerm, setSearchTerm]             = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category) => {
    const icons = {
      'Technical':  '💻',
      'Household':  '🏠',
      'Financial':  '💰',
      'Health':     '❤️',
      'Education':  '📚',
      'Writing':    '✍️',
      'Scheduling': '📅',
      'Other':      '📌'
    };
    return icons[category] || '📌';
  };

  const handleViewTutorial = async (tutorial) => {
    setSelectedTutorial({ ...tutorial, views: tutorial.views + 1 });
    try {
      await fetch(`${BASE_URL}/tutorials/${tutorial._id}/view`, {
        method: 'PUT'
      });
    } catch (error) {
      console.error('View error:', error);
    }
  };

  const handleMarkHelpful = async (tutorialId) => {
    try {
      const res = await fetch(`${BASE_URL}/tutorials/${tutorialId}/helpful`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      if (res.ok) {
        alert('Thank you for your feedback! 🎉');
      }
    } catch (error) {
      console.error('Helpful error:', error);
    }
  };

  return (
    <div className="tutorials">
      <div className="container">
        <div className="tutorials-header">
          <h1>Tutorials Library</h1>
          <p>Browse step-by-step guides to solve common problems</p>
        </div>

        <div className="tutorials-search">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search tutorials by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredTutorials.length > 0 ? (
          <div className="tutorials-grid">
            {filteredTutorials.map(tutorial => (
              <div
                key={tutorial._id}
                className="tutorial-card"
                onClick={() => handleViewTutorial(tutorial)}
              >
                <div className="tutorial-card-header">
                  <div className="tutorial-icon">
                    {getCategoryIcon(tutorial.category)}
                  </div>
                  <div className="tutorial-title">{tutorial.title}</div>
                  <div className="tutorial-meta">
                    <span className="tutorial-meta-item">📁 {tutorial.category}</span>
                    <span className="tutorial-meta-item">⏱️ {tutorial.duration}</span>
                    <span className={`difficulty-badge ${tutorial.difficulty.toLowerCase()}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>

                <div className="tutorial-footer">
                  <span className="view-count">👁️ {tutorial.views} views</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {(tutorial.videoQuery || tutorial.videoUrl) && (
                      <span style={{ fontSize: '12px', background: '#EF4444', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
                        ▶ Video
                      </span>
                    )}
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '14px' }}>
                      View Tutorial
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-tutorials">
            <h3>No tutorials found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'No tutorials available yet'}</p>
          </div>
        )}

        {selectedTutorial && (
          <div className={`tutorial-modal ${selectedTutorial ? 'active' : ''}`}>
            <div className="tutorial-modal-content">
              <button className="modal-close" onClick={() => setSelectedTutorial(null)}>×</button>

              <div className="tutorial-icon" style={{ fontSize: '60px', textAlign: 'center' }}>
                {getCategoryIcon(selectedTutorial.category)}
              </div>

              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                {selectedTutorial.title}
              </h2>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">{selectedTutorial.category}</span>
                <span className={`difficulty-badge ${selectedTutorial.difficulty.toLowerCase()}`}>
                  {selectedTutorial.difficulty}
                </span>
                <span className="badge badge-primary">⏱️ {selectedTutorial.duration}</span>
                <span className="badge badge-primary">👁️ {selectedTutorial.views} views</span>
              </div>

              {(selectedTutorial.videoQuery || selectedTutorial.videoUrl) && (
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>🎬 Tutorial Video:</p>
                  <TutorialVideo
                    videoQuery={selectedTutorial.videoQuery}
                    videoUrl={selectedTutorial.videoUrl}
                  />
                </div>
              )}

              <div className="tutorial-steps">
                <h4>Steps to Follow:</h4>
                <ol>
                  {selectedTutorial.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedTutorial(null)}
                  style={{ marginRight: '10px' }}
                >
                  Close
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleMarkHelpful(selectedTutorial._id)}
                >
                  Mark as Helpful
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tutorials;