const express = require('express');
const router = express.Router();
const {
  analyzePDF,
  extractText
} = require('../controllers/pdfController');

// Analyze PDF
router.post('/analyze', analyzePDF);

// Extract text from PDF
router.post('/extract', extractText);

module.exports = router;

