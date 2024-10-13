import express from 'express'
import {
    authRegister,
    authLogin,
    refreshToken,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', authRegister)
router.post('/login', authLogin)
router.post('/refresh-token', refreshToken)

export default router
