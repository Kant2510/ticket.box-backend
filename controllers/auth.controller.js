// import User from '../models/user.model.js'
// import myDb from '../models/database.js';
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            // return res.json({ success: false, message: 'Missing username or password!', type: 'error' })
            return response
                .status(400)
                .send({ message: 'Missing email or password!' })
        }
        const hased_password = password + '_hased'
        // const User = myDb.createCollection('User')
        const matchUser = await User.findOne({ Emai: email })
        const matchPass = await User.findOne({
            Password: hased_password,
        })
        if (!matchUser) {
            return response
                .status(400)
                .send({ message: 'Email does not exist!' })
        }
        if (!matchPass) {
            return response.status(400).send({ message: 'Wrong password!' })
        }

        // res.json({
        //     success: true,
        //     message: 'Login successfully!',
        //     type: 'success',
        // })
        res.status(201).json({ success: true, message: 'Login successfully' })
    } catch (error) {
        console.error('Error in login:', error.message)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const authRegister = async (req, res) => {
    try {
        const { fullname, password, gender, dob, email } = req.body

        if (!fullname || !password || !gender || !dob || !email) {
            // return res.json({ success: false, message: 'Missing username or password!', type: 'error' })
            return response
                .status(400)
                .send({ message: 'Missing information!' })
        }

        const hased_password = password + '_hased'
        // const User = myDb.createCollection('User');

        const newUser = req.body
        newUser.password = hased_password
        console.log(newUser)

        const user = new User(newUser)
        await user.save()

        const accessToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.SECRET_ACCESS,
        )
        const refreshToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.SECRET_REFRESH,
            {
                expiresIn: '7d',
            },
        )

        user.refreshToken = refreshToken
        await user.save()

        // res.json({
        //     success: true,
        //     message: 'Login successfully!',
        //     type: 'success',
        // })
        res.status(201).json({
            success: true,
            message: 'Register successfully',
            data: user,
            accessToken,
            refreshToken,
        })
    } catch (error) {
        // return res.json({ success: false, message: error, type: 'error' })
        console.error('Error in creating user:', error.message)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken
        if (!refreshToken) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH)
        const user = await User.findOne({ _id: decoded._id, refreshToken })
        if (!user) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.SECRET_ACCESS,
        )
        res.json({ success: true, accessToken })
    } catch (error) {
        console.error('Error in refreshing token:', error.message)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export { authRegister, authLogin, refreshToken }
