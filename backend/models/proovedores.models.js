const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const schemaProovedores = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese el nombre completo']
    },
    documento:{
        type:String,
        require: [true, 'ingrese su documento'],
        maxLength:[11, 'ingrese un documento valido']
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        minLength:[9, 'El telefono ingresado es muy corto'],
        maxLength:[14, 'El telefono ingresado es muy extenso']
    },
    correo: {
        type: String,
        required: [true, 'Ingrese el correo']
    },
    productos:{
        type: Schema.Types.ObjectId,
        ref: 'productos',
        required: true
    }
});

const ProovedoresModel = mongoose.model("proovedores", schemaProovedores);
module.exports = ProovedoresModel;