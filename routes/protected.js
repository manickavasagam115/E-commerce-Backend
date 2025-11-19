const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/me', authenticateToken, (req, res) => {
  // req.user comes from token
  res.json({ user: req.user });
});

module.exports = router;
