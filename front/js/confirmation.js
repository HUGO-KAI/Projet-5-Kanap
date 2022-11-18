/*
AFFICHER ID DE LA COMMANDE SUR LA PAGE CONFIRMATION
*/

async function showOrderId() {
  try {
    let url = new URL(window.location.href);
    const orderId = url.searchParams.get("id");
    document.getElementById("orderId").textContent = `${orderId}`;
  } catch (e) {
    console.log('Error', e);
    window.alert("Échec de la connexion");
  }
}

showOrderId();
