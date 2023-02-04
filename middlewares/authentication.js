import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import { attachCookiesToResponse, isTokenValid } from '../utils/index.js'
import Token from '../models/Token.js'

const authenticationUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies

  try {
    // if access token exist
    if (accessToken) {
      const payload = isTokenValid(accessToken)
      req.user = payload
      return next()
    }

    // if access token expired
    const payload = isTokenValid(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    })

    // ?. optional chaining
    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError('Authentication Invalid')
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    })

    req.user = payload.user
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}

const unauthenticateTestAdmin = (req, res, next) => {
  const testAdminId = '63ddaca09cd08c87a79a82d9'
  if (req.user.userId === testAdminId)
    throw new UnauthorizedError('Test Admin read only!')

  next()
}

export { authenticationUser, authorizePermissions, unauthenticateTestAdmin }
