import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__text");
    this._submitButton = this._form.querySelector(".popup__submit-btn");
  }

  _getInputValues() {
    // this._formValues = {};
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const initialText = (this._submitButton.textContent = "Сохранение...");
      this._callbackSubmitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = initialText;
        });
    });
  }
}

export { PopupWithForm };
