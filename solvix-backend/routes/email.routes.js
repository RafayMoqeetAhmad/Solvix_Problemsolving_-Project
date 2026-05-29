// routes/email.routes.js
const express = require('express');
const router = express.Router();
const { notifyAdminNewProblem, notifyUserProblemSolved } = require('../services/emailService');

// Called when user submits a problem
router.post('/notify-admin', async (req, res) => {
  const { problem, user } = req.body;

  if (!problem || !user) {
    return res.status(400).json({ success: false, message: 'problem and user are required' });
  }

  const result = await notifyAdminNewProblem(problem, user);
  return res.json({ success: result });
});

// Called when admin resolves a problem
router.post('/notify-user', async (req, res) => {
  const { problem, adminReply } = req.body;

  if (!problem || !adminReply) {
    return res.status(400).json({ success: false, message: 'problem and adminReply are required' });
  }

  const result = await notifyUserProblemSolved(problem, adminReply);
  return res.json({ success: result });
});

module.exports = router;