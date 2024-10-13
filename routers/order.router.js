import express from 'express'
import { getOrders, createOrder } from '../controllers/order.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', verifyToken, getOrders)
router.post('/', verifyToken, createOrder)

export default router
