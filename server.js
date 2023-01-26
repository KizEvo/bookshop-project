import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import fileUpload from 'express-fileupload'

//packages
import cookieParser from 'cookie-parser'
import * as Cloudinary from 'cloudinary'

//db
import connectDB from './db/connect.js'

//router
import authRouter from './routes/authRoutes.js'
import productsRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import cartRouter from './routes/orderRoutes.js'

//middleware
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'

Cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
})

process.on('warning', (e) => console.warn(e.stack))

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(fileUpload({ useTempFiles: true }))

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('testing cookies')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/order', cartRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error.message)
  }
}

start()
