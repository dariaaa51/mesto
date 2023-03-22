// class Card {
//   constructor({ data, handleCardClick }, cardSelector) {
//     this._name = data.name;
//     this._link = data.link;
//     this._handleCardClick = handleCardClick;
//     this._cardSelector = cardSelector;
//   }

//   // Задача метода вернуть разметку карточки через return
//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".element")
//       .cloneNode(true);

//     return cardElement;
//   }

//   _handleLikeClick = () => {
//     this._handlelikeButton.classList.toggle("element__like_clicked");
//   };

//   _handleTrashClick = () => {
//     this._element.remove();
//     this._element = null;
//   };

//   _setEventListeners() {
//     this._cardImage.addEventListener("click", () => {
//       this._handleCardClick({ name: this._name, link: this._link });
//     });
//     this._handlelikeButton.addEventListener("click", this._handleLikeClick);
//     this._trashButton.addEventListener("click", this._handleTrashClick);
//   }

//   generateCard() {
//     this._element = this._getTemplate();
//     this._cardImage = this._element.querySelector(".element__picture");
//     this._handlelikeButton = this._element.querySelector(".element__like");
//     this._trashButton = this._element.querySelector(".element__button-delete");
//     this._setEventListeners();
//     this._cardImage.src = this._link;
//     this._cardImage.alt = this._name;
//     this._element.querySelector(".element__title").textContent = this._name;

//     return this._element;
//   }
// }

class Card {
  constructor(cardObject, cardSelector, userId, authorData, handleActions) {
    // Объект карточки, данные карточки
    this._card = cardObject;
    this._cardName = this._card.name;
    this._cardImage = this._card.link;

    // Темплейт элемент
    this._cardSelector = cardSelector;

    // Данные пользователя
    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;

    // Объект handle
    this._zoomCard = handleActions.handleZoomCard;
    this._deleteCard = handleActions.handleDeleteCard;
    this._makeLike = handleActions.handleLikeCard;
    this._deleteLike = handleActions.handleDeleteLikeCard;
  }

  // Задача метода вернуть разметку карточки через return
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Отображение количества лайков на странице
  renderCardLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = "";
    } else {
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._handlelikeButton.classList.add("element__like_clicked");
    } else {
      this._handlelikeButton.classList.remove("element__like_clicked");
    }
  }

  _likedCard() {
    return this._likeArea.find((userLike) => userLike._id === this._userId);
  }

  _interactLike() {
    if (this._likedCard()) {
      this._deleteLike(this._cardId);
    } else {
      this._makeLike(this._cardId);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._handlelikeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__picture");
    this._elementName = this._element.querySelector(".element__title");
    this._trashButton = this._element.querySelector(".element__button-delete");
    this.likeSelector = this._element.querySelector(".element__like-counter");
    this._elementName.textContent = this._cardName;
    this._cardImage.src = this._cardImage;
    this._cardImage.src = this._cardName;
    this.renderCardLike(this._card);
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners = () => {
    this._handlelikeButtonaddEventListener("click", () => this._interactLike());
    this._cardImage.addEventListener("click", () =>
      this._zoomCard(this._cardName, this._cardImage)
    );
    if (this._userId === this._authorId) {
      this._trashButton.addEventListener("click", () =>
        this._deleteCard(this, this._cardId)
      );
    } else {
      this._trashButton.remove();
    }
  };
}
export { Card };
