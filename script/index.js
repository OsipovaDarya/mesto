
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_name_name');
const jobInput = document.querySelector('.popup__input_name_job');
const popups = document.querySelectorAll('.popup');

const titleName = document.querySelector('.profile__name');
const titleJob = document.querySelector('.profile__job');

const buttonOpenPopUp = document.querySelector('.profile__edit');
const buttonClosePopUp = document.querySelectorAll('.popup__close');
const popupAutor = document.querySelector('.popup_autor');
const popupMesto = document.querySelector('.popup_mesto');
const profileAdd = document.querySelector('.profile__add');
const formMesto = document.querySelector('.popup__form-mesto');

const bigPhoto = document.querySelector('.popup__photo');

const namePhoto = document.querySelector('.popup__photo');
const nameLink = document.querySelector('.popup__textimg');

const elementsSection = document.querySelector('.elements');
const openBigPhoto = document.querySelector('.popup_bigphoto');
const newCardPhoto = document.querySelector('.popup__input_name_photo');
const newCardLink = document.querySelector('.popup__input_name_mesto');
const templateElement = document.querySelector('.element__tempate').content;

//единая функция открытия попапов
function openPopUp(item) {
  item.classList.add('popup_opened');
  popups.addEventListener('keydown', closeByEscape);
};

//единая функция закрытия попап
function closePopUp(item) {
  item.classList.remove('popup_opened');
  popups.removeEventListener('keydown', closeByEscape);
};
buttonClosePopUp.forEach(button => {
  button.addEventListener('click', () =>
    closePopUp(button.closest('.popup')));
});
//функция закрытия по оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopUp(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopUp(popup)
    }
  })
})

//закрытие по esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('popup_opened');
    closePopUp
  }
}



function submitFormHandler(evt) {
  evt.preventDefault();
  titleJob.textContent = jobInput.value;
  titleName.textContent = nameInput.value;
  closePopUp(popupAutor);
  evt.submitter.classList.add('.popup__button_disabled');
  evt.submitter.setAttribute('disabled', true);
  formElement.reset();
}

initialCards.forEach((item) => {
  addElement(item.name, item.link);
});

//вызвали функцию
profileAdd.addEventListener('click', () => {
  openPopUp(popupMesto);
});

buttonOpenPopUp.addEventListener('click', event => {
  openPopUp(popupAutor);
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
});
function addMesto(evt) {
  evt.preventDefault();
  const inputMesto = newCardLink.value
  const inputLinkImg = newCardPhoto.value
  evt.target.reset();
  addElement(inputMesto, inputLinkImg);
  closePopUp(popupMesto);

}

//обработчик
formMesto.addEventListener('submit', addMesto);
formElement.addEventListener('submit', submitFormHandler);


function createCard(cardsName, cardsLink) {
  const cadsElement = templateElement.cloneNode(true);
  const elementName = cadsElement.querySelector('.element__text');
  const elementImage = cadsElement.querySelector('.element__mask-group');
  elementName.textContent = cardsName;
  elementImage.src = cardsLink;
  elementImage.alt = cardsName;

  elementImage.addEventListener('click', (event) => showPopupImg(cardsName, cardsLink));

  const likeElement = cadsElement.querySelector('.element__vector');
  likeElement.addEventListener('click', (event) => like(likeElement));

  const elementTrash = cadsElement.querySelector('.element__remover');
  elementTrash.addEventListener('click', (event) => deleteImg(elementTrash));

  return cadsElement;
}

function addElement(cardsLink, cardsName) {
  const newElement = createCard(cardsLink, cardsName);
  elementsSection.prepend(newElement);
}

function like(item) {
  item.classList.toggle('element__vector_like');
}

function deleteImg(item) {
  item.closest('.element').remove();
}

function showPopupImg(nameCard, linkCard) {
  openPopUp(openBigPhoto);
  namePhoto.src = linkCard;
  namePhoto.alt = nameCard;
  nameLink.textContent = nameCard;
}

