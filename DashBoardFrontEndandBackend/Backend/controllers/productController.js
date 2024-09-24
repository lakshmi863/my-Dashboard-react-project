import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    try {
        const productData = {
            title: req.body.title,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.path : null,
        };

        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
