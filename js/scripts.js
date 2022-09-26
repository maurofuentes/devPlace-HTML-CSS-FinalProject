function getLocalTime(){
    let time = new Date();
    let timeDiv = document.getElementById('timeDiv');
    timeDiv.innerHTML=time.toLocaleTimeString();
}

setInterval(getLocalTime, 1000);

/**ASIDE FUNCTIONS */
function aside_open() {
    document.getElementById("aside").style.width = "100%";
    document.getElementById("aside").style.display = "block";
}

function aside_close() {
    document.getElementById("aside").style.display = "none";
}
/**END -  ASIDE FUNCTIONS */

/**FAVORITES */
$('#favorite-icon').click(function(){
    if($('#favorite-icon').hasClass('mf-active-btn')){
        $('#favorite-icon').removeClass('mf-active-btn');
    } else {
        $('#favorite-icon').addClass('mf-active-btn');
    }
});
/** END - FAVORITES */

/** CART - VARIABLES */
const pillCartAmount = document.querySelector('#pillCartAmount');
const productsContainer = document.querySelector('#products-container');
const cartProductsUl = document.querySelector('#cartProductsUl');
const clearCartBtn = document.querySelector('#clearCartBtn');
const totalToPay = document.querySelector('#totalToPay');

let total = 0;

let amount = 0;

let cartAmount = localStorage.getItem('cartAmount') || 0;
updateCartAmountPill();

let cart = [];

loadEventListeners();

//carga eventListeners del carrito
function loadEventListeners(){
    //click para agregar producto al carrito (sin usar sweetalert2)
    //productsContainer.addEventListener('click', addToCart);

    //click para eliminar producto del carrito
    cartProductsUl.addEventListener('click', deleteFromCart);

    //muestra carrito desde localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        cart = JSON.parse(localStorage.getItem('cart') || []);
        generateHTML();
    })
    
    //click vaciar carrito
    clearCartBtn.addEventListener('click', ()=>{
        cart = [];
        cartAmount = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartAmount', cartAmount);

        clearHTML();
        updateCartAmountPill();
        amount = 0;
        totalToPay.innerHTML = 0;
    });

}

/** END - CART  - VARIABLES */

/** CART - FUNCTIONS */

//agrega producto al carrito (sin usar sweetalert2 - activar productsContainer.addEventListener('click', addToCart);)
function addToCart(e){
    e.preventDefault();

    if(e.target.classList.contains('mf-add-to-cart-btn')){
        const selectedProduct = e.target.parentElement.parentElement;

        getProductData(selectedProduct);
    }

}

//elimina producto del carrito
function deleteFromCart(e){

    e.preventDefault();

    if(e.target.classList.contains('mf-delete-btn')){
        const productId = e.target.getAttribute('data-id');

        cart = cart.filter((product)=> product.id != productId );

        cartAmount = cart.length;

        amount = cart.length;

        localStorage.setItem('cartAmount', cartAmount)

        updateCartAmountPill();

        generateHTML();

    }

}

//obtiene datos del producto seleccionado y lo agrega al array cart
function getProductData(productData){

    //objeto con el product data actual
    const newProduct = {
        name: productData.querySelector('h5').textContent,
        price: productData.querySelector('.mf-card-price').textContent.substring(1),
        id: productData.querySelector('.mf-add-to-cart-btn').getAttribute('data-product-id'),
        amount: 1
    }

    //revisa si el elemento ya existe en el cart
    const alreadyInCart = cart.some((product)=>product.id === newProduct.id);
    
    if(alreadyInCart){ //actualizamos amount
        cart.map((product)=>{
            if(product.id === newProduct.id){
                product.amount++;
                return cart;
            }
        });

    } else {//agrega al carrito
        cart = [...cart, newProduct];
    }
    
    amount++;

    localStorage.setItem('cartAmount', amount);

    cartAmount = localStorage.getItem('cartAmount');
    
    updateCartAmountPill();

    generateHTML();
}

//muestra en el html el producto seleccionado
function generateHTML() {
    total = 0;    

    //limpia html
    clearHTML();

    //itera el array cart y genera un nuevo li y lo agrega al html del carrito
    cart.map((product)=>{
        const {name, price, id, amount} = product;

        const productLi = document.createElement('li');

        productLi.classList.add('dropdown-item');
        productLi.classList.add('fw-bold');

        total += parseInt(price)*amount;

        productLi.innerHTML = `${name} - $${price} x  ${amount} = $${parseInt(price)*amount} <button class='btn btn-sm btn-danger mx-3 my-1 mf-delete-btn' data-id='${id}'>X</button>`;

        cartProductsUl.appendChild(productLi);
    });

    totalToPay.innerHTML = total;

    //almacena en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

//limpia HTML
function clearHTML(){

    while(cartProductsUl.firstChild){
        cartProductsUl.removeChild(cartProductsUl.firstChild);
    }
    
}

//cart amount pill
function updateCartAmountPill(){
    if(cartAmount == 0){
        pillCartAmount.setAttribute('hidden', 'hidden');
    } else {
        pillCartAmount.innerHTML = cartAmount;
        pillCartAmount.removeAttribute('hidden');
    }
}


//add to cart btn click
$('.mf-add-to-cart-btn').click(function(){
    Swal.fire({
    title: 'Agregando Producto',
    text: '¿Agregar al Carrito?',
    icon: 'warning',
    confirmButtonText: 'Ok',
    showDenyButton: true,
    denyButtonText: 'Cancel'
    }).then((value)=>{
        if(value.isConfirmed){
            //agrego al carrito
            if(this.classList.contains('mf-add-to-cart-btn')){
                const selectedProduct = this.parentElement.parentElement;
        
                getProductData(selectedProduct);
            }

        }
    });
});
/** END - CART - FUNCTIONS */
