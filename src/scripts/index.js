import '../pages/index.css';

import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Card from './Card.js';
import Section from './Section.js';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputErrorSelector: '.popup__error',
    activeErrorClass: 'popup__error_active',
    invalidInputClass: 'popup__input_type_error'
}
// --- Добавил свои фото и alt для фото, что бы было интереснее работать :)

const elbrusImage = new URL('../images/element-images/elbrus.jpg', import.meta.url);
const sarsnskImage = new URL('../images/element-images/saransk.jpg', import.meta.url);
const moscowImage = new URL('../images/element-images/moscow.jpg', import.meta.url);
const piterImage = new URL('../images/element-images/piter.jpg', import.meta.url);
const penzaImage = new URL('../images/element-images/penza.jpg', import.meta.url);
const astrakhanImage = new URL('../images/element-images/astrakhan.jpg', import.meta.url);

const initialCards = [
    {
        name: 'Эльбрус',
        link: elbrusImage,
        alt: 'Приэльбрусье'
    },
    {
        name: 'Саранск',
        link: sarsnskImage,
        alt: 'Мордовия Арена'
    },
    {
        name: 'Москва',
        link: moscowImage,
        alt: 'Фудмолл ДЕПО'
    },
    {
        name: 'Санкт-Питербург',
        link: piterImage,
        alt: 'Казанский кафедральный собор'
    },
    {
        name: 'Пенза',
        link: penzaImage,
        alt: 'Закат на районе ГПЗ-24'
    },
    {
        name: 'Астрахань',
        link: astrakhanImage,
        alt: 'Река Волга'
    }
];

const root = document.querySelector('.body');
const profileEditButton = root.querySelector('.button_type_edit');
const cardCreateButton = root.querySelector('.button_type_add');
const cardGridSelector = '.elements';

const popupProfileSelector = '.profile-popup';
const popupProfileElement = root.querySelector(popupProfileSelector);
const popupProfileForm = popupProfileElement.querySelector('.popup__form');
const profileNameInput = popupProfileElement.querySelector('.popup__input_type_name');
const profileDescriptionInput = popupProfileElement.querySelector('.popup__input_type_status');

const popupCardSelector = '.popup_add-place';
const popupCardElement = root.querySelector(popupCardSelector);
const popupCardForm = popupCardElement.querySelector('.popup__form');

const popupFullPicSelector = '.photo-open';

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__status'
});

const cardsSection = new Section({
    items: initialCards,
    renderer: (data) => {
        const cardElement = new Card(data, '#template-card', popupFullPic.open).generateCard();
        cardsSection.appendItem(cardElement);
    }
}, cardGridSelector);

const popupProfile = new PopupWithForm(
    popupProfileSelector,
    (evt, values) => {
        evt.preventDefault();

        userInfo.setUserInfo(values);

        popupProfile.close();
    }
);
const profileValidator = new FormValidator(validationConfig, popupProfileForm);

const popupCard = new PopupWithForm(
    popupCardSelector,
    (evt, values) => {
        evt.preventDefault();

        const data = {};
        data.name = values.place;
        data.link = values.link;

        const cardElement = new Card(data, '#template-card', popupFullPic.open).generateCard();
        cardsSection.addItem(cardElement);

        popupCard.close();
    }
);
const cardValidator = new FormValidator(validationConfig, popupCardForm);

const popupFullPic = new PopupWithImage(popupFullPicSelector);

profileEditButton.addEventListener('click', function () {
    const currentUserInfo = userInfo.getUserInfo();
    profileNameInput.value = currentUserInfo.name;
    profileDescriptionInput.value = currentUserInfo.description;

    profileValidator.checkForm();
    popupProfile.open();
});

cardCreateButton.addEventListener('click', function () {
    popupCardForm.reset();
    cardValidator.checkForm();
    popupCard.open();
});

profileValidator.enableValidation();
cardValidator.enableValidation();
cardsSection.renderItems();