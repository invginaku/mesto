import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }

    open (evt) {
        const image = this._popup.querySelector('.photo-open__image');
        const targetImage = evt.target;

        image.setAttribute('src', targetImage.src);
        image.setAttribute('alt', targetImage.alt);

        const caption = this._popup.querySelector('.photo-open__name');

        caption.textContent = targetImage.alt;

        super.open();
    }
}