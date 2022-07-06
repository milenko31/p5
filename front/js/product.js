const idProduct = new URL(window.location.href).searchParams.get("id");

function getOneProduct() {
    return fetch("http://localhost:3000/api/products/" + idProduct)
        .then(function(response) {
            return response.json();
        })
        .catch((error) => {
            let item = document.querySelector(".item");
            item.innerHTML =
                "Une erreur est survenue.<br> Si le problème persiste veuillez nous en informer.";
        });
}
console.log(idProduct);


function renderOneProduct(product) {
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    const colorsArray = [];
    for (let i = 0; i < product.colors.length; i++) {
        colorsArray.push(`<option value="${product.colors[i]}">${product.colors[i]}</option>`);
    }
    document.getElementById("colors").insertAdjacentHTML("beforeend", colorsArray);
}

async function displayProduct() {
    const product = await getOneProduct();
    console.log(product);
    renderOneProduct(product);
}

displayProduct();
////////////////////////////////////////////////////////////////PANIER
function saveProduct(product) {
    localStorage.setItem("product", JSON.stringify(product)); //prend un objet et le transforme en string 
}

function getProducts() {
    let products = localStorage.getItem("product"); //prend un string et le transforme en objet
    if (products == null) {
        return [];
    } else {
        return JSON.parse(products);
    }
}


function addProduct() {
    document.getElementById("addToCart").addEventListener("click", e => {
        e.preventDefault();
        const product = {};
        product.quantity = document.getElementById("quantity").valueAsNumber;
        product.color = document.getElementById("colors").value;
        product.id = idProduct;
        if (product.quantity > 0 && product.color.length > 0 && product.quantity < 101) {
            let cartProducts = getProducts(); //recup le panier
            let index = cartProducts.findIndex(p => p.id === product.id && p.color === product.color); //chercher dans panier si un produit = id du produit que je cherche 
            if (index === -1) { // findIndex retourne -1 si il ne trouve aucun élément du tableau
                cartProducts.push(product); //ajoute le produit
            } else {
                cartProducts[index].quantity = cartProducts[index].quantity + product.quantity; // 
            }
            saveProduct(cartProducts); //on save le nouveau panier
            document.location.href = 'cart.html';
        } else {
            alert("Veuillez selectionner une quantité et une couleur");
        }
    });
}
addProduct();