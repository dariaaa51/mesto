import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__text");
    this._submitButton = this._form.querySelector(".popup__submit-btn");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    // this._formValues = {};
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  }

  //  Метод добавления кнопке текста в момент сохранения
  putSavingProcessText() {
    this._submitButton.textContent = "Сохранение...";
  }

  // Метод добавления стандартного текста кнопке
  returnSavingProcessText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export { PopupWithForm };
