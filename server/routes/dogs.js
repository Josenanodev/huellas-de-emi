import express from 'express';
import Dog from '../models/Dog.js';
import { checkAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all dogs
router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find().sort({ createdAt: -1 });
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single dog
router.get('/:id', async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create dog (admin only)
router.post('/', checkAdmin, async (req, res) => {
  try {
    const dog = new Dog(req.body);
    await dog.save();
    res.status(201).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update dog (admin only)
router.put('/:id', checkAdmin, async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete dog (admin only)
router.delete('/:id', checkAdmin, async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.json({ message: 'Dog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
