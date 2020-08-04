export const orderService = {
    create,
    findByUserId
};

const path = "http://localhost:9090/api";

function create(customer, articles) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            articles: articles,
            customer: customer
        })
    };
    return fetch(`${path}/orders`, requestOptions)
        .then(handleResponseCreate)
        .then(order => {
            return order;
        } )
}


function findByUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${path}/orders/user/${id}`, requestOptions)
        .then(handleResponseCreate)
        .then(order => {
            return order;
        })
}



function handleResponseCreate(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let error = "Erreur inconnue";
        if (!response.ok) {
            if (response.status === 401) {
                error = "Erreur 401";
            } else if (response.status === 400){
                error = "Vérifier que la quantité ne dépasse pas les stocks disponibles";
            }
            return Promise.reject(error);
        }
        return data;
    });
}