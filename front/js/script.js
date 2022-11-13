/*
AFFICHER LES PRODUITS DE LA PAGE D'ACCUEIL ET SES INTERACTIONS
*/

//Récupérer le lien de API 
const urlProducts = `http://localhost:3000/api/products`;

/* Récupérer les données des produits*/
init(urlProducts);
function init(url) {
  //
  fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    displayProducts(value);
  })
  .catch(function(err) {
    console.log(err);
  });
}
//Afficher les produits dans HTML
const container = document.getElementById("items");
function displayProducts(products) {
  for (let i = 0; i < products.length; i++){
    container.innerHTML += `<a href="./product.html?id=${products[i]._id}">          
                                  <article>
                                      <img src="${products[i].imageUrl}"" alt="${products[i].altTxt}">
                                      <h3 class="productName">${products[i].name}</h3>
                                      <p class="productDescription">${products[i].description}</p>
                                  </article>
                              </a>`;
    }
  }



  
