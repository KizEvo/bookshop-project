import mongoose from 'mongoose'

const SingleCartProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
})

const OrderSchema = new mongoose.Schema(
  {
    orderProducts: [SingleCartProductSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['arrived', 'delivering'],
      default: 'delivering',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
