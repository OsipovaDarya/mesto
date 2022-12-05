import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__photo");
    this._figcaption = this._popup.querySelector(".popup__textimg");
  }

  open = (name, link) => {
    this._figcaption.alt = name;
    this._image.src = link;
    this._figcaption.textContent = name;
    super.open();
  };
}
