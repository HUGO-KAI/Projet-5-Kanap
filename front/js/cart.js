/*Afficer les produits choisis et écouter le changement de quantité ou supprimer*/
const urlProducts = `http://localhost:3000/api/products`;
container = document.getElementById('cart__items');
var localProducts = JSON.parse(localStorage.getItem("localProducts"))

/*Afficher les canapés choisis par utilisateur dans la page panier*/
init(urlProducts)
function init (url) {
    if (localProducts == null || localProducts.length == 0){
        
        document.querySelector ('h1').textContent = 'Votre panier est vide';
    }
    else {
        fetch(url)
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function(products) {
            let itemsQuantity = 0;
            let itemsPrice = 0;
            for (let i = 0; i < products.length; i++ ){
                for (let j = 0; j < localProducts.length; j++){
                    if (products[i]._id == localProducts[j].id){
                        container.innerHTML += `<article class="cart__item" data-id=${localProducts[j].id} data-color="${localProducts[j].colors}">
                        <div class="cart__item__img">
                            <img src=${products[i].imageUrl} alt=${products[i].altTxt}>
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${products[i].name}</h2>
                            <p>${localProducts[j].colors}</p>
                            <p>${parseFloat(products[i].price)} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${localProducts[j].quantity}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${localProducts[j].quantity}>
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article>`;
                    itemsQuantity += parseInt(localProducts[j].quantity);
                    itemsPrice += itemsQuantity * parseFloat(products[i].price);
                    }
                }
            }
            const supprimerButtons = document.querySelectorAll(".deleteItem");
            supprimerButtons.forEach(function(supprimerButton){
                supprimerButton.addEventListener("click",function(){
                    deleteItem(supprimerButton);
                })
            changeQuantity(localProducts);
            
            document.getElementById("totalQuantity").textContent = itemsQuantity;
            document.getElementById("totalPrice").textContent = itemsPrice;
        }
        )})
        .catch(function(err) {
            console.log(err);
        })
    }   
}    

/*Permettre aux utilisateurs de supprimer les items dans le panier */
function deleteItem(supprimerButton){
    let supprimerId = supprimerButton.closest(".cart__item").getAttribute('data-id');
    let supprimerColors = supprimerButton.closest(".cart__item").getAttribute('data-color');
    for(let localProduct of localProducts){
        if (localProduct.id == supprimerId && localProduct.colors == supprimerColors){
            supprimerButton.closest(".cart__item").style = "display:none";
            localProducts = localProducts.filter(product => product != localProduct);
            localStorage.setItem("localProducts", JSON.stringify(localProducts));
        }
    }
}
   



/*Permettre aux utilisateurs de modifier la quantité des items présent dans le panier */
function changeQuantity(){
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
            
        })
    })
}




/*Valider l'information saisi par acheteur dans le formulaire*/
const form = document.querySelector('.cart__order__form');

//valider input prénom
let nameRegExp = /^[a-z\é\è\ç]+[a-z\é\è\ç\s\-\'\_\/]*[a-z\é\è\ç\s]$/i;
form.firstName.addEventListener('change', function(){
    valideFirstName(this);
});
const valideFirstName = function(inputFirstName){
    let testFirstName = nameRegExp.test(inputFirstName.value);
    if (testFirstName == false) {
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
    let testLastName = nameRegExp.test(inputLastName.value);
    if (testLastName == false) {
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
    let testCity = nameRegExp.test(inputVille.value);
    if (testCity == false) {
        document.getElementById("cityErrorMsg").textContent = "Ville non valide";
        return false;
    }
    else {
        document.getElementById("cityErrorMsg").textContent = "Ville valide";
        return true;
    }
};

//valider input adresse
let adresseRegExp = /^[a-z0-9\é\è\ç]+[a-z0-9\é\è\ç\s\-\'\_\/\,]*[a-z\é\è\ç]$/i;
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
    
    if (valideFirstName(form.firstName) && valideLastName(form.lastName)  && valideAdresse(form.address) && valideCity(form.city) && valideEmail(form.email)){
        
        fetch(urlOrder, {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact,
                products : getId
                
            }),
            
        }) .then((res) => res.json())
        .then((data) => {
          console.log(data);
       console.log(data.orderId);
        })
  
        .catch(function (err) {
          alert("erreur");
        });
       
    }
});
