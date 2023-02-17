import { openPopup, closePopup } from "./index.js";

const imagePopup = document.querySelector(".popup_content_image");
const photoWindow = imagePopup.querySelector(".popup__image");
const photoCaption = imagePopup.querySelector(".popup__image-caption");
const closeImagePopupButton = document.querySelector("#figureClosed");

class Card {
  constructor(templateSelector, name, link) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
  }

  // Задача метода вернуть разметку карточки через return
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //   Открытие фото карточки
  _handleOpenPopup() {
    openPopup(imagePopup);
    photoWindow.src = this._link;
    photoWindow.alt = this._name;
    photoCaption.textContent = this._name;

    closeImagePopupButton.addEventListener("click", () => {
      closePopup(imagePopup);
    });
  }

  //   Выносим отдельно слушатели для удаления, лайка и открытия фото
  _setEventListeners() {
    this._element
      .querySelector(".element__button-delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._handlelikeButton(evt);
      });
    this._element
      .querySelector(".element__picture")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
  }

  // Удалить карточку
  _deleteCard() {
    this._element.remove();
  }

  // Поставить лайк карточке
  _handlelikeButton(evt) {
    evt.target.classList.toggle("element__like_clicked");
  }

  // Подготовим карточку к публикации. Метод добавляет данные в разметку и управлет поведением карточек.
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__picture").src = this._link;
    this._element.querySelector(".element__picture").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
}

export { Card };
