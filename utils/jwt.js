import jwt from 'jsonwebtoken'
//sign token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}
//verify token
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

//attach cookies to res
const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: user })
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })

  const expireTimeAccessToken = 1000 * 60 * 15 // 15p
  const expireTimeRefreshToken = 1000 * 60 * 60 * 24 * 30 // 30day

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + expireTimeAccessToken),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + expireTimeRefreshToken),
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}

export { createJWT, isTokenValid, attachCookiesToResponse }
