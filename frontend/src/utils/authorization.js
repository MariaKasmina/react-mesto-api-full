export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw response.ok;
    }
}

// регистрация
export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    }).then(checkResponse);
};

// авторизация
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    }).then(checkResponse);
};

// получение данных по токену
export const checkTokenValidity = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }).then(checkResponse);
}
