// $(document).ready(function() {
//     $('#loginForm').on('submit', function(event) {
//         event.preventDefault(); 

//         $.ajax({
//             url: '/v1/usuarios/cambiarContrasenaUsuario', 
//             method: 'POST',
//             data: $(this).serialize(),
//             success: function(response) {
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Cambio de contrasena exitoso',
//                     confirmButtonText: 'Cerrar'
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         window.location.href = '/v1/panelGestion';
//                     }
//                 });
//             },
//             error: function(xhr) {
//                 let mensajeError = 'Ocurrió un error al cambiar la contrasena'; 
//                 if (xhr.responseJSON && xhr.responseJSON.mensaje) {
//                     mensajeError = xhr.responseJSON.mensaje; 
//                 }
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: mensajeError,
//                 });
//             }
//         });
//     });
// });

//CERRAR MODAL

$(document).ready(function() {
    $('#cerrarModal').click(function() {
        $('#cambiarContraseña').modal('hide'); 
    });
});