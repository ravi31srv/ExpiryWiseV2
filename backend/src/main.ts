import cors from 'cors';
import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors())
app.use(express.json());

let items: any[] = [];

app.get('/items', (req, res) => {
  return res.json(items);
});

app.post('/items', (req, res) => {
  const { item, date } = req.body;

  if (!item || !date) {
    return res.status(400).json({ error: 'Item and date required' });
  }

  const newItem = { id: Date.now(), item, date };
  items.push(newItem);

  return res.json({ success: true, data: newItem });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});