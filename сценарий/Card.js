export class Card {
  constructor(item, templateElement, showPopupImg) {
    this._name = item.name;
    this._link = item.link;
    this._template = document.querySelector(templateElement).content;
    this._showPopupImg = showPopupImg;
  }

  createCard() {
    this._cardTemplate = this._template.querySelector(".element").cloneNode(true);
    this._elementName = this._cardTemplate.querySelector(".element__text");
    this._elementImage = this._cardTemplate.querySelector(".element__mask-group");
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._likeElement = this._cardTemplate.querySelector(".element__vector");
    this._elementTrash = this._cardTemplate.querySelector(".element__remover");

    this._initEventListeners();

    return this._cardTemplate;
  }

  _initEventListeners() {
    this._elementImage.addEventListener("click", () =>
      this._showPopupImg(this._name, this._link)
    );

    this._likeElement.addEventListener("click", () => this._like());

    this._elementTrash.addEventListener("click", () => this._deleteImg());
  }

  _like() {
    this._likeElement.classList.toggle("element__vector_like");
  }

  _deleteImg() {
    this._cardTemplate.remove();
    this._cardTemplate = null
  }

  // _handleOpenPopup() {
  //   popupImage.src = this._link;
  //   namePhoto.alt = nameCard;
  //   popupElement.classList.add("popup_is-opened");
  // }

  // _handleClosePopup() {
  //   popupImage.src = "";
  //   popupElement.classList.remove("popup_is-opened");
  // }
}
