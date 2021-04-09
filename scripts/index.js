import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.button_type_save',
	inputErrorSelector: '.popup__error',
	activeErrorClass: 'popup__error_active',
	invalidInputClass: 'popup__input_type_error'
}
// --- Добавил свои фото и alt для фото, что бы было интереснее работать :)
const initialCards = [
	{
		name: 'Эльбрус',
		link: './images/element-images/elbrus.jpg',
		alt: 'Приэльбрусье'
	},
	{
		name: 'Саранск',
		link: '/images/element-images/saransk.jpg',
		alt: 'Мордовия Арена'
	},
	{
		name: 'Москва',
		link: '/images/element-images/moscow.jpg',
		alt: 'Фудмолл ДЕПО'
	},
	{
		name: 'Санкт-Питербург',
		link: '/images/element-images/piter.jpg',
		alt: 'Казанский кафедральный собор'
	},
	{
		name: 'Пенза',
		link: '/images/element-images/penza.jpg',
		alt: 'Закат на районе ГПЗ-24'
	},
	{
		name: 'Астрахань',
		link: '/images/element-images/astrakhan.jpg',
		alt: 'Река Волга'
	}
];

const root = document.querySelector('.body');
const profileEditButton = root.querySelector('.button_type_edit');
const profileNameString = root.querySelector('.profile__name');
const profileDescriptionString = root.querySelector('.profile__status');
const cardCreateButton = root.querySelector('.button_type_add');
const cardGrid = root.querySelector('.elements');
const popupProfile = root.querySelector('.profile-popup');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileNameInput = popupProfile.querySelector('.popup__input_type_name');
const profileDescriptionInput = popupProfile.querySelector('.popup__input_type_status');
const popupCard = root.querySelector('.popup_add-place');
const popupCardForm = popupCard.querySelector('.popup__form');
const cardPlaceInput = popupCard.querySelector('.popup__input_type_place-name');
const cardLinkInput = popupCard.querySelector('.popup__input_type_place-image');
const popupFullPic = root.querySelector('.photo-open');
const popupCloseButtons = root.querySelectorAll('.button_type_close');


function addInitialCards () {
	initialCards.forEach(data => addCard(data));
}

function returnProfileValues () {
	profileNameInput.value = profileNameString.textContent;
	profileDescriptionInput.value = profileDescriptionString.textContent;
}

function openPopup (popup) {
	popup.classList.add('popup_opened');

	popup.addEventListener('click', closePopupByOverlay);
	window.addEventListener('keydown', closePopupByEsc);
}

function openFullPic (evt) { // Открытие попапа с полноразмерной картинкой
	const image = popupFullPic.querySelector('.photo-open__image');
	const targetImage = evt.target;

	image.setAttribute('src', targetImage.src);
	image.setAttribute('alt', targetImage.alt);

	const caption = popupFullPic.querySelector('.photo-open__name');

	caption.textContent = targetImage.alt;

	openPopup(popupFullPic);
}

function closePopup (popup) {
	popup.removeEventListener('click', closePopupByOverlay);
	window.removeEventListener('keydown', closePopupByEsc);

	popup.classList.remove('popup_opened');
}

function closePopupByOverlay (evt) {
	const popup = root.querySelector('.popup_opened');

	if (evt.target === popup) {
		closePopup(popup);
	}
}

function closePopupByEsc (evt) {
	if (evt.key === 'Escape') {
		const popup = root.querySelector('.popup_opened');
		closePopup(popup);
	}
}

function setProfileValues (evt) {
	evt.preventDefault();

	profileNameString.textContent = profileNameInput.value;
	profileDescriptionString.textContent = profileDescriptionInput.value;

	const popup = root.querySelector('.popup_opened');
	closePopup(popup);
}

function setCardValues (evt) {
	evt.preventDefault();

	const data = {};
	data.name = cardPlaceInput.value;
	data.link = cardLinkInput.value;

	addCard(data);

	const popup = root.querySelector('.popup_opened');
	closePopup(popup);
}

function addCard (data) {
	const card = new Card(data, '#template-card');
	cardGrid.prepend(card.generateCard());
}

profileEditButton.addEventListener('click', function () {
	returnProfileValues();
	profileValidator.checkForm();
	openPopup(popupProfile);
});

cardCreateButton.addEventListener('click', function () {
	popupCardForm.reset();
	cardValidator.checkForm();
	openPopup(popupCard);
});

popupCloseButtons.forEach(function (button) {
	button.addEventListener('click', function () {
		const popup = root.querySelector('.popup_opened');
		closePopup(popup);
	});
});

popupProfileForm.addEventListener('submit', setProfileValues);
popupCardForm.addEventListener('submit', setCardValues);

const profileValidator = new FormValidator(validationConfig, popupProfileForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCardForm);
cardValidator.enableValidation();

addInitialCards();

export { openFullPic };