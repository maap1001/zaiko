document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('restablecerContraseña');

    modal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // El botón que activa el modal
        const token = button.getAttribute('data-token'); // Obtiene el token del atributo data

        // Escuchar el evento submit del formulario
        document.getElementById('password-reset').addEventListener('submit', function (e) {
            e.preventDefault(); // Prevenir el envío predeterminado del formulario

            const nuevaContraseña = document.getElementById('nuevaContraseña').value;

            fetch(`/v1/usuarios/restablecerContrasena/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nuevaContraseña })
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Contraseña cambiada correctamente, ya puedes iniciar sesión con tu nueva contraseña',
                        confirmButtonText: 'Cerrar ventana'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/';
                        }
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al restablecer la contraseña',
                });
                console.error('Error al restablecer la contraseña:', error);
            });
        });
    });
});
