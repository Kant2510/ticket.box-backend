import Order from '../models/order.model.js'

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userID: req.userId })
        res.json(orders)
    } catch (error) {
        console.error('Error in getting orders: ', error.message)
        res.status(500).json({ message: error.message })
    }
}

const createOrder = async (req, res) => {
    try {
        const { orderDate, totalPrices, orderDetails, paymentID } = req.body
        if (!orderDate || !totalPrices || !orderDetails || !paymentID) {
            return res.status(400).json({ message: 'Missing information' })
        }
        const newOrder = new Order({
            userID: req.userId,
            orderDate,
            totalPrices,
            orderDetails,
            paymentID,
        })
        await newOrder.save()
        res.status(201).json({
            success: true,
            message: 'Create order successfully',
        })
    } catch (error) {
        console.error('Error in creating order: ', error.message)
        res.status(500).json({ message: error.message })
    }
}

export { getOrders, createOrder }
