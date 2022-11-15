/*
AFFICHER ID DE LA COMMANDE SUR LA PAGE CONFIRMATION
*/

let url = new URL(window.location.href);
const orderId = url.searchParams.get("id");
document.getElementById("orderId").textContent = `${orderId}`;