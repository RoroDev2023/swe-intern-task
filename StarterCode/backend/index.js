const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'DELETE'],
  credentials: true
}));

app.use(express.json());

let products = [
  { id: 1, name: 'Product 1', description: 'description 1', price: 100 },
  { id: 2, name: 'Product 2', description: 'description 2', price: 200 },
  { id: 3, name: 'Product 3', description: 'description 3', price: 300 },
  { id: 4, name: 'Product 4', description: 'description 4', price: 150 },
  { id: 5, name: 'Product 5', description: 'description 5', price: 500 },
  { id: 6, name: 'Product 6', description: 'description 6', price: 50 },
];

const fetchImageUrl = () => {
  return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

app.get('/api/products', (req, res) => {
  const withImages = products.map(p => ({
    ...p,
    imageUrl: fetchImageUrl()
  }));
  res.json(withImages);
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  if (products.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`server link: http://localhost:${PORT}`);
});
