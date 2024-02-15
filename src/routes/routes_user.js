import  Router  from 'express'
import { ctrlGetUserInfoByToken, ctrlLoginUser, ctrlRegisterUser, allUser, oneUser, editUser, deleteUser} from '../controllers/controllers_user.js'

export const routes_auth = Router()

routes_auth.get('/user/', ctrlGetUserInfoByToken)

routes_auth.get('/users/', allUser)

routes_auth.get('/user/:id', oneUser)

routes_auth.post('/login',  ctrlLoginUser)

routes_auth.post('/register',  ctrlRegisterUser)

routes_auth.put('/user/:id',  editUser)

routes_auth.delete('/user/:id',  deleteUser)
