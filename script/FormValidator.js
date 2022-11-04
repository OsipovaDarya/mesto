
// const showInputError = (formElement, inputElement, errorMessage, setting) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(setting.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(setting.errorClass);
// };

// const hideInputError = (formElement, inputElement, setting) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(setting.inputErrorClass);
//   errorElement.classList.remove(setting.errorClass);
//   errorElement.textContent = '';
// };
// const toggleButtonState = (inputList, buttonElement, setting) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList, setting)) {
//     // сделай кнопку неактивной
//     // buttonElement.setAttribute('disabled', true);
//     // buttonElement.classList.add(setting.inactiveButtonClass);
//     disableSubmitButton(buttonElement, setting);

//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(setting.inactiveButtonClass);

//   }
// };

// const checkInputValidity = (formElement, inputElement, setting) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, setting);
//   } else {
//     hideInputError(formElement, inputElement, setting);
//   }
// };

// const setEventListeners = (formElement, setting) => {
//   const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
//   const buttonElement = formElement.querySelector(setting.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, setting);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, setting);
//       toggleButtonState(inputList, buttonElement, setting);
//     });
//   });
// };
// const enableValidation = (setting) => {
//   formList = Array.from(document.querySelectorAll(setting.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });

//     setEventListeners(formElement, setting);
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// function disableSubmitButton(buttonElement) {
//   buttonElement.classList.add(setting.inactiveButtonClass);
//   buttonElement.setAttribute('disabled', true);
// }


// enableValidation(setting);



export class FormValidator {
  constructor(setting, popup) {
    this._formSelector = setting.formSelector;
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
    this._formElement = popup.querySelector(`${setting.formSelector}`);
    this._formList = Array.from(
      this._formElement.querySelectorAll(this._formSelector)
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._disableSubmitButton(this._buttonElement);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = (formElement) => {
    // const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    // const buttonElement = formElement.querySelector(setting.submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };
  _enableValidation = () => {
    // formList = Array.from(document.querySelectorAll(setting.formSelector));
    this._formList.forEach((formElement) => {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      setEventListeners(formElement);
    });
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
