import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function verifyToken (req, res, next) {
  const bearerHeader = req.headers.authorization

  if (!bearerHeader) {
    return res.status(401).json({
      auth: false,
      message: 'no token provided'
    })
  }

  const decoded = jwt.verify(bearerHeader, process.env.SECRET_KEY)

  req.id = decoded.id
  next()
}
