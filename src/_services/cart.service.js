export const cartService = {
    create,
    addArticlesToCart,
    findById,
    removeArticleFromCartByArticleCartId,
    updateCart
};

const path = "http://localhost:9090/api";

function create() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(`${path}/carts/`, requestOptions)
        .then(handleResponseCreate)
        .then(cart => {
            return cart;
        })
}

function addArticlesToCart(cart,article,quantity) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({cart:cart,article:article,quantite:quantity})
    };
    return fetch(`${path}/articlesCart/`, requestOptions)
        .then(handleResponseCreate)
        .then(() => {
            return this.findById(cart.id);
        })
}

function updateCart(cart,article,quantity) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({cart:cart,article:article,quantite:quantity})
    };
    return fetch(`${path}/articlesCart/update`, requestOptions)
        .then(handleResponseCreate)
        .then(() => {
            return this.findById(cart.id);
        })
}

function findById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${path}/carts/${id}`, requestOptions)
        .then(handleResponseCreate)
        .then(cart => {
            return cart;
        })
}

function removeArticleFromCartByArticleCartId(cart,id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${path}/articlesCart/${id}`, requestOptions)
        .then(handleResponseCreate)
        .then(() => {
            return this.findById(cart.id);
        })
}



function handleResponseCreate(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let error = "Erreur inconnue";
        if (!response.ok) {
            if (response.status === 401) {
                error = "Erreur 401";
            }
            return Promise.reject(error);
        }
        return data;
    });
}