/*
AFFICHAGE DU PRODUIT SELECTIONNE ET ENREGISTRER DANS LA LISTE LOCAL STORAGE
*/
//Récupérer Id du produit visité
let url = new URL(window.location.href);
const productId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;

/*Récupérer les DOMs nécéssaires*/
const itemQuantity = document.getElementById('quantity');
const productOption = document.getElementById("colors");
/*Récupérer les données du produit écouter le changement de couleur et de quantité*/
init(urlProduct);
function init(url) {
  fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(jsonProduct) {
      displayProduct(jsonProduct);
      const addToCart = document.getElementById('addToCart');
      addToCart.onclick = () => {
        let option = productOption.selectedIndex;
        if (option == 0) {
          window.alert("Veuillez choisir la couleur");
          return
        }
        let str = itemQuantity.value;
        let orderQuantity = +str;
        if (orderQuantity < 1 || orderQuantity > 100 || orderQuantity % 1 !== 0) {
          window.alert("Veuillez choisir la quantité (entre 1 et 100 unité entier)")
          return
        }
        let addedProducts = {
          "id": productId,
          "colors": productOption[option].value,
          "quantity": orderQuantity
        }
        saveInLocalStorage(addedProducts)
      }
    })
    .catch(function(err) {
      console.log(err);
    }
    )
}

const itemImg = document.querySelector(".item__img");
const productName = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');


/*Insérer le produit dans HTML*/ 
function displayProduct(product) {
    if (productId == product._id) {
    itemImg.innerHTML = `<img src="${product.imageUrl}"" alt="${product.altTxt}">`
    productName.textContent = product.name
    productPrice.textContent = product.price
    productDescription.textContent = product.description
    for (let i = 0; i < product.colors.length; i++) {
      productOption.innerHTML += `<option value=${product.colors[i]}>${product.colors[i]}</option>`
    }
  }
}

/*Enregister le produit dans local storage après cliquer sur le bouton 'ajouter au panier'*/
function saveInLocalStorage(addedProducts) {
  var localProducts = JSON.parse(localStorage.getItem("localProducts"))
  if (localProducts === null) {
    localProducts = [];
    localProducts.push(addedProducts);
    localStorage.setItem("localProducts", JSON.stringify(localProducts));
  }
  else {
    let found = 0;
    //vérifier si le même produit(même id et même couleur) est déjà existe dans local storage, si oui, =>changer la quantité, si non =>ajouter un nouveau produit à la liste
    for (let i = 0; i<localProducts.length; i++){
      if (localProducts[i].id == addedProducts.id && localProducts[i].colors == addedProducts.colors){
        localProducts[i].quantity = addedProducts.quantity + localProducts[i].quantity;
        localStorage.setItem("localProducts", JSON.stringify(localProducts));
        found = 1;
      }
    }
    
    if (found == 0){
        localProducts.push(addedProducts);
        localStorage.setItem("localProducts", JSON.stringify(localProducts));
    }  
  }
  window.alert('Produit est ajouté') 
}




 



