const mongoose = require('../config/database');

const schemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese el nombre completo']
    },
    correo: {
        type: String,
        unique: [true, 'El correo ya existe'],
        required: true
    },
    pass: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
        minLength: [8, 'La contraseña debe ser mínimo de 8 caracteres']
    },
    rol: {
        type: String,
        default: "guest",
    },
    foto: {
        type: String,
        required: [true, 'No existe la imagen o ruta']    
}
});

const usuarioModel = mongoose.model("usuario", schemaUsuario);
module.exports = usuarioModel;
