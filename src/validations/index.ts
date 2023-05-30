import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

export const userValidation = [
  check('name').notEmpty().withMessage('the name field is required!'),
  check('email').isEmail().withMessage('must be an email type!').notEmpty().withMessage('the email field is required!'),
  check('password')
    .notEmpty()
    .withMessage('the password field is required!')
    .isLength({ min: 8 })
    .withMessage('must be min 8 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }
    next()
  }
]

export const productValidation = [
  check('name').notEmpty().withMessage('the name field is required!'),
  check('price').notEmpty().withMessage('the price field is required!').isInt().withMessage('must be integer'),
  check('stock').notEmpty().withMessage('the stock field is required!').isInt().withMessage('must be integer'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }
    next()
  }
]
