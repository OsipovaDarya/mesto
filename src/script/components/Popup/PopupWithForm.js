import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-buttom");
    this._buttonSavedText = this._submitButton.textContent
  }
  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText
    } else {
      this._submitButton.textContent = this._buttonSavedText;
    }
  }

  _getInputValues() {
    const inputsData = {};
    this._inputList.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    return inputsData;
  }

  changeHandleSubmit(newHandleSubmit) {
    this._handleSubmit = newHandleSubmit
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
