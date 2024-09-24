import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js'; // Ensure the path is correct

const router = express.Router();

// Setup multer disk storage with a custom file destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploaded files in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix); // Add a timestamp to the filename for uniqueness
    }
});

const upload = multer({ storage: storage });

// POST route for adding a product
router.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const productData = {
            title: req.body.title,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.filename : null, // Save only the filename
        };

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route for fetching all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from DB
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
