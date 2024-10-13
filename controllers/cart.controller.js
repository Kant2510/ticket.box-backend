import Cart from '../models/cart.model.js'

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ customerID: req.userId })
        res.json(cart)
    } catch (error) {
        console.error('Error in getting cart: ', error.message)
        res.status(500).json({ message: error.message })
    }
}

const addToCart = async (req, res) => {
    try {
        const { ticketID, quantity } = req.body
        const cart = await Cart.findOne({ customerID: req.userId })
        if (cart) {
            const index = cart.items.findIndex(
                (item) => item.ticketID.toString() === ticketID,
            )
            if (index !== -1) {
                // If the ticket is already in the cart, update the quantity
                cart.items[index].quantity += quantity
            } else {
                // If the ticket is not in the cart, add it
                cart.items.push({ ticketID, quantity })
            }
            await cart.save()
        } else {
            const newCart = new Cart({
                customerID: req.userId,
                items: [{ ticketID, quantity }],
            })
            await newCart.save()
        }
        res.status(201).json({
            success: true,
            message: 'Add to cart successfully',
        })
    } catch (error) {
        console.error('Error in adding to cart: ', error.message)
        res.status(500).json({ message: error.message })
    }
}

export { getCart, addToCart }
