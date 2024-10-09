//--========================================================== -->
//--Scrip crear proveedor-->
//--========================================================== -->

$(document).ready(function() {
    $('#formCrearProveedor').on('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario

        $.ajax({
            url: '/v1/proveedores/crearProveedor',  
            method: 'POST',  
            data: $(this).serialize(), // Envía los datos del formulario
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Operación exitosa!',
                    text: response.mensaje,
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/v1/proveedores/';  
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al registrar el proveedor';
                if (xhr.responseJSON && xhr.responseJSON.mensaje) {
                    mensajeError = xhr.responseJSON.mensaje; // Mensaje de error del servidor
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError,
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
});

