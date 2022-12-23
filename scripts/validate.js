const showInputError = (formElement , inputElement , errorMessage , config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement , inputElement , config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement , inputElement , config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement , inputElement , inputElement.validationMessage , config);
  } else {
    hideInputError(formElement , inputElement , config);
  }
};

const setEventListeners = (formElement , config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);

  toggleButtonDisable(inputList , button , config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement , config);
      toggleButtonDisable(inputList , button , config)
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement , config);
  });
};


const toggleButtonDisable = (inputList , button , config) => {
  const isFormValid = inputList.every(inputElement => inputElement.validity.valid)
  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}
// const toggleButtonDisable = (formElement , config) => {
//   formElement.querySelector(config.submitButtonSelector).classList.add(config.inactiveButtonClass);
// }

// const toggleButtonEnable = (formElement , config) => {
//   formElement.querySelector(config.submitButtonSelector).classList.remove(config.inactiveButtonClass);
// }

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


