// routes/products.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authenticateApiKey = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');


let products = [
    {
        id: '1',
        name: 'Laptop',
        description: 'High-performance laptop with 16GB RAM',
        price: 1200,
        category: 'electronics',
        inStock: true
    },
    {
        id: '2',
        name: 'Smartphone',
        description: 'Latest model with 128GB storage',
        price: 800,
        category: 'electronics',
        inStock: true
    },
    {
        id: '3',
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with timer',
        price: 50,
        category: 'kitchen',
        inStock: false
    }
];


router.get('/', authenticateApiKey, (req, res) => {
    res.json(products);
});

router.get('/:id', authenticateApiKey, (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

router.post('/', authenticateApiKey, validateProduct, (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        category,
        inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:id', authenticateApiKey, validateProduct, (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const { name, description, price, category, inStock } = req.body;
    products[index] = {
        id: req.params.id,
        name,
        description,
        price,
        category,
        inStock
    };
    res.json(products[index]);
});

router.delete('/:id', authenticateApiKey, (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
});

module.exports = router;
