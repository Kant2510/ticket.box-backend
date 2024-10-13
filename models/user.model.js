// import myDb from './database.js'
// const userCollection = myDb.createCollection('User')
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        refreshToken: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    },
)

const User = mongoose.model('User', userSchema)

export default User
