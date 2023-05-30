import { login, me, register } from '../controllers/user.controller'
import { Router } from 'express'
import { userValidation } from '../validations'
import { auth } from '../middlewares/auth.middleware'
const router = Router()

router.post('/register', userValidation, register)
router.post('/login', login)
router.post('/me', auth, me)

export default router
