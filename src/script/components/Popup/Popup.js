export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = document.querySelector(selectorPopup);
  }
  //единая функция открытия попапов
  openPopUp() {
    this._selectorPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }
  //единая функция закрытия попап
  closePopUp() {
    this._selectorPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }
  //закрытие по esc
  _closeByEscape = (evt) => {
    if (evt.key === "Escape") {
      this.closePopUp();
    }
  };
  setEventListeners() {
    this._selectorPopup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.closePopUp();
      }
    });
  }
}
