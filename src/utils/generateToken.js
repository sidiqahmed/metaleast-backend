import jwt from 'jsonwebtoken'

const generateToken = (userId, expiresIn) => {
  if (expiresIn) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn })
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET)
}

export { generateToken as default }
