class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  // Задача метода вернуть разметку карточки через return
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick = () => {
    this._handlelikeButton.classList.toggle("element__like_clicked");
  };

  _handleTrashClick = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._handlelikeButton.addEventListener("click", this._handleLikeClick);
    this._trashButton.addEventListener("click", this._handleTrashClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__picture");
    this._handlelikeButton = this._element.querySelector(".element__like");
    this._trashButton = this._element.querySelector(".element__button-delete");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
}

export { Card }
