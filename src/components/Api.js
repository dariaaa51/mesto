class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
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
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод инициализации карточек с сервера
  getCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод отправки данных пользователя на сервер
  sendUserInfo(item) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: item.name,
        about: item.job,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод добавления новой карточки на сервер 
  addNewCard({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод отправки лайка на сервер
  likeCard(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод удаления лайка с сервера
  dislikeCard(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Метод отправки данных о новом аватаре на сервер
  setAvatar(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarLink.avatar }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export { Api };
