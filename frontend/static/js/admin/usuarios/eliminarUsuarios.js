//--========================================================== -->
//--Scrip para eliminar usuarios-->
//--========================================================== -->

$('#eliminarUsuario').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');

    var modal = $(this);
    var form = modal.find('#formEliminarUsuario');

    form.attr('action', '/v1/usuarios/eliminarUsuario/' + id);
});