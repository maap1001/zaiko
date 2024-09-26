$(document).ready(function () {
    // Cuando se hace clic en "Registrate"
    $("#sign-up").click(function () {
        // Cierra el modal de "login"
        $("#login").modal('hide');
        // Después de que el modal de login se cierre, abre el de "register"
        $('#login').one('hidden.bs.modal', function () {
            $("#register").modal('show');
        });
    });

    // Cuando se hace clic en "Iniciar Sesión"
    $("#sign-in").click(function () {
        // Cierra el modal de "register"
        $("#register").modal('hide');
        // Después de que el modal de register se cierre, abre el de "login"
        $('#register').one('hidden.bs.modal', function () {
            $("#login").modal('show');
        });
    });
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Manejador de evento para el botón "Acepto"
    document.getElementById('acceptTerms').addEventListener('click', function() {
        // Aquí puedes agregar la lógica para manejar la aceptación, como enviar datos al servidor o cambiar el estado de la interfaz.
        alert('Has aceptado los términos y condiciones.');
        
        // Cierra el modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('termsModal'));
        modal.hide();
    });
});