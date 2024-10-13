import mongoose from 'mongoose'

const orderDetailSchema = new mongoose.Schema({
    ticketID: {
        type: mongoose.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const orderSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.ObjectId,
            required: true,
        },
        orderDate: {
            type: Date,
            required: true,
        },
        statusOrder: {
            type: String,
            enum: ['Pending', 'Paid', 'Cancelled'],
            default: 'Pending', // Pending, Paid, Cancelled
        },
        totalPrices: {
            type: Number,
            required: true,
        },
        orderDetails: {
            type: [orderDetailSchema],
            required: true,
        },
        paymentID: {
            type: mongoose.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Order = mongoose.model('Order', orderSchema)

export default Order
