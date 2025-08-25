const express = require('express');
const router = express.Router();
const InventoryModel = require('../models/inventory');

// GET all inventory items
// Route: GET /api/inventory
router.get('/', async (req, res) => {
    try {
        const { category, inStock, lowStock } = req.query;
        let filter = {};

        // Apply filters if provided
        if (category) {
            filter.category = category;
        }
        if (inStock !== undefined) {
            filter.inStock = inStock === 'true';
        }

        let items = await InventoryModel.find(filter).sort({ createdAt: -1 });

        // Filter for low stock items if requested
        if (lowStock === 'true') {
            items = items.filter((item) => item.isLowStock());
        }

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET single inventory item by ID
// Route: GET /api/inventory/:id
router.get('/:id', async (req, res) => {
    try {
        const item = await InventoryModel.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// POST create new inventory item
// Route: POST /api/inventory
router.post('/', async (req, res) => {
    try {
        const item = new InventoryModel(req.body);
        const savedItem = await item.save();

        res.status(201).json({
            success: true,
            message: 'Item created successfully',
            data: savedItem
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors
            });
        }

        // Handle duplicate key error (SKU already exists)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'SKU already exists. Please use a unique SKU.'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// PUT update inventory item by ID
// Route: PUT /api/inventory/:id
router.put('/:id', async (req, res) => {
    try {
        const item = await InventoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item updated successfully',
            data: item
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors
            });
        }

        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'SKU already exists. Please use a unique SKU.'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE inventory item by ID
// Route: DELETE /api/inventory/:id
router.delete('/:id', async (req, res) => {
    try {
        const item = await InventoryModel.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: item
        });
    } catch (error) {
        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// PATCH update inventory quantity (useful for stock management)
// Route: PATCH /api/inventory/:id/quantity
router.patch('/:id/quantity', async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity === undefined || quantity < 0) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid quantity (must be 0 or greater)'
            });
        }

        const item = await InventoryModel.findByIdAndUpdate(
            req.params.id,
            { quantity: quantity },
            {
                new: true,
                runValidators: true
            }
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Quantity updated successfully',
            data: item
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
