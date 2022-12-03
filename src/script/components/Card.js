export class Card {
  constructor(data, templateSelector, showPopupImg) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showPopupImg = showPopupImg;
  }

  _cardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._cardTemplate();
    this._elementName = this._element.querySelector(".element__text");
    this._elementImage = this._element.querySelector(".element__mask-group");
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._likeElement = this._element.querySelector(".element__vector");
    this._elementTrash = this._element.querySelector(".element__remover");

    this._initEventListeners();

    return this._element;
  }

  _initEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._showPopupImg(this._name, this._link);
    });

    this._likeElement.addEventListener("click", () => this._like());

    this._elementTrash.addEventListener("click", () => this._deleteImg());
  }

  _like() {
    this._likeElement.classList.toggle("element__vector_like");
  }

  _deleteImg() {
    this._element.remove();
  }
}
