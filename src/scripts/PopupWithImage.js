import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);

        this.open = this.open.bind(this);
    }

    open (data) {
        const image = this._popup.querySelector('.photo-open__image');

        image.setAttribute('src', data.link);

        if (data.alt) {
            image.setAttribute('alt', data.alt);
        } else {
            image.setAttribute('alt', data.name);
        }
        const caption = this._popup.querySelector('.photo-open__name');
        caption.textContent = image.alt;

        super.open();
    }
}