const urlProducts = `http://localhost:3000/api/products`;
container = document.getElementById('cart__items');
var localProducts = JSON.parse(localStorage.getItem("localProducts"))
init()

function init () {
    if (localProducts == null || localProducts.length == 0){
        /*container.style = 'display:none';*/
        document.querySelector ('h1').textContent = 'Votre panier est vide';
    }
    else {
        let itemsQuantity = 0;
        let itemsPrice = 0;
        for (let i = 0; i < localProducts.length; i++){
            container.innerHTML += `<article class="cart__item" data-id=${localProducts[i].id} data-color="${localProducts[i].colors}">
                                        <div class="cart__item__img">
                                            <img src=${localProducts[i].imageUrl} alt=${localProducts[i].altTxt}>
                                        </div>
                                        <div class="cart__item__content">
                                        <div class="cart__item__content__description">
                                            <h2>${localProducts[i].name}</h2>
                                            <p>${localProducts[i].colors}</p>
                                            <p>${parseFloat(localProducts[i].price)} €</p>
                                        </div>
                                        <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                            <p>Qté : ${localProducts[i].quantity}</p>
                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${localProducts[i].quantity}>
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                            </div>
                                        </div>
                                        </div>
                                    </article>`;
            itemsQuantity += localProducts[i].quantity;
            itemsPrice += localProducts[i].quantity * parseFloat(localProducts[i].price);
        }
        document.getElementById('totalQuantity').textContent = itemsQuantity;
        document.getElementById('totalPrice').textContent = itemsPrice;
       
    }
   }
const supprimerButtons = document.querySelectorAll(".deleteItem");

supprimerButtons.forEach(function(supprimerButton){
    supprimerButton.addEventListener("click",function(){
        let supprimerId = supprimerButton.closest(".cart__item").getAttribute('data-id');
        let supprimerColors = supprimerButton.closest(".cart__item").getAttribute('data-color');
        for(let localProduct of localProducts){
            if (localProduct.id == supprimerId && localProduct.colors == supprimerColors){
                localProducts = localProducts.filter(product => product != localProduct);
                localStorage.setItem("localProducts", JSON.stringify(localProducts));
                
            }
        }
        location.reload();
    })
})

const changeQuantityInputs = document.querySelectorAll(".itemQuantity");

changeQuantityInputs.forEach(function(changeQuantityInput){
    changeQuantityInput.addEventListener("change", function(){
        let changeQuantityId = changeQuantityInput.closest(".cart__item").getAttribute('data-id');
        let changeQuantitycolors = changeQuantityInput.closest(".cart__item").getAttribute('data-color');
        for(let localProduct of localProducts){
            if (localProduct.id == changeQuantityId && localProduct.colors == changeQuantitycolors){
                localProduct.quantity = parseInt(changeQuantityInput.value);
                localStorage.setItem("localProducts", JSON.stringify(localProducts));
            }
        }
        location.reload();
    })
})

    


