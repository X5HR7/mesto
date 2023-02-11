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

//popupShowImage
const popupShowImage = document.querySelector('.popup_type_image');
const popupImage = popupShowImage.querySelector('.popup__image');
const popupCaption = popupShowImage.querySelector('.popup__caption');
const btnClosePopupShowImage = popupShowImage.querySelector('.popup__button-close');

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements');
const imageTitle = addFormElement.querySelector('.popup__input_type_place-title');
const imageUrl = addFormElement.querySelector('.popup__input_type_image-src');


function addCard(card) {
  cards.prepend(card);
}

function createNewCard(imgSrc, imgTitle) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const image = card.querySelector('.element__photo');
  const title = card.querySelector('.element__title');

  image.src = imgSrc;
  image.alt = imgTitle;
  title.textContent = imgTitle;

  const likeCardBtn = card.querySelector('.element__button-like');
  likeCardBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });

  const removeCardBtn = card.querySelector('.element__button-remove');
  removeCardBtn.addEventListener('click', removeCard);

  image.addEventListener('click', () => {
    openPopup(popupShowImage);
    popupImage.src = imgSrc;
    popupImage.alt = imgTitle;
    popupCaption.textContent = imgTitle;
  })

  return card;
}

function createInitialCards() {
  initialCards.forEach(item => {
    addCard(createNewCard(item.link, item.name));
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

function removeCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

function clearFormFields(form) {
  form.reset();
}

createInitialCards()

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
  openPopup(popupAddCard);
})

btnClosePopupAddCard.addEventListener('click', () => {
  clearFormFields(addFormElement);
  closePopup(popupAddCard);
})

addFormElement.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, popupAddCard);
  addCard(createNewCard(imageUrl.value, imageTitle.value));
  clearFormFields(addFormElement);
});


btnClosePopupShowImage.addEventListener('click', () => {
  closePopup(popupShowImage);
})