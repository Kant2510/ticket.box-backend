import Ticket from '../models/ticket.model.js'

const createTicket = async (req, res) => {
    try {
        const { eventID, type, quantity, price } = req.body
        if (!eventID || !type || !quantity || !price) {
            return res.status(400).send({ message: 'Missing information!' })
        }
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(201).json({
            success: true,
            message: 'Create ticket successfully',
            data: ticket,
        })
    } catch (error) {
        console.error('Error in adding ticket:', error.message)
        return res.status(500).send({ message: error.message })
    }
}
export { createTicket }
