const profileName = document.querySelector('.profile__name');
const nameInput = document.querySelector('.popup__input_type_name');
const profileJob = document.querySelector('.profile__profession');
const jobInput = document.querySelector('.popup__input_type_profession');

const cards = document.querySelector('.elements');

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


function addCard(imgSrc, imgTitle) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const image = card.querySelector('.element__photo');
  const title = card.querySelector('.element__title');

  image.src = imgSrc;
  image.alt = imgTitle;
  title.textContent = imgTitle;

  cards.prepend(card);

  const btnLike = document.querySelector('.element__button-like');
  btnLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });
}

function createInitialCards() {
  initialCards.forEach(item => {
    addCard(item.link, item.name);
  });
}


function openPopUp(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}

function saveProfileChanges() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function handleFormSubmit(evt, popup) {
  evt.preventDefault();
  closePopUp(popup);
}

function createNewCard() {
  const imageTitle = addFormElement.querySelector('.popup__input_type_place-title').value;
  const imageUrl = addFormElement.querySelector('.popup__input_type_image-src').value;

  addCard(imageUrl, imageTitle);
}

function clearFormFields(form) {
  fields = form.querySelectorAll('.popup__input');
  fields.forEach(inputElement => {
    inputElement.value = '';
  })
}

//Обрабтчики popUpEditProfile
const popUpEditProfile = document.querySelector('.popup_type_edit-profile');

const btnOpenPopUpEditProfile = document.querySelector('.profile__edit-button');
btnOpenPopUpEditProfile.addEventListener('click', () => {
  openPopUp(popUpEditProfile);
});

const btnClosePopUpEditProfile = popUpEditProfile.querySelector('.popup__button-close');
btnClosePopUpEditProfile.addEventListener('click', () => {
  closePopUp(popUpEditProfile);
});

const editFormElement = popUpEditProfile.querySelector('.popup__form_type_edit-profile');
editFormElement.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, popUpEditProfile);
  saveProfileChanges();
});


//Обработчики popUpAddCard
const popUpAddCard = document.querySelector('.popup_type_add-card');

const btnOpenPopUpAddCard = document.querySelector('.profile__add-button');
btnOpenPopUpAddCard.addEventListener('click', () => {
  openPopUp(popUpAddCard);
})

const btnClosePopUpAddCard = popUpAddCard.querySelector('.popup__button-close');
btnClosePopUpAddCard.addEventListener('click', () => {
  clearFormFields(addFormElement);
  closePopUp(popUpAddCard);
})

const addFormElement = popUpAddCard.querySelector('.popup__form_type_add-card');
addFormElement.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, popUpAddCard);
  createNewCard();
  clearFormFields(addFormElement);
});

createInitialCards()