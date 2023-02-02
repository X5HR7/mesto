function openPopUp() {
  let name = document.querySelector('.profile__name').textContent;
  let nameInput = document.querySelector('.popup__input-name');
  let job = document.querySelector('.profile__profession').textContent;
  let jobInput = document.querySelector('.popup__input-profession');
  let popUp = document.querySelector('.popup');
  
  popUp.classList.add('popup_opened');
  nameInput.value = name;
  jobInput.value = job;
}


function closePopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector('.popup__input-name').value;
  let jobInput = document.querySelector('.popup__input-profession').value;
  document.querySelector('.profile__name').textContent = nameInput;
  document.querySelector('.profile__profession').textContent = jobInput;

  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}


let btnOpen = document.querySelector('.profile__edit-button');
btnOpen.addEventListener('click', openPopUp);

let btnClose = document.querySelector('.popup__button-close');
btnClose.addEventListener('click', closePopUp);

let formElement = document.querySelector('.popup__container');
formElement.addEventListener('submit', handleFormSubmit);