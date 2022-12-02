const createTokenUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user._id,
    lastName: user.lastName,
    location: user.location,
    shippingLocation: user.shippingLocation
  }
}
export default createTokenUser
