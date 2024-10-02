const mongoose = require('../config/database');

const schemaUsuario = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: [true, 'Ingrese el nombre completo']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, 'El correo ingresado no es válido'],  
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
        minLength: [8, 'La contraseña debe ser mínimo de 8 caracteres']
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user'],  
        default: 'user',
    },
    foto: {
        type: String,
        required: [true, 'No existe la imagen o ruta'],
        default: '/img/usuarios/user.png'  
    } 
});

const usuarioModel = mongoose.model("usuario", schemaUsuario);
module.exports = usuarioModel;
