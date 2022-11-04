/*
AFFICHAGE DU PRODUIT SELECTIONNE

var url = new URL(str);
var name = url.searchParams.get("name");
console.log(name);
*/
const urlProducts = `http://localhost:3000/api/products`;
let url = new URL(window.location.href);
const productId = url.searchParams.get("id");
console.log(productId);

async function fetchProduct(){
    const products = await fetch (urlProducts)
    if (products.ok === true){
      return products.json()
      }
    else throw new Error ('impossible de contacter le server')
  }

  const itemImg = document.querySelector(".item__img");
  const productName = document.getElementById('title');
  const productPrice = document.getElementById('price');
  const productDescription = document.getElementById('description');
  const productOption = document.getElementById("colors");

  fetchProduct().then (jsonProducts => {
    displayProducts(jsonProducts);
  })
  function displayProducts(jsonProducts) {
    for (let jsonProduct of jsonProducts) {
  
        /*Créer un objet product*/    
        let product = new Product(jsonProduct);
  
        /*Vérifier si les données sont bien récupérées*/
        console.log(product)
        if (productId == product._id) {
            itemImg.innerHTML = `<img src="${product.imageUrl}"" alt="${product.altTxt}">`
            productName.textContent = product.name
            productPrice.textContent = product.price
            productDescription.textContent = product.description
            for (let i=0; i<product.colors.length;i++){
                productOption.innerHTML += `<option value=${product.colors[i]}>${product.colors[i]}</option>`
            }
        }
        
        
    }
  }