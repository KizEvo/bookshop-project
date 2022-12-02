import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Product description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: [
        'adventure',
        'classic',
        'mystery',
        'fantasy',
        'historical',
        'horror',
        'sci-fi',
      ],
    },
    author: {
      type: String,
      required: [true, 'Please provide product author'],
    },
    image: {
      type: String,
      required: [true, 'Please provide product image'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
