import express from 'express'
import { getCart, addToCart } from '../controllers/cart.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', verifyToken, getCart)
router.post('/', verifyToken, addToCart)

export default router
