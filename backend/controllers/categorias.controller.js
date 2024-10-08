const modelCategoria = require('../models/categorias.models')

exports.registroCategorias = async (req, res) =>{
    res.render('admin/categorias/registroCategorias')
}

exports.listarCategorias = async (req, res) => {
    try {
        let categorias = await modelCategoria.find();  // Cambié categoria a categorias
        res.render('admin/categorias/listarCategorias', { categorias });  // Cambié el objeto
    } catch (error) {
        res.status(500).json({ mensaje: 'No se encuentran categorías' });
    }
};


exports.createCateg = async (req, res) => {
    try {
      const newCateg = {
        nombre: req.body.nombreCategoria,
        descripcion: req.body.descripcionCategoria,
        presentacion: req.body.presentacionCategoria,
      };
      const categoria = new modelCategoria(newCateg);
      await categoria.save();
      res.redirect('/v1/categorias/listarCategorias');
    } catch (error) {
      console.log('Error al registrar la categoría:', error);
      res.render('admin/categorias/registroCategorias', { mensaje: "Error al registrar la categoría. Intenta nuevamente." });
    }
  };

  exports.deleteCateg = async (req, res) => {
    try {
        // Obtener el ID de la categoría desde los parámetros de la ruta
        const categoriaId = req.params.id;

        // Buscar y eliminar la categoría por su ID
        await modelCategoria.findByIdAndDelete(categoriaId);

        // Redirigir a la lista de categorías después de eliminarla
        res.redirect('/v1/categorias/listarCategorias');
    } catch (error) {
        console.log('Error al eliminar la categoría:', error);
        res.status(500).json({ mensaje: "Error al eliminar la categoría." });
    }
};


exports.editarCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.id;
        const updatedData = {
            nombre: req.body.nombreCategoria,
            descripcion: req.body.descripcionCategoria,
            presentacion: req.body.presentacionCategoria,
        };

        // Actualizar la categoría en la base de datos
        await modelCategoria.findByIdAndUpdate(categoriaId, updatedData);

        res.redirect('/v1/categorias/listarCategorias');
    } catch (error) {
        console.log('Error al editar la categoría:', error);
        res.status(500).json({ mensaje: 'Se produjo un error al actualizar la categoría' });
    }
};
