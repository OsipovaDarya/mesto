
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_name_name');
const jobInput = document.querySelector('.popup__input_name_job');


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
};

//единая функция закрытия попап
function closePopUp(item) {
  item.classList.remove('popup_opened');
};
buttonClosePopUp.forEach(button => {
  button.addEventListener('click', () =>
    closePopUp(button.closest('.popup')));
});

function submitFormHandler(evt) {
  evt.preventDefault();
  titleJob.textContent = nameInput.value;
  titleName.textContent = jobInput.value;
  closePopUp(popupAutor);
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
function mestoAdd(evt) {
  evt.preventDefault();
  const inputMesto = newCardLink.value
  const inputlinkImg = newCardPhoto.value
  addElement(inputMesto, inputlinkImg);
  closePopUp(popupMesto);
}

//обработчик
formMesto.addEventListener('submit', mestoAdd);
formElement.addEventListener('submit', submitFormHandler);


function createCard(cardsname, cardslink) {
  const cadsElement = templateElement.cloneNode(true);
  const elementName = cadsElement.querySelector('.element__text');
  const elementImage = cadsElement.querySelector('.element__mask-group');
  elementName.textContent = cardsname;
  elementImage.src = cardslink;
  elementImage.alt = cardsname;

  elementImage.addEventListener('click', (event) => bigPopupImg(cardsname, cardslink));

  const likeElement = cadsElement.querySelector('.element__vector');
  likeElement.addEventListener('click', (event) => like(likeElement));

  const elementTrash = cadsElement.querySelector('.element__remover');
  elementTrash.addEventListener('click', (event) => deleteImg(elementTrash));

  return cadsElement;
}

function addElement(cardslink, cardsname) {
  const newElement = createCard(cardslink, cardsname);
  elementsSection.prepend(newElement);
}

function like(item) {
  item.classList.toggle('element__vector_like');
}

function deleteImg(item) {
  item.closest('.element').remove();
}

function bigPopupImg(namecard, linkcard) {
  openPopUp(openBigPhoto);
  namePhoto.src = linkcard;
  namePhoto.alt = namecard;
  nameLink.textContent = namecard;
}
