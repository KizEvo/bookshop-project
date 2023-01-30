import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }
  // Object.values tao ra 1 array voi cac GIA TRI cua properties cua chinh Object dc goi theo thu tu sap xep
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    if (err.errors.price.name === 'CastError') {
      defaultError.msg = 'Price input only accept number, please try again'
    } else {
      defaultError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',')
    }
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = 'Please provide correct and existing ID'
  }

  // Object.keys tao ra 1 array voi cac properties cua chinh Object dc goi theo thu tu sap xep
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_GATEWAY
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware
