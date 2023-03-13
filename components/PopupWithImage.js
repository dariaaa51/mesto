import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__image-caption');
    }

    open(data) {
        // console.log(data)
        this._popupImage.src = data.link;
        this._popupCaption.textContent = data.name;
        this._popupImage.alt = data.name;
        super.open();
    }
}

export { PopupWithImage }