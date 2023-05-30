import { Router } from 'express'
import UserRoute from './user.route'
const router = Router()

router.use('/api/v1/', UserRoute)

export default router
