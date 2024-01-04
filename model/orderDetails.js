const mongoose = require('mongoose');

// Define OrderDetails schema
const orderDetailsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orders: {
        // Assuming `cart` is an object structure, adjust the type accordingly
        type: Object,
        required: true
    },
    pickUpDetails: {
        // Assuming `pickUpDetails` is an object structure, adjust the type accordingly
        type: Object,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderDetails', orderDetailsSchema);