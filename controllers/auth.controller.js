// import userCollection from '../models/user.model.js'
import myDb from '../models/database.js'

const authLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.json({ success: false, message: 'Missing username or password!', type: 'error' })
    }
    try {
        const hased_password = password + '_hased'
        console.log(username, hased_password)
        const userCollection = myDb.createCollection('User')
        console.log(userCollection)
        const matchUser = await userCollection.findOne({ username })
        const matchPass = await userCollection.findOne({ password: hased_password })
        console.log(matchUser)
        console.log(matchPass)
        if (!matchUser) {
            return res.json({ success: false, message: 'Username is not exist!', type: 'error' })
        }
        if (!matchPass) {
            return res.json({ success: false, message: 'Wrong password!', type: 'error' })
        }

        res.json({ success: true, message: 'Login successfully!', type: 'success' })
    } catch (error) {
        return res.json({ success: false, message: error, type: 'error' })
    }
}

export default authLogin
