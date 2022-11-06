/*
AFFICHAGE DU PRODUIT SELECTIONNE
*/
//1.Récupérer Id du produit visité
let url = new URL(window.location.href);
const productId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;


/*Afficher le produit dans HTML*/ 
async function fetchProduct(){
    const product = await fetch (urlProduct)
    if (product.ok === true){
      return product.json()
      }
    else throw new Error ('impossible de contacter le server')
  }
  
  const itemImg = document.querySelector(".item__img");
  const productName = document.getElementById('title');
  const productPrice = document.getElementById('price');
  const productDescription = document.getElementById('description');
  const productOption = document.getElementById("colors");
  init();
  function init(){
    //Récupérer les donnée du produit
    fetchProduct().then (jsonProduct => {
      //Afficher le produit dans HTML
      displayProduct(jsonProduct);
      //Enregister le produit dans local storage après clique
      const addToCart = document.getElementById('addToCart');
      const itemColors = document.getElementById('colors');
      const itemQuantity = document.getElementById('quantity');
      addToCart.addEventListener('click', function() {          
        //Contrôler si la couleur est bien choisie
        let option = itemColors.options.selectedIndex
        let colorSelected=itemColors.value
        if(option == 0){
          window.alert("Veuillez choisir la couleur");
          return
        }
    
        //Contrôler si la quantité est entre 1 et 100 en unité entier
        let str = itemQuantity.value;
        let orderQuantity = +str;
        if (orderQuantity < 1 || orderQuantity >100 || orderQuantity%1 !== 0) {
          window.alert("Veuillez choisir la quantité (entre 1 et 100 unité)")
          return
        }
        let addedProducts = new Object(jsonProduct)
        let products = JSON.parse(localStorage.getItem("addedProducts"))
        if (products === null) {
          products = [];
          addedProducts["quantity"] = orderQuantity;
          addedProducts["colors"] = colorSelected;
          products.push(addedProducts);
          localStorage.setItem("addedProducts", JSON.stringify(products));
        }
        else{
          const searchItem = products.find(element => element.id == addedProducts.id && element.couleur == addedProducts.couleur);
          console.log(searchItem);
          if (searchItem == undefined){
            addedProducts["quantity"] = orderQuantity;
            addedProducts["colors"] = colorSelected;
            products.push(addedProducts);
            localStorage.setItem("addedProducts", JSON.stringify(products));
          }
          else {
            console.log(orderQuantity);
            searchItem.quantity += orderQuantity;
            console.log(searchItem);
            localStorage.setItem("addedProducts", JSON.stringify(searchItem));
          }
        }  
      }
)
    })
  }
  
  
  
  function displayProduct(jsonProduct) {
    let product = new Product(jsonProduct)
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
    
