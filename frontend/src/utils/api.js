class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.headers.authorization;
    }

    // получение информации пользователя в формате name: res.name, about: res.about, avatar: res.avatar, id: res._id
    getUserInfo() {
        return fetch(`${this._baseUrl}/cohort-34/users/me`, {
            headers: {
                authorization: `${this._token}`,
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // обновление информации пользователя
    updateUserInfo(newName, newNote) {
        return fetch(`${this._baseUrl}/cohort-34/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newNote
            })
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // получение начальных карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cohort-34/cards`, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // добавление новой карточки
    addCard(imageName, imageLink) {
        return fetch(`${this._baseUrl}/cohort-34/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: imageName,
                link: imageLink
            })
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // получение данных карточек
    getCardsInfo() {
        return fetch(`${this._baseUrl}/cohort-34/cards`, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // удаление карточки по id
    removeCard(id) {
        return fetch(`${this._baseUrl}/cohort-34/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // добавление карточке лайка по id
    addLike(id) {
        return fetch(`${this._baseUrl}/cohort-34/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // удаление лайка по id
    removeLike(id) {
        return fetch(`${this._baseUrl}/cohort-34/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {
            return res;
        });
    }

    // изменение аватара
    changeAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/cohort-34/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            })
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    _getResponseData(res) {
        return (!res.ok) ? Promise.reject(`Ошибка: ${res.status}`) : res.json();
    }
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1',
    headers: {
        authorization: '6a51e53e-46b7-4c82-b7df-ab43a73f6f4d'
    }
});

export default api;