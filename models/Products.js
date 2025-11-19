const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, trim: true },
    images: { type: String, required: true }

}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);