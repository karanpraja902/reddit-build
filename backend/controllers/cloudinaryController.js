const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Upload file to Cloudinary
const uploadFile = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { originalname, buffer, mimetype } = req.file;
    
    // Convert buffer to base64
    const base64File = buffer.toString('base64');
    const dataURI = `data:${mimetype};base64,${base64File}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'deepseek-ai',
      public_id: `${Date.now()}_${originalname}`,
    });
    
    res.status(200).json({
      success: true,
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: originalname,
        mediaType: mimetype,
        size: result.bytes,
      },
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Delete file from Cloudinary
const deleteFile = asyncHandler(async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({ error: 'Public ID is required' });
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'File deleted successfully',
      });
    } else {
      res.status(400).json({
        error: 'Failed to delete file',
      });
    }
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Get file info
const getFileInfo = asyncHandler(async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({ error: 'Public ID is required' });
    }
    
    const result = await cloudinary.api.resource(publicId);
    
    res.status(200).json({
      success: true,
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: result.original_filename,
        mediaType: result.format,
        size: result.bytes,
        createdAt: result.created_at,
      },
    });
  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({ error: 'Failed to get file info' });
  }
});

module.exports = {
  uploadFile,
  deleteFile,
  getFileInfo,
  upload, // Export multer upload middleware
};
