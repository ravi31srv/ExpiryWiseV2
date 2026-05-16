import express from 'express';
import Item from '../models/item';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Middleware
router.use(authMiddleware);

// Get all items for authenticated user
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Create item
router.post('/', async (req, res) => {
  const { name, expiryDate } = req.body;
  try {
    const item = new Item({ name, expiryDate, user: req.user.id });
    await item.save();
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, expiryDate } = req.body;
  try {
    const item = await Item.findOneAndUpdate({ _id: id, user: req.user.id }, { name, expiryDate }, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findOneAndDelete({ _id: id, user: req.user.id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;