const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

const showInputError = (formElement, inputElement, errorMessage, popupErrorSelector, popupInputErrorSelector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupErrorSelector);

  inputElement.classList.add(popupInputErrorSelector);
}

const hideInputError = (formElement, inputElement, popupErrorSelector, popupInputErrorSelector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  errorElement.textContent = '';
  errorElement.classList.remove(popupErrorSelector);

  inputElement.classList.remove(popupInputErrorSelector);
}

const toggleButtonState = (inputList, buttonElement, popupButtonDisabledSelector) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupButtonDisabledSelector);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(popupButtonDisabledSelector);
    buttonElement.removeAttribute('disabled');
  }
}

const checkInputValidity = (formElement, inputElement, popupErrorSelector, popupInputErrorSelector) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupErrorSelector, popupInputErrorSelector);
  }
  else {
    hideInputError(formElement, inputElement, popupErrorSelector, popupInputErrorSelector);
  }
}

const setEventListeners = (formElement, popupInputSelector, popupButtonSelector, popupButtonDisabledSelector, popupErrorSelector, popupInputErrorSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(popupInputSelector));
  const buttonElement = formElement.querySelector(popupButtonSelector);

  toggleButtonState(inputList, buttonElement, popupButtonDisabledSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, popupErrorSelector, popupInputErrorSelector);
      toggleButtonState(inputList, buttonElement, popupButtonDisabledSelector);
    });
  });
}

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault;
    });
    setEventListeners(formElement, selectors.inputSelector, selectors.submitButtonSelector, selectors.inactiveButtonClass, selectors.errorClass, selectors.inputErrorClass);
  });
}

enableValidation(settings);