export default class FormValidator {
  constructor(data, formElement) {
    this._form = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);

    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);

    inputElement.classList.remove(this._inputErrorClass);
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    }
    else {
      this._enableButton()
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}