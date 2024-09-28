const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const schemaProducto = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    categorias:{
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    unidad:{
        type: String,
        required: true
    },
    lote:{
        type: String,
        required: true
    },
    vencimiento:{
        type: Date,
        required: true
    },
    precio: {
        type: Number,
        default: 0,
        min: [0, 'El precio por defecto es 0']
    },
    imagen: {
        type: String,
        required: [true, 'No existe la imagen o ruta']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock por defecto es 0']
    },
    almecenes:{
        type: Schema.Types.ObjectId,
        ref: 'almecenes',
        required: true
    },
},{versionKey:false});

const productoModel = mongoose.model("producto", schemaProducto);
module.exports = productoModel;
