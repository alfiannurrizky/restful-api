import { Router } from 'express'
import UserRoute from './user.route'
import ProductRoute from '../routes/product.route'
const router = Router()

router.use('/api/v1/', UserRoute)
router.use('/api/v1/', ProductRoute)

export default router
