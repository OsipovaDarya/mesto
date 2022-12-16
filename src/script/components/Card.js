export class Card {
  constructor({ data, userId, showPopupImg, popupDeleteClick, likeCick, deleteLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._deleteLikeClick = deleteLikeClick;
    this._showPopupImg = showPopupImg;
    this._popupDeleteClick = popupDeleteClick;
    this._likeClick = likeCick;

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

    this._likeChekid = this._element.querySelector(".element__like")
    this._likeElement = this._element.querySelector(".element__vector");
    this._elementTrash = this._element.querySelector(".element__remover");

    this._addLikes();
    this._owner();
    this._initEventListeners();

    this._likes.forEach(like => {
      if (like._id == this._userId) {
        this._likeElement.classList.add('element__vector_like')
      }
    })

    return this._element;
  }

  _initEventListeners() {
    this._likeElement.addEventListener("click", () => {
      if (this._likeElement.classList.contains('element__vector_like')) {
        this._deleteLikeClick(this._cardId)
      } else {
        this._likeClick(this._cardId)
      }
    });

    this._elementImage.addEventListener("click", () => {
      this._showPopupImg(this._name, this._link);
    });

    this._elementTrash.addEventListener("click", () => {
      this._popupDeleteClick(this._cardId)
    });

  }

  havelike(i) {
    this._likeElement.classList.toggle("element__vector_like");
    this._likes = i.likes;
    this._addLikes()

  }

  _owner() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector(".element__remover").style.display = 'none'
    }
  }

  _addLikes() {
    this._likeChekid.textContent = this._likes.length

  }

  deleteImg() {
    this._element.remove();
    this._element = null;
  }
}
