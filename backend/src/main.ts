import cors from 'cors';
import express from 'express';
import connectDB from './db';
import Item from './models/item';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: 1 });
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error fetching items' });
  }
});

app.post('/items', async (req, res) => {
  const { item, date } = req.body;

  if (!item || !date || item.trim() === '') {
    return res.status(400).json({ error: 'Item and date required' });
  }

  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ error: 'Date must be in YYYY-MM-DD format' });
  }

  try {
    const newItem = new Item({ item, date });
    await newItem.save();

    return res.json({ success: true, data: newItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error saving item' });
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});