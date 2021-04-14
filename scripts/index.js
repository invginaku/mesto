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
const initialCards = [
	{
		name: 'Эльбрус',
		link: './images/element-images/elbrus.jpg',
		alt: 'Приэльбрусье'
	},
	{
		name: 'Саранск',
		link: './images/element-images/saransk.jpg',
		alt: 'Мордовия Арена'
	},
	{
		name: 'Москва',
		link: './images/element-images/moscow.jpg',
		alt: 'Фудмолл ДЕПО'
	},
	{
		name: 'Санкт-Питербург',
		link: './images/element-images/piter.jpg',
		alt: 'Казанский кафедральный собор'
	},
	{
		name: 'Пенза',
		link: './images/element-images/penza.jpg',
		alt: 'Закат на районе ГПЗ-24'
	},
	{
		name: 'Астрахань',
		link: './images/element-images/astrakhan.jpg',
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

const initialCardsSection = new Section({
	items: initialCards,
	renderer: (data, section) => {
		function openFullPic (evt) {
			popupFullPic.open(evt);
		}

		const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
		section.addItem(cardElement);
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
		data.name = values.name;
		data.link = values.description;

		const newCardSection = new Section({
			items: data,
			renderer: (data, section) => {
				function openFullPic (evt) {
					popupFullPic.open(evt);
				}

				const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
				section.addItem(cardElement);
			}
		}, cardGridSelector);
		newCardSection.renderItems();

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
initialCardsSection.renderItems();
export {root};