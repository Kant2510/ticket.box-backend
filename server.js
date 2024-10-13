import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import authRouter from './routers/auth.router.js'
import cartRouter from './routers/cart.router.js'
import orderRouter from './routers/order.router.js'
import eventRouter from './routers/event.router.js'
import ticketRouter from './routers/ticket.router.js'
import run from './configs/mongo.js'
// import connectDB from './configs/mongo.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json()) // allows us to accept JSON data in the req.body
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use('/check', (req, res) => res.send('Ok!'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/ticket', ticketRouter)
app.use('/api/v1/event', eventRouter)

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/dist')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//     })
// }

app.listen(PORT, () => {
    // connectDB()
    run().catch(console.dir)
    console.log('Server started at http://localhost:' + PORT)
})
