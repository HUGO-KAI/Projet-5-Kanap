/*
AFFICHER LES PRODUITS DE LA PAGE D'ACCUEIL ET SES INTERACTIONS
*/
/*étape 2 récupérer le lien de API */
const urlProducts = `http://localhost:3000/api/products`;

/* étape 3 requêter l’API pour demander l’ensemble
des produits,  récupérer la réponse émise, et parcourir celle-ci pour
insérer chaque élément (chaque produit) dans la page d’accueil
(dans le DOM).*/
async function fetchProducts(){
  const products = await fetch (urlProducts)
  if (products.ok === true){
    return products.json()
    }
  else throw new Error ('impossible de contacter le server')
}

/*Accédez aux éléments du DOM*/
const container = document.getElementById('items');


/*Appeler la fonction d'affichage des produits dans HTML*/
function init(){
  fetchProducts().then (jsonProducts => {
    displayProducts(jsonProducts);
  })
}

init();

/*Afficher des produits dans HTML*/ 
function displayProducts(jsonProducts) {
  for (let jsonProduct of jsonProducts) {

      //Créer un objet product    
      let product = new Product(jsonProduct);
      //Insérer un produit dans HTML
      container.innerHTML += `<a href="./product.html?id=${product._id}">          
                                  <article>
                                      <img src="${product.imageUrl}"" alt="${product.altTxt}">
                                      <h3 class="productName">${product.name}</h3>
                                      <p class="productDescription">${product.description}</p>
                                  </article>
                              </a>`;
  }
}





  
