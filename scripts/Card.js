import { openPopup, popupShowImage, popupCaption, popupImage } from "./util.js";

export default class Card {
  constructor(cardTemplateSelector, imgSrc, imgTitle) {
    this._cardTemplate = cardTemplateSelector;
    this._imgSrc = imgSrc;
    this._imgTitle = imgTitle; 
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.element__photo').src = this._imgSrc;
    this._card.querySelector('.element__photo').alt = this._imgTitle;
    this._card.querySelector('.element__title').textContent = this._imgTitle;

    return this._card;
  }

  _getTemplate() {
    const card = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    return card;
  }

  _handeLikeBtnClick() {
    this._card.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  _handleRemoveBtnClick() {
    this._card.remove();
  }

  _handleImageClick() {
    popupImage.src = this._imgSrc;
    popupCaption.textContent = this._imgTitle;
    openPopup(popupShowImage);
  }

  _setEventListeners() {
    this._card.querySelector('.element__button-like').addEventListener('click', () => {
      this._handeLikeBtnClick();
    });

    this._card.querySelector('.element__button-remove').addEventListener('click', () => {
      this._handleRemoveBtnClick();
    });

    this._card.querySelector('.element__photo').addEventListener('click', () => {
      this._handleImageClick();
    })
  }
}