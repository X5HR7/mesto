function openPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp()
}


let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__input_type_name');
let profileJob = document.querySelector('.profile__profession');
let jobInput = document.querySelector('.popup__input_type_profession');
let popUp = document.querySelector('.popup');


let btnOpen = document.querySelector('.profile__edit-button');
btnOpen.addEventListener('click', openPopUp);

let btnClose = document.querySelector('.popup__button-close');
btnClose.addEventListener('click', closePopUp);

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);