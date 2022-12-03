import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._selectorPopup.querySelector("form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-buttom");
  }

  _getInputValues() {
    this._inputsData = {};
    this._inputList.forEach((input) => {
      return (this._inputsData[input.name] = input.value);
    });
    return this._inputsData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(evt);
    });
  }

  close() {
    this._form.reset();
    super.closePopUp();
  }
}
