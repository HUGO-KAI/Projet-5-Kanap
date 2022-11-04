/*
AFFICHAGE DU PRODUIT SELECTIONNE

var url = new URL(str);
var name = url.searchParams.get("name");
console.log(name);
*/
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
console.log(id);


