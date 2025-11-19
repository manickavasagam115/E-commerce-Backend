const express = require("express");
const router = express.Router();
const CartItem = require("../models/cartItemModel");
// POST - Add Product to Cart
router.post("/", async (req, res) => {
    try {
        const { userId, productId, name, description, price, category, stock, images, quantity } = req.body;

        // 1. Validate required fields
        if (!userId || !productId || !name || !price || !category || !images) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // 2. Check if same product already exists in cart for this user
        let existingItem = await CartItem.findOne({ userId, productId });

        if (existingItem) {
            // Already exists -> Increase quantity
            existingItem.quantity += quantity || 1;
            existingItem = await existingItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated (quantity increased)",
                data: existingItem,
            });
        }

        // 3. Add new cart item
        const newCartItem = new CartItem({
            userId,
            productId,
            name,
            description,
            price,
            category,
            stock,
            images,
            quantity: quantity || 1,
        });

        const savedItem = await newCartItem.save();

        res.status(201).json({
            success: true,
            message: "Item added to cart",
            data: savedItem,
        });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});


// GET CART BY USER
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const items = await CartItem.find({ userId });

        res.status(200).json({
            success: true,
            message: "Cart items retrieved",
            data: items
        });
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});




// PATCH - UPDATE QUANTITY
router.patch("/update", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
console.log("Hello userId productId",userId,productId,quantity)
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId & productId required"
            });
        }

        const item = await CartItem.findOne({ userId, productId });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        // Auto-remove when quantity is zero
        if (quantity <= 0) {
            await item.deleteOne();
            return res.status(200).json({
                success: true,
                message: "Item removed from cart (quantity <= 0)"
            });
        }

        // Update quantity
        item.quantity = quantity;
        const updated = await item.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated",
            data: updated,
        });
    } catch (error) {
        console.error("Quantity Update Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});

// DELETE CART ITEM
router.delete("/remove", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId & productId required"
            });
        }

        const removed = await CartItem.findOneAndDelete({ userId, productId });

        if (!removed) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });

    } catch (error) {
        console.error("Delete Cart Item Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});


module.exports = router;
