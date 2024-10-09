const proveedoresModel = require('../models/proovedores.models');

exports.proveedores = async (req, res) => {
    try {
        const proveedores = await proveedoresModel.find();
        res.render('admin/proveedores/proveedores', { proveedores });
    } catch (error) {
        console.log(error)
    }
}

exports.crearProveedores = async (req, res) => {
    try {
        const nuevoProveedor = new proveedoresModel({
            nombre: req.body.nombreProveedorCrear,
            documento: req.body.documentoProveedorCrear,
            telefono: req.body.telefonoProveedorCrear,
            correo: req.body.correoProveedorCrear,
            ubicacion: {
                direccion: req.body.direccionProveedorCrear,
                ciudad: req.body.ciudadProveedorCrear,
                departamento: req.body.departamentoProveedorCrear
            },
            tipoEmpresa: req.body.tipoEmpresaProveedorCrear,
            metodoPago: req.body.metodoPagoProveedorCrear,
        });

        // Verificar si el documento ya existe
        const documentoExistente = await proveedoresModel.findOne({ documento: req.body.documentoProveedorCrear });
        if (documentoExistente) {
            return res.status(400).json({ mensaje: "El documento ya está en uso. Por favor, utiliza otro." });
        }

        // Verificar si el correo ya existe
        const correoExistente = await proveedoresModel.findOne({ correo: req.body.correoProveedorCrear });
        if (correoExistente) {
            return res.status(400).json({ mensaje: "El correo ya está en uso. Por favor, utiliza otro." });
        }

        await nuevoProveedor.save();
        res.json({ mensaje: "Proveedor creado con éxito"});
    } catch (error) {
        console.log('Error al registrar El proveedor:', error);
        res.status(400).json({ mensaje: "Error al registrar el proveedor. Intenta nuevamente." });
    }
};
