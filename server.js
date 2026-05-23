import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from './src/data/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve public directory (videos, canvas frames, logos)
app.use('/public', express.static(path.join(__dirname, 'public')));

// API Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/charms', (req, res) => {
  const charms = products.filter(p => p.type === 'Charms');
  res.json(charms);
});

// Serve static assets from build in production
app.use(express.static(path.join(__dirname, 'dist')));

// Wildcard routing to support React Router client-side routing in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
