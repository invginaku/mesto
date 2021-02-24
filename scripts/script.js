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
let closeButtonPlace = document.querySelector('.button_type_close_add-place');
let namePlace = document.querySelector('.popup__input_type_place-name');
let imagePlace = document.querySelector('.popup__input_type_place-image');


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

let sectionGrid = document.querySelector(".elements");
const cardTemplate = document.querySelector(".elements__template").content;

function addCard(add) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".element__text").textContent = add.name;
    cardElement.querySelector(".element__photo").src = add.link;

    let urnButton = cardElement.querySelector(".button_type_urn");
    urnButton.addEventListener("click", function (evt) {
        let deleteUrnButton = evt.target.closest(".element");
        deleteUrnButton.remove();
    });

    let heartButton = cardElement.querySelector(".button_type_like");
    heartButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("button_type_like_active");
    });

    let imageButton = cardElement.querySelector(".element__photo");
    let imageLink = document.querySelector(".photo-open__image");
    let nameCard = document.querySelector(".photo-open__name");
    imageButton.addEventListener("click", function () {
        photoCard.classList.add("popup_opened");
        nameCard.textContent = add.name;
        imageLink.src = add.link;
    });

    function newAddCard(add) {
        sectionGrid.prepend(add);
    }
    newAddCard(cardElement);
}

function inatialCard() {
    const cardElementNew = cardTemplate.cloneNode(true);
    cardElementNew.querySelector(".element__text").textContent = namePlace.value;
    cardElementNew.querySelector(".element__photo").src = imagePlace.value;
    sectionGrid.prepend(cardElementNew);
    return cardElementNew;
}

function clearForm() {
    namePlace.value = "";
    imagePlace.value = "";
}

function cardFormSubmit(evt) {
    evt.preventDefault();
    popupPlaceClosed();
    inatialCard();
    clearForm();
}

initialCards.forEach((item) => {
    addCard(item);
});

formPLace.addEventListener('submit', cardFormSubmit);

addCardButton.addEventListener('click', popupPlaceOpened);

editButton.addEventListener('click', popupOpened);

closeButton.addEventListener('click', popupClosed);

closeButtonPhoto.addEventListener('click', popupPhotoClosed);

closeButtonPlace.addEventListener('click', popupPlaceClosed);

formElement.addEventListener('submit', handleFormSubmit);