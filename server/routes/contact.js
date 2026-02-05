import express from 'express';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, dogId, message } = req.body;
    
    // In a real application, you would send an email or save to database
    console.log('Contact form submission:', { name, email, phone, dogId, message });
    
    res.status(200).json({ 
      message: 'Contact form submitted successfully',
      data: { name, email, phone, dogId, message }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
