import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS)
        req.userId = decoded._id
        console.log('user id: ', req.userId)
        next()
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' })
    }
}

export default verifyToken
