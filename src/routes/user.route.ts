import { login, register } from '../controllers/user.controller'
import { Router } from 'express'
import { userValidation } from '../validations'
const router = Router()

router.post('/register', userValidation, register)
router.post('/login', login)

export default router
