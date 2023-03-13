import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, popupShowImage, btnClosePopupShowImage } from "./util.js";
import { settings, initialCards } from "./constants.js";

const profileName = document.querySelector('.profile__name');
const nameInput = document.querySelector('.popup__input_type_name');
const profileJob = document.querySelector('.profile__profession');
const jobInput = document.querySelector('.popup__input_type_profession');

//popupEditProfile
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const btnOpenPopupEditProfile = document.querySelector('.profile__edit-button');
const btnClosePopupEditProfile = popupEditProfile.querySelector('.popup__button-close');
const editFormElement = popupEditProfile.querySelector('.popup__form_type_edit-profile');

//popupAddCard
const popupAddCard = document.querySelector('.popup_type_add-card');
const btnOpenPopupAddCard = document.querySelector('.profile__add-button');
const btnClosePopupAddCard = popupAddCard.querySelector('.popup__button-close');
const addFormElement = popupAddCard.querySelector('.popup__form_type_add-card');


const cardTemplateSelector = document.querySelector('#card');
const cards = document.querySelector('.elements');
const imageTitle = addFormElement.querySelector('.popup__input_type_place-title');
const imageUrl = addFormElement.querySelector('.popup__input_type_image-src');


function addCard(card) {
  cards.prepend(card);
}

function createInitialCards() {
  initialCards.forEach(item => {
    const card = new Card(cardTemplateSelector, item.link, item.name).createCard();
    addCard(card);
  });
}


function openProfileEditPopup(popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
}

function saveProfileChanges() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function handleFormSubmit(evt, popup) {
  evt.preventDefault();
  closePopup(popup);
}

function initPopupOnOverlay() {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  });
}

createInitialCards();
initPopupOnOverlay();

const formEditProfile = new FormValidator(settings, document.querySelector('.popup__form_type_edit-profile'));
formEditProfile.enableValidation();
const formAddCard = new FormValidator(settings, document.querySelector('.popup__form_type_add-card'));
formAddCard.enableValidation();

btnOpenPopupEditProfile.addEventListener('click', () => {
  openProfileEditPopup(popupEditProfile);
});

btnClosePopupEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

editFormElement.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, popupEditProfile);
  saveProfileChanges();
});

btnOpenPopupAddCard.addEventListener('click', () => {
  addFormElement.reset();
  formAddCard._disableButton();
  openPopup(popupAddCard);
});

btnClosePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

addFormElement.addEventListener('submit', evt => {
  handleFormSubmit(evt, popupAddCard);
  const card = new Card(cardTemplateSelector, imageUrl.value, imageTitle.value).createCard();
  addCard(card);
});

btnClosePopupShowImage.addEventListener('click', () => {
  closePopup(popupShowImage);
});