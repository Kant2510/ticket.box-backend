import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
    ticketID: {
        type: mongoose.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

const cartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.ObjectId,
            required: true,
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    },
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
