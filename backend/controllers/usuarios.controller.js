const crypto = require('crypto');
const usuariosModel = require('../models/usuarios.models');
const nodemailer = require('../utils/nodemailer')

exports.usuarios = async (req, res) =>{
    try {
        const usuarios = await usuariosModel.find();
        res.render('admin/usuarios/usuarios', { usuarios });
    }catch(error) {
        console.log(error)
    }
}

exports.editarUsuarios = async (req, res) => {
    try {
        const { id } = req.params; 
        const { editarUsuarioNombreCompleto, editarUsuarioCorreo, editarUsuarioRol } = req.body; 

        const datosActualizados = {
            nombreCompleto: editarUsuarioNombreCompleto,
            correo: editarUsuarioCorreo,
            rol: editarUsuarioRol,
        };

        if (req.file) {
            datosActualizados.foto = req.file.filename; 
        }

        const actualizarUsuario = await usuariosModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarUsuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.redirect("/v1/usuarios"); 
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el usuario", error: error.message });
    }
};



exports.detalleUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuariosModel.findById(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuario); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar el usuario' });
    }
};

exports.eliminarUsuarios = async (req, res) => {
    try {
        await usuariosModel.findByIdAndDelete(req.params.id);
        res.redirect('/v1/usuarios');
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error" });
    }
};

exports.insertarUsuarios = async (nuevoUsuario) => {
    try {
        const usuarioExistente = await usuariosModel.findOne({ correo: nuevoUsuario.correo });
        if (usuarioExistente) {
            throw new Error("El correo ya está registrado.");
        }
        return await usuariosModel(nuevoUsuario).save();
    } catch (error) {
        if (error.code === 11000) { 
            console.error("Error: El correo ya está registrado.");
            throw new Error("El correo ya está registrado.");
        } else {
            console.error("Error al insertar el usuario:", error);
            throw new Error("Error al insertar el usuario");
        }
    }
};

exports.registroUsuarios = async (req, res) => {
    try {
        const usuario = {
            nombreCompleto: req.body.nombreCompleto,
            correo: req.body.correo,
            contraseña: req.body.contraseña,
        };

        console.log('Intentando crear un nuevo usuario...'); 

        let insertarUsuario = await exports.insertarUsuarios(usuario);
        
        if (!insertarUsuario) {
            throw new Error("Error al crear el usuario");
        }

        console.log(`Usuario ${usuario.nombreCompleto} creado exitosamente con el correo ${usuario.correo}`);

        await nodemailer.sendEmail(usuario.correo, "Confirmación de Registro", `Gracias por tu registro ${usuario.nombreCompleto}`);
        
        console.log(`Correo de confirmación enviado a ${usuario.correo}`); 

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error al registrar el usuario " });
        console.error(error);
    }
};

exports.loginUsuarios = async (req, res) => {
    const { correoLogin, contraseñaLogin } = req.body;  

    try {
        
        const usuario = await usuariosModel.findOne({ correo: correoLogin });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'El usuario no existe' });
        }

        const esValido = await usuario.compararContraseña(contraseñaLogin);

        if (!esValido) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        req.session.userId = usuario;

        res.redirect("/v1/panelGestion"); 

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

exports.logoutUsuarios = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al cerrar la sesión' });
        }
        res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
    });
};

exports.recuperacionContraseñaUsuarios = async (req, res) => {
    const { correoRecuperarContraseña } = req.body;

    try {
        const usuario = await usuariosModel.findOne({ correo:correoRecuperarContraseña });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'El correo no está registrado' });
        }

        // Generar un token de restablecimiento
        const token = crypto.randomBytes(20).toString('hex');
        const expiracion = Date.now() + 3600000; // Token válido por 1 hora

        // Guardar token y expiración en el usuario
        usuario.tokenRecuperarContraseña = token;
        usuario.expiracionToken = expiracion;

        await usuario.save();

        // Enviar correo electrónico con el token
        const enlaceRecuperacion = `http://${req.headers.host}/v1/restablecerContrasena/${token}`;
        await nodemailer.sendEmail(
            usuario.correo,
            "Restablecimiento de contraseña",
            `Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace o cópialo en tu navegador: ${enlaceRecuperacion}`
        );

        console.log(`Correo de recuperación enviado a ${usuario.correo}`);
        res.status(200).json({ mensaje: 'Correo de recuperación enviado' });

    } catch (error) {
        console.error('Error al solicitar la recuperación de contraseña:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

exports.restablecerContraseñaUsuarios = async (req, res) => {
    const { token } = req.params;
    const { nuevaContraseña } = req.body;

    try {
        const usuario = await usuariosModel.findOne({
            tokenRecuperarContraseña: token,
            expiracionToken: { $gt: Date.now() } // Verifica que el token no haya expirado
        });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'El token es inválido o ha expirado' });
        }

        // Actualizar la contraseña
        usuario.contraseña = nuevaContraseña;
        usuario.tokenRecuperarContraseña = undefined;  // Borrar el token después de usarlo
        usuario.expiracionToken = undefined; 

        await usuario.save();

        // Confirmación por correo electrónico (opcional)
        await nodemailer.sendEmail(
            usuario.correo,
            "Contraseña Restablecida",
            `Tu contraseña ha sido actualizada correctamente.`
        );

        res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });

    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
