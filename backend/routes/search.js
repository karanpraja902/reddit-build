const express = require('express');
const router = express.Router();
const {
  webSearch,
  scrapeWebpage
} = require('../controllers/searchController');

// Web search
router.post('/', webSearch);

// Scrape webpage
router.post('/scrape', scrapeWebpage);

module.exports = router;

