let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_status');

editButton.addEventListener('click',
function popupOpened () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent
    jobInput.value = profileStatus.textContent
}
);
closeButton.addEventListener('click',
function popupClosed () {
    popup.classList.remove('popup_opened');
}
);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);