// import bcrypt from 'bcrypt';
import {Auth, getUserById } from '../model/model_user.js'
import {hashPassword, comparePassword} from "../helper/hash.js";
import {generateToken, verifyToken} from "../helper/jsonWebToken.js"

export const ctrlGetUserInfoByToken = async (req, res) => {
  const tokenHeader = req.headers["authorization"];
  console.log("tokenHeader: ", tokenHeader);

  try {
    if (!tokenHeader) {
      return res.status(401).json({ message: "No existe un token" });
    }

    // Extraer el token sin el prefijo "Bearer"
    const token = tokenHeader.replace("Bearer ", "");
    console.log("token recibido: ", token);

    try {
      const decodedToken = verifyToken(token);
      console.log("token decodificado: ", decodedToken);

      const userId = decodedToken.id;
      const user = await getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ message: 'Token inválido' });
      }

      console.error('Error interno del servidor:', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  } catch (outerError) {
    console.error('Error general:', outerError);
    res.status(500).json({ message: 'Error interno del servidor', error: outerError.message });
  }
};

export const ctrlLoginUser = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await Auth.findOne({ where: { correo } });
    if (user) {
      const passwordMatch = await comparePassword(password, user.password);
      if (passwordMatch) {
        const token = generateToken({ id: user.id, correo: user.correo });

        res.json({
          message: 'Autenticación exitosa',
          token,
        });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

  export const ctrlRegisterUser = async (req, res) => {
    const { correo, password } = req.body;
  
    try {
      const hashedPassword = await hashPassword(password);
  
      const newUser = await Auth.create({
        correo,
        password: hashedPassword,
      });
  
      res.status(200).json({
        message: 'Usuario registrado exitosamente',
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'no se pudo registrar el usuario' });
    }
  };


  export const editUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updateUser = await Auth.findByPk(id);
  
      if (!updateUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password, 10);
        req.body.password = hashedPassword;
      }
  
      await updateUser.update(req.body);
  
      res.status(200).json({
        message: 'El usuario logeado se ha actualizado:',
        updateUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error al actualizar este usuario logeado',
      });
    }
  };

  export const allUser=async(req, res)=>{
    try {
      const listaUsuarios= await Auth.findAll();
    res.status(200).json({
      message:"Lista de usuarios logeados ",
      listaUsuarios
    })
    } catch (error) {
    res.status(500).json({
      message:"error la lista de usuarios "
    })
    }
  }

  export const oneUser=async(req, res)=>{
    const {id}=req.params;
    try {
      const unUsuario= await Auth.findOne({
        where:{
          id
        }
      });
    res.status(200).json({
      message:"el usuario logeado: ",
      unUsuario
    })
    } catch (error) {
    res.status(500).json({
      message:"error al obtener este usuario logeado "
    })
    }
  }

  export const deleteUser=async(req, res)=>{
    try {
        const {id}=req.params;
        if (!id){
            return res.status(400).json({
                message:"no se pudo encontrar el id"
            })
        }
        const deleteClient=await Auth.findByPk(id)
        await deleteClient.destroy({estado:true});
        return res.status(200).json({
            message:"Se elimino correctamente el usuario"
        })
    } catch (error) {
        return res.status(500).json({
            message:"no se elimino correctamente el usuario"
        })
    }
}
