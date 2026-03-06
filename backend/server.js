const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Data
let products = [
  { id: '1', name: "Traditional Azerbaijani Baklava", price: 10, image: "/images/mix.jpg" },
  { id: '2', name: "Walnut Baklava", price: 12, image: "/images/walnut.jpg" },
  { id: '3', name: "Honey Baklava", price: 11, image: "/images/showcase.jpg" },
  { id: '4', name: "Pistachio Baklava", price: 13, image: "/images/inplatetriangel.jpg" }
];
let orders = [];

// API Endpoints

// GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, productId, quantity } = req.body;
  if (!customerName || !phone || !address || !productId || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const product = products.find(p => p.id === String(productId));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const newOrder = {
    id: uuidv4(),
    customerName,
    phone,
    address,
    productId: product.id,
    productName: product.name,
    quantity: Number(quantity),
    orderTime: new Date().toISOString(),
    status: 'Pending',
    totalPrice: product.price * Number(quantity)
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// GET /api/orders
app.get('/api/orders', (req, res) => {
  // Return orders sorted by orderTime descending
  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
  res.json(sortedOrders);
});

// PATCH /api/orders/:id
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const orderIndex = orders.findIndex(o => o.id === id);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders[orderIndex].status = 'Completed';
  res.json(orders[orderIndex]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Bakery backend running on port ${PORT}`);
});
