const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true },
        images: { type: String, required: true },
        quantity: { type: Number, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);
