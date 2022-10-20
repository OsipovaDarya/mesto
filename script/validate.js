const setting = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

const hideInputError = (formElement, inputElement, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = '';
};
const toggleButtonState = (inputList, buttonElement, setting) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, setting)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(setting.inactiveButtonClass);

  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(setting.inactiveButtonClass);

  }
};

const checkInputValidity = (formElement, inputElement, setting) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(formElement, inputElement, setting);
  }
};

const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, setting);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, setting);
      toggleButtonState(inputList, buttonElement, setting);
    });
  });
};
const enableValidation = (setting) => {
  formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, setting);
  });
};

const hasInvalidInput = (inputList, setting) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableSubmitButton(buttonElement, setting) {
  buttonElement.classList.add(setting.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}


enableValidation(setting);


