const express = require('express');
const router  = express.Router();
const axios   = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part:       'snippet',
        q,
        type:       'video',
        maxResults: 1,
        key: process.env.YOUTUBE_API_KEY
      }
    });

    const video = data.items?.[0];
    if (!video) return res.status(404).json({ error: 'No video found' });

    res.json({
      videoId:  video.id.videoId,
      embedUrl: `https://www.youtube.com/embed/${video.id.videoId}`,
      title:    video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url
    });
  } catch (err) {
    // ✅ Exact error dikhao
    console.error('YouTube API Error:', err.response?.data || err.message);
    res.status(500).json({ 
      error: err.message,
      details: err.response?.data  // ← yeh add kiya
    });
  }
});

module.exports = router;