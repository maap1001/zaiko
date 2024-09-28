const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const schemaDevoluciones = new mongoose.Schema({
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatorio']
    },
    motivo:{
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: [true, 'No existe la imagen o ruta']
    },
    almecenes:{
        type: Schema.Types.ObjectId,
        ref: 'almecenes',
        required: true
    },
},{versionKey:false});

const devolucionesModel = mongoose.model("devoluciones", schemaDevoluciones);
module.exports = devolucionesModel;
