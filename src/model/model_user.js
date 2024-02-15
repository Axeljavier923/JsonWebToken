import { sequelize, DataTypes } from "../database/db.js";

export const Auth=sequelize.define(
    "auth",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        correo:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    },
    {
        timestamps:true,
        tableName: "auth",
    }
);

//crear tabla

Auth.sync({force:false}).then(()=>{
    console.log("Se a creado la tabla de auth")
}).catch(()=>{
    console.log("no se pudo crear la tabla de auth")
})

// Obtener usuario por ID
export const getUserById = async (userId) => {
    try {
      const user = await Auth.findByPk(userId);
      return user;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw error;
    }
  };

  export const getAllUsers=async ()=>{
    return await Auth.findAll() ?? null;
  }

  export const getOneUser = async (id) => {
    return await Auth.findOne({
      where: {
        id
      }
    }) ?? null;
  };

  export const EditOneUsers=async (id)=>{
    return await Auth.findByPk(id);;
  }

  export const DeleteOneUsers=async (id)=>{
    return await Auth.findByPk(id)
  }

  export const RegisterOneUsers=async (correo, hashedPassword)=>{
    return await Auth.create({
        correo,
        password: hashedPassword,
      });
  }

  export const LoginOneUsers=async (correo)=>{
    return await Auth.findOne({where:{correo}})
  }


