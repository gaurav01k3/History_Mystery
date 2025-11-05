const { Router } = require('express');

const router = Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API' });
});

router.post('/echo', (req, res) => {
  res.json({ received: req.body || null, timestamp: new Date().toISOString() });
});

module.exports = router;


