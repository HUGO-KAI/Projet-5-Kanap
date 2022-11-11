
const urlProducts = `http://localhost:3000/api/products`;
container = document.getElementById('cart__items');
var localProducts = JSON.parse(localStorage.getItem("localProducts"))


/*Afficher les canapés choisis par utilisateur dans la page panier*/
init()
function init () {
    if (localProducts == null || localProducts.length == 0){
        
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

/*Permettre aux utilisateurs de supprimer les items dans le panier*/ 
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

/*Permettre aux utilisateurs de modifier la quantité des items présent dans le panier*/ 
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

/*Valider l'information saisi par acheteur dans le formulaire*/
const form = document.querySelector('.cart__order__form');

//valider input prénom
let nameRegExp = new RegExp (/^[a-zA-Z ,.'-éèàë]+$/i);
form.firstName.addEventListener('change', function(){
    valideFirstName(this);
});
const valideFirstName = function(inputFirstName){
    let test = nameRegExp.test(inputFirstName.value);
    if (test == false) {
        document.getElementById("firstNameErrorMsg").textContent = "Prénom non valide";
        return false;
    }
    else {
        document.getElementById("firstNameErrorMsg").textContent = "Prénom valide";
        return true;
    }
};

//valider input nom
form.lastName.addEventListener('change', function(){
    valideLastName(this);
});
const valideLastName = function(inputLastName){
    let test = nameRegExp.test(inputLastName.value);
    if (test == false) {
        document.getElementById("lastNameErrorMsg").textContent = "Nom non valide";
        return false;
    }
    else {
        document.getElementById("lastNameErrorMsg").textContent = "Nom valide";
        return true;
    }
};

// valider input ville
form.city.addEventListener('change', function(){
    valideCity(this);
});
const valideCity = function(inputVille){
    let test = nameRegExp.test(inputVille.value);
    if (test == false) {
        document.getElementById("cityErrorMsg").textContent = "Ville non valide";
        return false;
    }
    else {
        document.getElementById("cityErrorMsg").textContent = "Ville valide";
        return true;
    }
};

//valider input adresse
let adresseRegExp = new RegExp (
    '[a-zA-Z0-9]'
);
form.address.addEventListener('change', function(){
    valideAdresse(this);
});
const valideAdresse = function(inputAdresse){
    let test = adresseRegExp.test(inputAdresse.value);
    if (test == false) {
        document.getElementById("addressErrorMsg").textContent = "L'adresse non valide";
        return false;
    }
    else {
        document.getElementById("addressErrorMsg").textContent = "L'adresse valide";
        return true;
    }
};

//valider email
var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
form.email.addEventListener('change', function(){
    valideEmail(this);
});
const valideEmail = function(inputEmail){
   let testEmail = emailRegExp.exec(inputEmail.value);
    if (testEmail == null || testEmail == false) {
        document.getElementById("emailErrorMsg").textContent = "Email non valide";
        return false;
    }
    else {
        document.getElementById("emailErrorMsg").textContent = "Email valide";
        return true;
    }
};

console.log(form.firstName.value)
/*Constituer un objet contact (à partir des données du formulaire)*/
const urlOrder = `http://localhost:3000/api/products/order`;
let getId = localProducts.map(product => product.id);


form.addEventListener('submit',function(e){
    e.preventDefault();
    let contact = {
        "firstName":form.firstName.value,
        "lastName":form.lastName.value,
        "address":form.address.value,
        "city":form.city.value,
        "email":form.email.value
    };
    console.log(contact);
    console.log(getId);
    if (valideFirstName(form.firstName) && valideLastName(form.lastName)  && valideAdresse(form.address) && valideCity(form.city) && valideEmail(form.email)){
        
        const promise = fetch(urlOrder, {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact,
                products : getId
                
            }),
            
        })
       
    }
});
