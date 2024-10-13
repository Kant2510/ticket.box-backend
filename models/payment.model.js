import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
    {
        methodPayment: {
            type: String,
            enum: ['Momo', 'VNPay', 'CreditCard'],
            required: true,
        },
        datePayment: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
