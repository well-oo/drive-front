export const produitService = {
    getAllProduits,
    getAllProduitsByCategoriesId
};

const path = "http://localhost:9090/api";

function getAllProduits() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${path}/articles/stocks`, requestOptions)
        .then(handleResponseGetAllProduits)
        .then(produits => {
            return produits;
        })
}


function getAllProduitsByCategoriesId(ids) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ids)
    };
    return fetch(`${path}/articles/categories`, requestOptions)
        .then(handleResponseGetAllProduits)
        .then(produits => {
            return produits;
        })
}



function handleResponseGetAllProduits(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let error = "Erreur inconnue";
        if (!response.ok) {
            if (response.status === 401) {
                error = "Erreur 401";
            }else if (response.status === 404) {
                error = "Aucun produit";
            }
            return Promise.reject(error);
        }
        return data;
    });
}