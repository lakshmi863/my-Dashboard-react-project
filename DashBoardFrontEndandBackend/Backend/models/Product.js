import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Assuming you are saving the image path
});

const Product = mongoose.model('Product', productSchema);

export default Product;
