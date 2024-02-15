import { sequelize } from '../database/db.js';
import { getUserById } from '../model/model_user.js';
import jwt from 'jsonwebtoken'

export const getUser = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.sendStatus(404)
  }

  const { user: userId } = jwt.verify(token, sequelize.process.env.SECRET)

  const user = await getUserById(userId)

  if (!user) {
    return res.sendStatus(403)
  }

  req.user = user
  next()
}