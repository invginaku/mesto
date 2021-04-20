import './index.css';

import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputErrorSelector: '.popup__error',
    activeErrorClass: 'popup__error_active',
    invalidInputClass: 'popup__input_type_error'
}

const root = document.querySelector('.body');
const profileEditButton = root.querySelector('.button_type_edit');
const cardCreateButton = root.querySelector('.button_type_add');
const updateAvatarButton = document.querySelector('.profile__avatar-button');
const cardGridSelector = '.elements';

const popupProfileSelector = '.profile-popup';
const popupProfileElement = root.querySelector(popupProfileSelector);
const popupProfileForm = popupProfileElement.querySelector('.popup__form');
const profileNameInput = popupProfileElement.querySelector('.popup__input_type_name');
const profileDescriptionInput = popupProfileElement.querySelector('.popup__input_type_status');

const popupAvatarSelector = '.popup-avatar';
const popupAvatarElement = document.querySelector(popupAvatarSelector);
const popupAvatarForm = popupAvatarElement.querySelector('.popup__form');

const popupCardSelector = '.popup_add-place';
const popupCardElement = root.querySelector(popupCardSelector);
const popupCardForm = popupCardElement.querySelector('.popup__form');

const popupFullPicSelector = '.photo-open';
const popupConfirmDeleteSelector = '.popup-delete';


const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__status',
    userAvatarSelector: '.profile__avatar'
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
    authorization: '9827d88a-a5f9-4b28-b58e-c5621fc7d150'
});

const cardsSection = new Section(cardGridSelector);

const popupProfile = new PopupWithForm(
    popupProfileSelector,
    (evt, values) => {
        evt.preventDefault();

        popupProfile.renderLoading(true);

        api.patchUserInfo(values)
            .then(() => {
                userInfo.setUserInfo(values);
                popupProfile.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                popupProfile.showResponseError(err);
            })
            .finally(() => {
            popupProfile.renderLoading(false);
        });
    }
);
const profileValidator = new FormValidator(validationConfig, popupProfileForm);

const popupAvatar = new PopupWithForm(
    popupAvatarSelector,
    (evt, values) => {
        evt.preventDefault();

        popupAvatar.renderLoading(true);

        api.updateAvatar(values.avatar)
            .then(() => {
                userInfo.setAvatar(values.avatar);
                popupAvatar.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                popupAvatar.showResponseError(err);
            })
            .finally(() => {
                popupAvatar.renderLoading(false);
            });
    }
);
const avatarValidator = new FormValidator(validationConfig, popupAvatarForm);

const popupCard = new PopupWithForm(
    popupCardSelector,
    (evt, values) => {
        evt.preventDefault();

        popupCard.renderLoading(true);

        const data = {};
        data.name = values.place;
        data.link = values.link;
        data.isOwn = true;

        api.postCard(data)
            .then(res => {
                const newCard = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike);
                newCard.id = res._id;
                newCard.data.author = res.owner.name;

                const cardElement = newCard.generateCard();
                cardsSection.addItem(cardElement);
                popupCard.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                popupCard.showResponseError(err);
            })
            .finally(() => {
                popupCard.renderLoading(false);
            });
    }
);
const cardValidator = new FormValidator(validationConfig, popupCardForm);

const confirmDeletePopup = new PopupConfirm(
    popupConfirmDeleteSelector,
    (cardId) => {
        confirmDeletePopup.renderLoading(true);

        api.deleteCard(cardId)
            .then(() => {
                confirmDeletePopup.card.removeCard();
                confirmDeletePopup.close();
            })
            .catch(err => {
                console.log(`Что-то пошло не так: ${err}`);
                confirmDeletePopup.showResponseError(err);
            })
            .finally(() => {
                confirmDeletePopup.renderLoading(false);
            });
    }
);

const popupFullPic = new PopupWithImage(popupFullPicSelector);
popupFullPic.setEventListeners();
popupCard.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();
confirmDeletePopup.setEventListeners();

updateAvatarButton.addEventListener('click', function () {
    avatarValidator.checkForm();
    popupAvatar.open();
});


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
avatarValidator.enableValidation();

// * Выполняем промисы

Promise.all([api.fetchUserInfo(), api.fetchInitialCards()])
    .then(([userData, initialCards]) => {

        // Обрабатываем информацию о пользователе

        const externalUserInfo = {};
        externalUserInfo.name = userData.name;
        externalUserInfo.description = userData.about;
        externalUserInfo.avatar = userData.avatar;
        const userID = userData._id;
        userInfo.setUserInfo(externalUserInfo);


        initialCards.forEach(cardObject => {
            const data = {
                cardId: cardObject._id,
                isOwn: (cardObject.owner._id === userID) ? true : false,
                likes: cardObject.likes.length,
                isLiked: false,
                name: cardObject.name,
                link: cardObject.link
            };

            if (cardObject.likes.some(like => like._id === userID)) {
                data.isLiked = true;
            }

            const card = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike).generateCard();
            cardsSection.appendItem(card);
        });
    })
    .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
    });