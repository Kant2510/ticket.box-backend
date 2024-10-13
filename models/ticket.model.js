import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
    {
        eventID: {
            type: mongoose.ObjectId,
            ref: 'Event',
            required: true,
        },
        type: {
            type: String,
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
        status: {
            type: String,
            enum: ['Available', 'Sold out'],
            default: 'Available',
        },
    },
    {
        timestamps: true,
    },
)

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket
