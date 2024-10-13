import Event from '../models/event.model.js'

const createEvent = async (req, res) => {
    try {
        const {
            name,
            description,
            image,
            startDate,
            endDate,
            category,
            location,
        } = req.body
        if (
            !name ||
            !description ||
            !image ||
            !startDate ||
            !endDate ||
            !category ||
            !location
        ) {
            return res.status(400).send({ message: 'Missing information!' })
        }
        const event = new Event(req.body)
        await event.save()
        res.status(201).json({
            success: true,
            message: 'Register successfully',
            data: event,
        })
    } catch (error) {
        console.error('Error in adding event:', error.message)
        return res.status(500).send({ message: error.message })
    }
}
export { createEvent }
