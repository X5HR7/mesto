export function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keyup', handlePopupOnEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keyup', handlePopupOnEsc);
}

function handlePopupOnEsc(evt) {
  if (evt.key.toLocaleLowerCase() === 'escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

export const popupShowImage = document.querySelector('.popup_type_image');
export const popupImage = popupShowImage.querySelector('.popup__image');
export const popupCaption = popupShowImage.querySelector('.popup__caption');
export const btnClosePopupShowImage = popupShowImage.querySelector('.popup__button-close');