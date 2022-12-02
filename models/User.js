import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 5,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
    default: 'my last name',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 40,
    default: 'my city',
  },
  shippingLocation: {
    type: String,
    trim: true,
    maxlength: 40,
    default: 'vietnam',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: String,
  passwordTokenExpirateDate: Date,
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

export default mongoose.model('User', UserSchema)
