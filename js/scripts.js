$(document).ready(function() {
    
    $('.mf-add-to-cart-btn').click(function(){
        Swal.fire({
            title: 'Producto agregado!',
            text: 'Continua agregando productos al carrito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    });

});