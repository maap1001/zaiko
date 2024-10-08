const mongoose = require('../config/database');

const schemaAlmacenes = new mongoose.Schema({
    ubicacion: {
        type: String,
        required: [true, 'la ubicacion es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    }
});

const almacenesModel = mongoose.model("almacenes", schemaAlmacenes);
module.exports = almacenesModel;
