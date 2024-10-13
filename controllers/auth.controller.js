// import User from '../models/user.model.js'
// import myDb from '../models/database.js';
import Customer from '../models/customer.model.js'
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
        // const Customer = myDb.createCollection('Customer')
        const matchCustomer = await Customer.findOne({ Emai: email })
        const matchPass = await Customer.findOne({
            Password: hased_password,
        })
        if (!matchCustomer) {
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
        // const Customer = myDb.createCollection('Customer');

        const newCustomer = req.body
        newCustomer.password = hased_password
        console.log(newCustomer)

        const customer = new Customer(newCustomer)
        await customer.save()

        const accessToken = jwt.sign(
            { _id: customer._id, email: customer.email },
            process.env.SECRET_ACCESS,
        )
        const refreshToken = jwt.sign(
            { _id: customer._id, email: customer.email },
            process.env.SECRET_REFRESH,
            {
                expiresIn: '7d',
            },
        )

        customer.refreshToken = refreshToken
        await customer.save()

        // res.json({
        //     success: true,
        //     message: 'Login successfully!',
        //     type: 'success',
        // })
        res.status(201).json({
            success: true,
            message: 'Register successfully',
            data: customer,
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
