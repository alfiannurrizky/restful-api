import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'unauthenticate' })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN!)
    res.locals.jwt = decoded
    next()
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: 'Invalid token'
    })
  }
}
