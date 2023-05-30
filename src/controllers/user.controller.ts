import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { logger } from '../utils/logger'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const { User } = require('../models')

export const register = async (req: Request, res: Response) => {
  try {
    const emailExist = await User.findOne({
      where: { email: req.body.email }
    })

    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: 'email already exist'
      })
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
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

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'username or password is wrong!'
      })
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password)

    if (user && comparePassword) {
      const token: string = jwt.sign({ user }, process.env.JWT_TOKEN!, { expiresIn: '1h' })

      logger.info('login success')

      return res.status(200).json({
        success: true,
        message: 'login successfully',
        token: token
      })
    }

    return res.status(200).json({
      success: false,
      message: 'email or password is wrong!'
    })
  } catch (error) {
    logger.error('login failed', error)
  }
}
