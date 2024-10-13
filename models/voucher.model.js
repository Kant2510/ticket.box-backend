import mongoose from 'mongoose'

const voucherSchema = new mongoose.Schema(
    {
        voucherName: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        maxDiscount: {
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Active', 'Expired'],
            default: 'Active', // Active, Expired
        },
    },
    {
        timestamps: true,
    },
)

const Voucher = mongoose.model('Voucher', voucherSchema)

export default Voucher
