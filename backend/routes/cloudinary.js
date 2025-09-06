const express = require('express');
const router = express.Router();
const {
  uploadFile,
  deleteFile,
  getFileInfo,
  upload
} = require('../controllers/cloudinaryController');

// Upload file
router.post('/upload', upload.single('file'), uploadFile);

// Delete file
router.delete('/:publicId', deleteFile);

// Get file info
router.get('/:publicId', getFileInfo);

module.exports = router;

