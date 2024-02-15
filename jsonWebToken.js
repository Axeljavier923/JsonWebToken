import jwt from 'jsonwebtoken'
import { sequelize } from './src/database/db.js'

export const createJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, sequelize.SECRET, (err, token) => {
      if (err) {
        reject('Error al firmar el token')
      }

      resolve({ token })
    })
  })
}