
export class FormValidator {
  constructor(setting, formSelector) {
    this._formSelector = formSelector;
    this._setting = setting;
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
    this._formElement = this._formSelector.querySelector(`${setting.formSelector}`);
    // this._formList = Array.from(
    //   this._formElement.querySelectorAll(this._formSelector)
    // );
    // this._inputList = Array.from(
    //   this._formElement.querySelectorAll(this._inputSelector)
    // );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._setting.inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._disableSubmitButton();
    } else {
      // иначе сделай кнопку активной
      this._enableSubmitButton();
    }
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._setting.inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._setting.submitButtonSelector);
    // this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._disableSubmitButton();
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._setting.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }
  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._setting.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  enableValidation() {
    this._disableSubmitButton();
    this._setEventListeners();
  }
}
