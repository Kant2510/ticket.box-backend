import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import myDb from './models/database.js'
import authRouter from './routers/auth.router.js'

dotenv.config()

const connectDB = async () => {
    try {
        await myDb.connect()
        console.log('Connected to database')
    } catch (error) {
        console.log('Error connecting to database')
        console.log(error)
    }
}
// connectDB()

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json()) // allows us to accept JSON data in the req.body
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use('/api/v1/auth', authRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log('Server started at http://localhost:' + PORT))
