function getLocalTime(){
    let time = new Date();
    let timeDiv = document.getElementById('timeDiv');
    timeDiv.innerHTML=time.toLocaleTimeString();
}

setInterval(getLocalTime, 1000);

$(document).ready(function() {
    
    $('.mf-add-to-cart-btn').click(function(){
        Swal.fire({
            title: 'Producto agregado!',
            text: 'Continua agregando productos al carrito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    });
    
    function addToFavorite(me){
        if(me.hasClass('mf-active-btn')){
            me.removeClass('mf-active-btn');
        } else {
            me.addClass('mf-active-btn');
        }
    }

    $('#favorite-icon').click(function(){
        if($('#favorite-icon').hasClass('mf-active-btn')){
            $('#favorite-icon').removeClass('mf-active-btn');
        } else {
            $('#favorite-icon').addClass('mf-active-btn');
        }
    });

});