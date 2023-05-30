import { register } from '../controllers/user.controller'
import { Router } from 'express'
import { userValidation } from '../validations'
const router = Router()

router.post('/register', userValidation, register)

export default router
