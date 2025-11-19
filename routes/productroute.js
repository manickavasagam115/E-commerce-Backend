const express = require('express');
const Product= require('../models/Products'); 
const router = express.Router();

// POST API - Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        // Basic validation 
        if (!name || !description || !price || !category || !stock || !images) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create new product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });

    } catch (error) {
        console.error(error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
});

//FIND 
router.get('/', async (req, res) => {
    try {        
        const getProduct = await Product.find();
        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            data: getProduct
        });
    } catch (error) {
        console.error(error);        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
});

router.patch('/update', async (req, res) => {
    try {
        const { userId, prdId, quantity } = req.body;

        if (!userId || !prdId) {
            return res.status(400).json({
                success: false, 
                message: "userId and prdId are required"
            });
        }

        const item = await CartItem.findOne({ userId, productId: prdId });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        // Auto delete if quantity becomes zero
        if (quantity <= 0) {
            await item.deleteOne();
            return res.status(200).json({
                success: true,
                message: "Item removed (quantity <= 0)"
            });
        }

        item.quantity = quantity;
        const updated = await item.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated",
            data: updated
        });

    } catch (error) {
        console.error("PATCH ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});


// DELETE - Remove product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;
