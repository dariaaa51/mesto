class Card {
  constructor(
    data,
    cardSelector,
    currentUserId,
    handleCardClick,
    handleTrashClick,
    addCardLike,
    deleteCardLike
  ) {
    this._name = data.name;
    this._link = data.link;

    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;

    this._likeCount = data.likes.length;
    this._likes = data.likes;
    this._id = data._id;
    this._isOwner = data.owner._id === currentUserId;
  }

  // Задача метода вернуть разметку карточки через return
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  
  // Метод удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._id;
  }

  _handleLikeClick() {
    if (this._isLiked()) {
      this._deleteCardLike(this);
    } else {
      this._addCardLike(this);
    }
  }

  _isLiked() {
    return this._likes.some((like) => {
      return like._id === this._currentUserId;
    });
  }

  _renderCardLike() {
    if (this._isLiked()) {
      this._handlelikeButton.classList.add("element__like_clicked");
    } else {
      this._handlelikeButton.classList.remove("element__like_clicked");
    }
    this._like.textContent = this._likeCount;
  }

  updateLike(likes) {
    this._likeCount = likes.length;
    this._likes = likes;
    this._renderCardLike();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
    this._handlelikeButton.addEventListener("click", () =>
      this._handleLikeClick()
    );
    this._trashButton.addEventListener("click", () =>
      this._handleTrashClick(this)
    );
  }

  // Создание карточек
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__picture");
    this._handlelikeButton = this._element.querySelector(".element__like");
    this._trashButton = this._element.querySelector(".element__button-delete");
    this._like = this._element.querySelector(".element__count");
    this._setEventListeners();

    // Передача данных в карточку
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    this._renderCardLike();
    if (!this._isOwner) {
      this._trashButton.setAttribute("hidden", true);
    }

    return this._element;
  }
}

export { Card };
