import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import user from '../models/user'
import bcrypt from 'bcrypt'
import { logger } from '../utils/logger'
const { User } = require('../models')

export const register = async (req: Request, res: Response) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const users = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash
    })

    logger.info('success registered user')

    return res.status(201).json({
      success: true,
      message: 'success registered'
    })
  } catch (error) {
    logger.error('ERR: user-create', error)

    return res.status(400).json({
      success: false,
      message: 'failed registered user',
      error: error
    })
  }
}
