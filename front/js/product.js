/*
AFFICHAGE DU PRODUIT SELECTIONNE
*/
//1.Récupérer Id du produit visité
let url = new URL(window.location.href);
const productId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;


/*Afficher le produit dans HTML*/
async function fetchProduct() {
  const product = await fetch(urlProduct)
  if (product.ok === true) {
    return product.json()
  }
  else throw new Error('impossible de contacter le server')
}
const itemImg = document.querySelector(".item__img");
const productName = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productOption = document.getElementById("colors");
init();
function init(){
  fetchProduct().then (jsonProduct => {
    displayProduct(jsonProduct);
  })
}
function displayProduct(jsonProduct) {
  let product = new Product(jsonProduct)
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

/*Enregister le produit dans local storage après ajouter au panier*/
const addToCart = document.getElementById('addToCart');
const itemColors = document.getElementById('colors');
const itemQuantity = document.getElementById('quantity');

addToCart.onclick = () => {
  let option = itemColors.options.selectedIndex
  if (option == 0) {
    window.alert("Veuillez choisir la couleur");
    return
  }
  let str = itemQuantity.value;
  let orderQuantity = +str;
  if (orderQuantity < 1 || orderQuantity > 100 || orderQuantity % 1 !== 0) {
    window.alert("Veuillez choisir la quantité (entre 1 et 100 unité)")
    return
  }
  let addedProducts = {
    "id": productId,
    "imageUrl": urlProduct,
    "name": productName.textContent,
    "colors": itemColors.value,
    "price": productPrice.textContent,
    "quantity": orderQuantity
  }
  saveInLocalStorage(addedProducts)
}
function saveInLocalStorage(addedProducts) {
  var localProducts = JSON.parse(localStorage.getItem("localProducts"))
  if (localProducts === null) {
    localProducts = [];
    localProducts.push(addedProducts);
    localStorage.setItem("localProducts", JSON.stringify(localProducts));
  }
  else {
      let found = 0;

      for (let i = 0; i<localProducts.length; i++){
        if (localProducts[i].id == addedProducts.id && localProducts[i].colors == addedProducts.colors){
          localProducts[i].quantity = addedProducts.quantity + localProducts[i].quantity;
          localStorage.setItem("localProducts", JSON.stringify(localProducts));
          found = 1;
        }
      }
      console.log(found);
      if (found == 0){
          localProducts.push(addedProducts);
          localStorage.setItem("localProducts", JSON.stringify(localProducts));
      }  
       
    }
   
  }

 


