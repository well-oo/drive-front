export const userService = {
    login,
    logout,
    register,
    update
};

const path = "http://localhost:9090/api";

function login(login, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    };

    return fetch(`${path}/customers/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout() {
    localStorage.removeItem('user');
}

function register(email, firstName, lastName, password,login) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, password, login })
    };
    return fetch(`${path}/customers`, requestOptions)
        .then(response => console.log(response))
        .then(() => {
        })
}

function update(id, user) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${path}/customers/${id}`, requestOptions)
        .then(handleUpdate)
        .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            });
}


function handleUpdate(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let error = "Erreur inconnue";
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            } else if (response.status === 404 || response.status === 400) {
                error = "Modification impossible";
            }
            return Promise.reject(error);
        }

        return data;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let error = "Erreur inconnue";
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }else if (response.status === 404) {
                error = "Email ou mot de passe inconnu";
            }
            return Promise.reject(error);
        }

        return data;
    });
}