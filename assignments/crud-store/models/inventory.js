const mongoose = require('mongoose');

// Define the Inventory Schema
const InventorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [100, 'Product name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [0, 'Quantity cannot be negative'],
            default: 0
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
            enum: {
                values: [
                    'Electronics',
                    'Clothing',
                    'Books',
                    'Home & Garden',
                    'Sports',
                    'Toys',
                    'Food',
                    'Beauty',
                    'Other'
                ],
                message:
                    'Category must be one of: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Beauty, Other'
            }
        },
        sku: {
            type: String,
            required: [true, 'SKU is required'],
            unique: true,
            trim: true,
            uppercase: true,
            match: [
                /^[A-Z0-9-]+$/,
                'SKU must contain only uppercase letters, numbers, and hyphens'
            ]
        },
        inStock: {
            type: Boolean,
            default: function () {
                return this.quantity > 0;
            }
        },
        brand: {
            type: String,
            trim: true,
            maxlength: [50, 'Brand name cannot exceed 50 characters']
        },
        tags: [
            {
                type: String,
                trim: true,
                lowercase: true
            }
        ]
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual field for formatted price
InventorySchema.virtual('formattedPrice').get(function () {
    return `$${this.price.toFixed(2)}`;
});

// Pre-save middleware to update inStock status
InventorySchema.pre('save', function (next) {
    this.inStock = this.quantity > 0;
    next();
});

// Instance method to check if item is low stock (less than 10 items)
InventorySchema.methods.isLowStock = function () {
    return this.quantity < 10;
};

// Static method to find items by category
InventorySchema.statics.findByCategory = function (category) {
    return this.find({ category: category });
};

// Index for better query performance
InventorySchema.index({ name: 1, category: 1 });
InventorySchema.index({ sku: 1 });

// Export the model
const InventoryModel = mongoose.model('Inventory', InventorySchema);

module.exports = InventoryModel;
