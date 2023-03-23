import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
  }

  open(deletingCard) {
    super.open();
    this._deletingCard = deletingCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._deletingCard);
    });
  }
}