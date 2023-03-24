import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__image-caption");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}

export { PopupWithImage };
