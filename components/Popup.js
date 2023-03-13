export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", (event) => this.close(event));
    this._popup.addEventListener("mousedown", (event) =>
      this._handleOverlayClose(event)
    );
  }
}

// export { Popup }
// // Функция закрытия по оверлею
// const closePopupWithClick = function (evt) {
//   const openedPopup = document.querySelector(".popup_opened");
//   if (evt.target === openedPopup) {
//     closePopup(openedPopup);
//   }
// };

// // Функция закрытия по кнопке Escape
// const closePopupWithEsc = function (evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// };

// // Слушатель кнопки закрытия попапа карточки фото
// closeImagePopupButton.addEventListener("click", () => {
//   closePopup(imagePopup);
// });

// // Функция открытия попапа
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("mousedown", closePopupWithClick);
//   document.addEventListener("keydown", closePopupWithEsc);
// }

// // Функция закрытия попапа
// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("mousedown", closePopupWithClick);
//   document.removeEventListener("keydown", closePopupWithEsc);
// }

// export { openPopup, closePopup };
