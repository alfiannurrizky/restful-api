import { Request, Response } from 'express'
import { logger } from '../utils/logger'

const { Product } = require('../models')

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ limit: 10 })

    logger.info('list data product')

    return res.status(200).json({
      success: true,
      message: 'list data products',
      data: products
    })
  } catch (error) {
    logger.error('ERR: get-products', error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body
    const product = await Product.create({
      name,
      price,
      stock
    })

    logger.info('success create product')

    return res.status(201).json({
      success: true,
      message: 'success created product',
      data: product
    })
  } catch (error) {
    logger.error('ERR: created-product', error)
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id: id }
    })

    if (!product) {
      return res.status(404).json({
        message: `product with id ${id} not found!`
      })
    }

    logger.info('success get detail product')

    return res.status(200).json({
      success: true,
      message: 'detail product',
      data: product
    })
  } catch (error) {
    logger.error('ERR: failed get-product-detail', error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, price, stock } = req.body

    const product = await Product.update(
      {
        name,
        price,
        stock
      },
      { where: { id: id } }
    )

    logger.info('success updated product')

    return res.status(200).json({
      success: true,
      message: 'success updated product',
      data: product
    })
  } catch (error) {
    logger.error('ERR: failed updated-product', error)
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.destroy({
      where: { id: req.params.id }
    })

    logger.info('success deleted product')

    return res.status(200).json({
      success: true,
      message: 'success deleted product'
    })
  } catch (error) {
    logger.error('ERR: failed deleted-product', error)
  }
}
