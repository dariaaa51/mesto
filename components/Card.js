// import { openPopup, closePopup } from "./Popup.js";

// const imagePopup = document.querySelector(".popup_content_image");
// const photoWindow = imagePopup.querySelector(".popup__image");
// const photoCaption = imagePopup.querySelector(".popup__image-caption");
// const closeImagePopupButton = document.querySelector("#figureClosed");


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
    this._cardImage = this._element.querySelector('.element__picture');
    this._handlelikeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__button-delete');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  //   Открытие фото карточки
  // _handleOpenPopup() {
  //   openPopup(imagePopup);
  //   photoWindow.src = this._link;
  //   photoWindow.alt = this._name;
  //   photoCaption.textContent = this._name;
  // }

  //   Выносим отдельно слушатели для удаления, лайка и открытия фото
  // _setEventListeners() {
  //   this._element
  //     .querySelector(".element__button-delete")
  //     .addEventListener("click", () => {
  //       this._deleteCard();
  //     });
  //   this._element
  //     .querySelector(".element__like")
  //     .addEventListener("click", (evt) => {
  //       this._handlelikeButton(evt);
  //     });
  //   this._element
  //     .querySelector(".element__picture")
  //     .addEventListener("click", () => {
  //       this._handleOpenPopup();
  //     });
  // }

  // // Удалить карточку
  // _deleteCard() {
  //   this._element.remove();
  // }

  // // Поставить лайк карточке
  // _handlelikeButton(evt) {
  //   evt.target.classList.toggle("element__like_clicked");
  // }

  // // Подготовим карточку к публикации. Метод добавляет данные в разметку и управлет поведением карточек.
  // createCard() {
  //   this._element = this._getTemplate();
  //   this._setEventListeners();

  //   const picElement = this._element.querySelector(".element__picture");
  //   const picText = this._element.querySelector(".element__title");

  //   picElement.src = this._link;
  //   picElement.alt = this._name;
  //   picText.textContent = this._name;

  //   return this._element;
  // }
}

export { Card };
