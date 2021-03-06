// pas de code en dehors des fonctions 
// le nom d'une fonction décrit ce qu'elle fais 
// le nom de mes fonctions et variables sont en camelcase exemple : myVar
// le nom de mes fonctions et variables se terminent par un "s" quand je récupères une liste ou un tableau d'éléments
// le code doit être impérativement indenté
// ----------------------------------------------
// étape : 1 --> récupérer les produits
// getAllProducts => fonction à utiliser "fetch"
// étape : 2  --> préparer l'affichage => renderProducts (products)
// boucle FOR qui va parcourir le tableau products et qui va pour chaque élément écrire du HTML exemple
//getallproducts récupére tout les produits sur le serveur avec fetch et retourne en JSON les produits 
function getAllProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(function(response) {
            return response.json();
        })
        .catch((error) => { //attraper une erreur
            let items = document.querySelector(".items");
            items.innerHTML =
                "Une erreur est survenue.<br> Si le problème persiste veuillez nous en informer.";
        });
}
//variable qui fini en s ou liste = tableau
function renderProducts(productList) {

    for (let i = 0; i < productList.length; i++) {
        console.log(productList[i]);
        document.getElementById("items").innerHTML += `<a href="./product.html?id=${productList[i]._id}">
<article>
  <img src="${productList[i].imageUrl}" alt="${productList[i].altTxt}">
  <h3 class="productName">${productList[i].name}</h3>
  <p class="productDescription">${productList[i].description}</p>
</article>
</a>`;
    }


}
//const variable qui change jamais 
async function displayProducts() {
    const products = await getAllProducts();
    console.log(products);
    renderProducts(products);
}

displayProducts();