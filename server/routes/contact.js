import express from 'express';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, dogId, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // TODO: Implement email notifications or database storage
    // In a production application, you would:
    // 1. Save the contact submission to a database
    // 2. Send an email notification to the shelter staff
    // 3. Send a confirmation email to the user
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
