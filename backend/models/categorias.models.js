const mongoose = require('../config/database');

const schemaCategorias = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    presentacion: {
        type: String,
        required: [true, 'La presentacion es obligatoria']
    }
});

const categoriasModel = mongoose.model("categorias", schemaCategorias);
module.exports = categoriasModel;
