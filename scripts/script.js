let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let formElement = document.querySelector('.popup__form');
let formPLace = document.querySelector('.popup__form_add-place');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_status');
let photoCard = document.querySelector(".photo-open");
let addCardButton = document.querySelector(".button_type_add");
let closeButtonPhoto = document.querySelector('.button_type_close-photo');
let popupPlace = document.querySelector('.popup_add-place');
let closeButtonPlace = document.querySelector('.button_type_close-add-place');
let placesList = document.querySelector(".elements");
let imageLink = document.querySelector(".photo-open__image");
let nameCard = document.querySelector(".photo-open__name");

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

function createCard(name,  link) {

    const placeCard = document.createElement('div');
    const cardImage = document.createElement('img');
    const deleteIcon = document.createElement('button');
    const cardDesc = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeIcon = document.createElement('button');

    placeCard.classList.add('element');

    deleteIcon.classList.add('button_type_urn');
    placeCard.appendChild(deleteIcon);

    cardImage.classList.add('element__photo');
    placeCard.appendChild(cardImage);
    cardImage.setAttribute('src', `${link}`);
    cardImage.setAttribute('alt',`${name}`);

    cardDesc.classList.add('element__info');
    placeCard.appendChild(cardDesc);

    cardName.classList.add('element__text');
    cardName.textContent = `${name}`;
    cardDesc.appendChild(cardName);

    likeIcon.classList.add('button', 'button_type_like');
    cardDesc.appendChild(likeIcon);

    likeIcon.addEventListener('click', likeCardHandler);
    deleteIcon.addEventListener('click', removeCardHandler);
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
    photoCard.classList.add("popup_opened");
    imageLink.src = event.target.getAttribute('src');
    nameCard.textContent = event.target.getAttribute('alt');
}

function addCard(event) {
    event.preventDefault();

    const link = formPLace.elements.image;
    const name = formPLace.elements.place;
    const cardContainer = createCard(name.value, link.value);
    placesList.insertBefore(cardContainer, placesList.firstChild);
    formPLace.reset();
    // closeForm();
    popupPlace.classList.remove('popup_opened');
}

function popupOpened () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent
    jobInput.value = profileStatus.textContent
}

function popupPlaceOpened () {
    popupPlace.classList.add('popup_opened');
}

function popupClosed () {
    popup.classList.remove('popup_opened');
}

function popupPhotoClosed() {
    photoCard.classList.remove("popup_opened");
}

function popupPlaceClosed() {
    popupPlace.classList.remove("popup_opened");
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    popupClosed ();
}

initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    placesList.appendChild(cardElement);
})

formPLace.addEventListener('submit', addCard);

addCardButton.addEventListener('click', popupPlaceOpened);

editButton.addEventListener('click', popupOpened);

closeButton.addEventListener('click', popupClosed);

closeButtonPhoto.addEventListener('click', popupPhotoClosed);

closeButtonPlace.addEventListener('click', popupPlaceClosed);

formElement.addEventListener('submit', handleFormSubmit);