const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name_name');
let jobInput = document.querySelector('.popup__input_name_job');


let titleName = document.querySelector('.profile__name');
let titleJob = document.querySelector('.profile__job');

const buttonOpenPopUp = document.querySelector('.profile__edit');
const buttonClosePopUp = document.querySelectorAll('.popup__close');
const popupAutor = document.querySelector('.popup__autor');
const popupMesto = document.querySelector('.popup__mesto');
const profileAdd = document.querySelector('.profile__add');
const formMesto = document.querySelector('.popup__form-mesto');

const bigPhoto = document.querySelector('.popup__photo');

const namePhoto = document.querySelector('.popup__photo');
const nameLink = document.querySelector('.popup__textimg');

const elementsSection = document.querySelector('.elements');

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

function formSubmitHandler(evt) {
  evt.preventDefault();
  titleJob.textContent = nameInput.value;
  titleName.textContent = jobInput.value;
  closePopUp(popupAutor);
}

//function CardSubmitHandler(evt) {
//  evt.preventDefault();
// const cardNews = {
//   name: newCardPhoto.value,
//    link: newCardLink.value
//  };
//  renderCard(cardNews);
//  closePopUp(popupMesto);
//}
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
formElement.addEventListener('submit', formSubmitHandler);


//для карточек
//функция для карточек
//function renderCard(cards) {
/// const cardsElement = templateElement.cloneNode(true);
/// cardsElement.querySelector('.element__text').textContent = cards.name;
//  cardsElement.querySelector('.element__mask-group').src = cards.link;
// cardsElement.querySelector('.element__mask-group').alt = cards.name;
// typeElements.append(cardsElement);
//  return cardsElement;
//}
//function typeElements(element) {
//  element.querySelector('.element__vector').addEventListener('click', handleLike);
// element.querySelector('.element__remover').addEventListener('click', handleRemover);
//  element.querySelector('.element__mask-group').addEventListener('click', bigPhoto);
//}


function renderCard(cardsname, cardslink) {
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
  const newElement = renderCard(cardslink, cardsname);
  elementsSection.prepend(newElement);
}

function like(item) {
  item.classList.toggle('element__vector_like');
}

function deleteImg(item) {
  item.closest('.element').remove();
}

const popupBigPhoto = document.querySelector('.popup_bigphoto')
function bigPopupImg(namecard, linkcard) {
  openPopUp(popupBigPhoto);
  namePhoto.src = linkcard;
  namePhoto.alt = namecard;
  nameLink.textContent = namecard;
}
