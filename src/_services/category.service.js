export const categoryService = {
    getAllCategories
};

const path = "http://localhost:9090/api";

function getAllCategories() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${path}/categories`, requestOptions)
        .then(handleResponseGetAllCategories)
        .then(categories => {
            return categories;
        })
}



function handleResponseGetAllCategories(response) {
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