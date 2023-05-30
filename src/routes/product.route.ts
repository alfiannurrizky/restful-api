import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller'
import { productValidation } from '../validations'
import { auth } from '../middlewares/auth.middleware'
const router = Router()

router.get('/products', auth, getProducts)
router.post('/products', auth, productValidation, createProduct)
router.get('/products/:id', auth, getProduct)
router.put('/products/:id', auth, updateProduct)
router.delete('/products/:id', auth, deleteProduct)

export default router
