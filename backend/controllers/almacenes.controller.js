const modelAlmacen = require('../models/almacenes.models')

exports.registroAlmacenes = async (req, res) =>{
    res.render('admin/almacenes/registroAlmacenes')
}

exports.listarAlmacenes = async (req, res) => {
    try {
        let almacenes = await modelAlmacen.find();  
        res.render('admin/almacenes/listarAlmacenes', { almacenes }); 
    } catch (error) {
        res.status(500).json({ mensaje: 'No hay almacenes registrados' });
    }
};

exports.crearAlmacen = async (req, res) => {
    try {
      const nuevoAlmacen = {
        ubicacion: req.body.ubicacion,
        descripcion: req.body.descripcionAlmacen,
        cantidad: req.body.cantidad,
      };
      const almacen = new modelAlmacen(nuevoAlmacen);
      await almacen.save();
      res.redirect('/v1/almacenes/listarAlmacenes');
    } catch (error) {
      console.log('Error al registrar el almacen:', error);
      res.render('admin/almacenes/registroAlmacenes', { mensaje: "Error al registrar almacen. Intenta nuevamente." });
    }
  };


  exports.editarAlmacen = async (req, res) => {
    try {
        const almacenId = req.params.id;
        const updatedData = {
            ubicacion: req.body.ubicacion,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
        };

        await modelAlmacen.findByIdAndUpdate(almacenId, updatedData);

        res.redirect('/v1/almacenes/listarAlmacenes');
    } catch (error) {
        console.log('Error al editar el almacén:', error);
        res.status(500).json({ mensaje: 'Se produjo un error al actualizar el almacén' });
    }
};



exports.eliminarAlmacen = async (req, res) => {
    try {
        const almacenId = req.params.id;
        await modelAlmacen.findByIdAndDelete(almacenId);

        res.redirect('/v1/almacenes/listarAlmacenes');
    } catch (error) {
        console.log('Error al eliminar almacen:', error);
        res.status(500).json({ mensaje: "Error al eliminar el almacen." });
    }
};

