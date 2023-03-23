class Api {
  constructor(link, token) {
    this._link = link;
    this._token = token;
  }

  // Авторизация
  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: this._token,
    };
  }

  // Метод обработки ответа сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  // Метод получения данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getResponseData);
  }

  // Метод инициализации карточек с сервера
  getCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getResponseData);
  }

  // Метод отправки данных пользователя на сервер
  sendUserInfo({ name, about }) {
    return fetch(`${this._link}/users/me`, {
      headers: this._getHeaders(),
      method: "PATCH",
      body: JSON.stringify({
        name: `${name}`,
        link: `${about}`,
      }),
    }).then(this._getResponseData);
  }

  // Метод добавления новой карточки на сервер
  addNewCard({ name, link }) {
    return fetch(`${this._link}/cards`, {
      headers: this._getHeaders(),
      method: "POST",
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    }).then(this._getResponseData);
  }

  // Метод удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: this._getHeaders(),
      method: "DELETE",
    }).then(this._getResponseData);
  }

  // Метод отправки лайка на сервер
  putLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._getHeaders(),
      method: "PUT",
    }).then(this._getResponseData);
  }

  // Метод удаления лайка с сервера
  deleteLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._getHeaders(),
      method: "DELETE",
    }).then(this._getResponseData);
  }

  // Метод отправки данных о новом аватаре на сервер
  setAvatar(data) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: this._getHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }
}

export { Api };
