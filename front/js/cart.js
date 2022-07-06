const cartProducts = JSON.parse(localStorage.getItem("product"));

function getOneProduct(idProduct) {
    return fetch("http://localhost:3000/api/products/" + idProduct)
        .then(function(response) {
            return response.json();
        })
}

let totalPrice = 0;


function listenerDelete(deleteButton) {
    deleteButton.addEventListener("click", e => {
        e.preventDefault();
        const item = e.target.closest(".cart__item") //comme queryselector mais trouve le plus proche 
        let index = cartProducts.findIndex(p => p.id === item.dataset.id && p.color === item.dataset.color); //chercher dans panier si un produit = id du produit que je cherche 
        if (index !== -1) {
            cartProducts.splice(index, 1);
            localStorage.setItem("product", JSON.stringify(cartProducts));
            window.location.reload();
        }
    });
}

function initListenerDelete() {
    const deleteButtons = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < deleteButtons.length; i++) {
        listenerDelete(deleteButtons[i]);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initListenerQuantity() {
    const quantityButton = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < quantityButton.length; i++) {
        listenerQuantity(quantityButton[i]);
    }
}

function listenerQuantity(quantityButton) {
    quantityButton.addEventListener("change", e => {
        e.preventDefault();
        if (quantityButton.valueAsNumber < 0 || quantityButton.valueAsNumber > 100) {
            alert("quantité invalide");
            return;
        }
        const item = e.target.closest(".cart__item") //comme queryselector mais trouve le plus proche 
        let index = cartProducts.findIndex(p => p.id === item.dataset.id && p.color === item.dataset.color); //chercher dans panier si un produit = id du produit que je cherche 
        if (index !== -1) {
            cartProducts[index].quantity = quantityButton.valueAsNumber;
            localStorage.setItem("product", JSON.stringify(cartProducts));
            console.log(quantityButton.valueAsNumber);
            window.location.reload();
        }
    });
}

function displayTotal() {
    let totalQuantity = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        totalQuantity += cartProducts[i].quantity;
    }
    document.getElementById('totalPrice').textContent = totalPrice;
    document.getElementById('totalQuantity').textContent = totalQuantity;
}

async function dropCartProducts() {
    console.log(cartProducts);
    let productList = document.querySelector("#cart__items");
    for (let i = 0; i < cartProducts.length; i++) {
        console.log(cartProducts[i]);
        const product = await getOneProduct(cartProducts[i].id);
        console.log(product);
        document.getElementById("cart__items").innerHTML += ` <article class="cart__item" data-id="${cartProducts[i].id}" data-color="${cartProducts[i].color}">
         <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${cartProducts[i].color}</p>
            <p>${product.price}€</p>
          </div>
          <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartProducts[i].quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
            </div>
            </div>
            </div>
            </article>`;
        totalPrice += product.price * cartProducts[i].quantity;
        console.log(totalPrice);
    }
    initListenerDelete();
    initListenerQuantity();
    displayTotal();
}
dropCartProducts();

//FORMULAIRE


//créations des expressions régulières
let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let locationRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let form = document.querySelector(".cart__order__form");

function verifyFirstName() {
    let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
    form.firstName.addEventListener('change', function(e) {
        const value = e.target.value;
        if (nameRegex.test(value)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
            return false;
        }
    })
}
verifyFirstName();

function verifyLastName() {
    let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
    form.lastName.addEventListener('change', function(e) {
        const value = e.target.value;
        if (nameRegex.test(value)) {
            lastNameErrorMsg.innerHTML = '';
            return true;
        } else {
            lastNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
            return false;
        }
    })
}
verifyLastName();

function verifyLocation() {
    let adressErrorMsg = document.querySelector('#addressErrorMsg');
    let cityErrorMsg = document.querySelector('#cityErrorMsg');
    form.address.addEventListener('change', function(e) {
        const value = e.target.value;
        if (locationRegex.test(value)) {
            adressErrorMsg.innerHTML = '';
            return true;
        } else {
            adressErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse postale.';
            return false;
        }
    });
    form.city.addEventListener('change', function(e) {
        const value = e.target.value;
        if (locationRegex.test(value)) {
            cityErrorMsg.innerHTML = '';
            return true;
        } else {
            cityErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
            return false;
        }
    });
}
verifyLocation();

function verifyEmail() {
    let emailErrorMsg = document.querySelector('#emailErrorMsg');
    form.email.addEventListener('change', function(e) {
        const value = e.target.value;
        if (emailRegex.test(value)) {
            emailErrorMsg.innerHTML = '';
            return true;
        } else {
            emailErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse mail.';
            return false;
        }
    });
}
verifyEmail();

function validOrder() {
    const orderButton = document.getElementById('order');
    orderButton.addEventListener("click", e => {
        e.preventDefault();
        if (verifyFirstName() === false) {
            alert('Un problème avec le prénom');
            return; //si probleme return pour stoper la fonction 
        }
        if (verifyLastName() === false) {
            alert('Un problème avec le nom');
            return; //si probleme return pour stoper la fonction 
        }
        if (verifyLocation() === false) {
            alert('Un problème avec la ville');
            return; //si probleme return pour stoper la fonction 
        }
        if (verifyEmail() === false) {
            alert('Un problème avec le mail');
            return; //si probleme return pour stoper la fonction 
        }
        if (cartProducts.length === 0) {
            alert('Le panier est vide');
            return; //si probleme return pour stoper la fonction 
        }
        // je récupère les données du formulaire dans un objet
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };
        const ids = cartProducts.map(p => p.id); //transfert uniquements les ID de cartProducts dans ids grace a map
        const orderInfos = { contact: contact, products: ids };
        // je mets les valeurs du formulaire et les produits sélectionnés
        // dans un objet...

        const sendInfos = {
            method: 'POST',
            body: JSON.stringify(orderInfos),
            headers: {
                'Content-Type': 'application/json',
                // j'envoie le formulaire + localStorage (sendInfos) 
                // ... que j'envoie au serveur
            }
        };

        fetch("http://localhost:3000/api/products/order", sendInfos)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('orderId', data.orderId);
                document.location.href = 'confirmation.html?id=' + data.orderId;
                console.log(data);
            });
    })
}


validOrder();