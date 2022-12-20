//const inputs = [...document.querySelectorAll('.popup__input')];
//const forms = [...document.querySelectorAll('.popup__form')];

const checkInputValidity = (input , config) => {
  const error = document.querySelector(`#${input.id}-error`);
  if(input.validity.valid) {
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
}

const toggleButtonDisable = (inputs , button , config) => {
  const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}



const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input' , () => {
        checkInputValidity(input , config);
        toggleButtonDisable(inputs , button , config);
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


