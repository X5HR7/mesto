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

const disableButton = (buttonElement, popupButtonDisabledSelector) => {
  buttonElement.classList.add(popupButtonDisabledSelector);
  buttonElement.setAttribute('disabled', true);
}

const enableButton = (buttonElement, popupButtonDisabledSelector) => {
  buttonElement.classList.remove(popupButtonDisabledSelector);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, popupButtonDisabledSelector) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, popupButtonDisabledSelector)
  }
  else {
    enableButton(buttonElement, popupButtonDisabledSelector)
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

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, validationSettings.inputSelector, validationSettings.submitButtonSelector, validationSettings.inactiveButtonClass, validationSettings.errorClass, validationSettings.inputErrorClass);
  });
}

enableValidation(settings);