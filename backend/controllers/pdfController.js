const asyncHandler = require('express-async-handler');
const axios = require('axios');
const pdf = require('pdf-parse');

// Analyze PDF from URL
const analyzePDF = asyncHandler(async (req, res) => {
  try {
    const { url, filename } = req.body;
    
    if (!url || !filename) {
      return res.status(400).json({ 
        error: 'Missing required fields: url and filename' 
      });
    }
    
    console.log(`Starting server-side analysis for PDF: ${filename}`);

    // Download the PDF from the provided URL
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    
    if (response.status !== 200) {
      throw new Error(`Failed to download PDF: ${response.statusText}`);
    }
    
    const buffer = Buffer.from(response.data);
    
    // Parse PDF content
    const pdfData = await pdf(buffer);
    const fullContent = pdfData.text;
    
    // Generate a simple summary (you can integrate with AI service here)
    const summary = generateSummary(fullContent);
    
    console.log('Server-side PDF analysis completed.');

    res.status(200).json({
      summary,
      content: fullContent,
      pageCount: pdfData.numpages,
      filename,
    });
  } catch (error) {
    console.error('PDF analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze PDF' 
    });
  }
});

// Helper function to generate summary
const generateSummary = (content) => {
  // Simple summary generation - you can replace this with AI service
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const firstFewSentences = sentences.slice(0, 3).join('. ');
  return firstFewSentences.length > 200 
    ? firstFewSentences.substring(0, 200) + '...'
    : firstFewSentences;
};

// Extract text from PDF
const extractText = asyncHandler(async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    
    const buffer = Buffer.from(response.data);
    const pdfData = await pdf(buffer);
    
    res.status(200).json({
      success: true,
      text: pdfData.text,
      pageCount: pdfData.numpages,
      info: pdfData.info
    });
  } catch (error) {
    console.error('PDF text extraction error:', error);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  }
});

module.exports = {
  analyzePDF,
  extractText,
};
