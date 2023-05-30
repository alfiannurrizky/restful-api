import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
dotenv.config()

const app: Application = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`Server Running On Port ${port} 🚀`)
})
