const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.button_type_close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formElement = document.querySelector('.popup__form');
const formPLace = document.querySelector('.popup__form_add-place');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const photoCard = document.querySelector('.photo-open');
const addCardButton = document.querySelector(".button_type_add");
const closeButtonPhoto = document.querySelector('.button_type_close-photo');
const popupPlace = document.querySelector('.popup_add-place');
const closeButtonPlace = document.querySelector('.button_type_close-add-place');
const placesList = document.querySelector('.elements');
const imageLink = document.querySelector('.photo-open__image');
const nameCard = document.querySelector('.photo-open__name');
const cardElement = document.querySelector('.elements__template').content; //template карточки

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(name, image) {
    const placeCard = cardElement.cloneNode(true);
    const cardName = placeCard.querySelector('.element__text'); //Название места
    const cardImage = placeCard.querySelector('.element__photo'); //Изображение места
    const trashButton = placeCard.querySelector('.button_type_urn'); //кнопка корзины
    const likeButton = placeCard.querySelector('.button_type_like'); //кнопка лайка
    cardName.textContent = name;
    cardImage.src = image;
    cardImage.alt = name;
    trashButton.addEventListener('click', removeCardHandler);
    likeButton.addEventListener('click', likeCardHandler);
    cardImage.addEventListener('click', openPlace);
    return placeCard;
}

function likeCardHandler(event) {
    event.target.classList.toggle('button_type_like_active');
}

function removeCardHandler(event) {
    const card = event.target.closest('.element');
    card.parentNode.removeChild(card);
}

function openPlace(event) {
    openPopup(photoCard);
    imageLink.src = event.target.getAttribute('src');
    nameCard.textContent = event.target.getAttribute('alt');
}

function addCard(event) {
    event.preventDefault();

    const link = formPLace.elements.image;
    const name = formPLace.elements.place;
    const cardContainer = createCard(name.value, link.value);
    placesList.prepend(cardContainer);
    formPLace.reset();
    closePopup(popupPlace);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(elem) {
    elem.classList.remove('popup_opened');
}

function openProfilePopup () {
    openPopup(popup);
    nameInput.value = profileName.textContent
    jobInput.value = profileStatus.textContent
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup(popup) ();
}

initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    placesList.appendChild(cardElement);
})

editButton.addEventListener('click', openProfilePopup);
closeButton.addEventListener('click', () => closePopup(popup));
addCardButton.addEventListener('click', () => openPopup(popupPlace));
closeButtonPhoto.addEventListener('click', () => closePopup(photoCard));
closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));
formElement.addEventListener('submit', handleFormSubmit);
formPLace.addEventListener('submit', addCard);