/*Créer une méthode pour ranger les données JSON dans class Product*/ 
class Product{
    constructor(jsonProduct){
        this.colors = jsonProduct.colors
        this._id = jsonProduct._id
        this.altTxt = jsonProduct.altTxt
        this.name = jsonProduct.name
        this.imageUrl = jsonProduct.imageUrl
        this.description = jsonProduct.description
        this.price = jsonProduct.price
    }
  }