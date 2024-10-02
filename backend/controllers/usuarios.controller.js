const usuariosModel = require('../models/usuarios.models');
const nodemailer = require('../utils/nodemailer')

exports.usuarios = async (req, res) =>{
    res.render('admin/usuarios/usuarios')
}

exports.insertarUsuarios = async (nuevoUsuario) => {
    try {
        const usuarioExistente = await usuariosModel.findOne({ correo: nuevoUsuario.correo });
        if (usuarioExistente) {
            throw new Error("El correo ya está registrado.");
        }
        return await usuariosModel(nuevoUsuario).save();
    } catch (error) {
        if (error.code === 11000) { 
            console.error("Error: El correo ya está registrado.");
            throw new Error("El correo ya está registrado.");
        } else {
            console.error("Error al insertar el usuario:", error);
            throw new Error("Error al insertar el usuario");
        }
    }
};

exports.registroUsuarios = async (req, res) => {
    try {
        const usuario = {
            nombreCompleto: req.body.nombreCompleto,
            correo: req.body.correo,
            contraseña: req.body.contraseña,
        };

        console.log('Intentando crear un nuevo usuario...'); 

        let insertarUsuario = await exports.insertarUsuarios(usuario);
        
        if (!insertarUsuario) {
            throw new Error("Error al crear el usuario");
        }

        console.log(`Usuario ${usuario.nombreCompleto} creado exitosamente con el correo ${usuario.correo}`);

        await nodemailer.sendEmail(usuario.correo, "Confirmación de Registro", `Gracias por tu registro ${usuario.nombreCompleto}`);
        
        console.log(`Correo de confirmación enviado a ${usuario.correo}`); 

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error al registrar el usuario " });
        console.error(error);
    }
};