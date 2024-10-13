import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'
        console.log(dbUrl)
        const conn = await mongoose.connect(dbUrl)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // process code 1 code means exit with failure, 0 means success
    }
}

export default connectDB
