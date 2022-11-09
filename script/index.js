import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";

// const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__input_name_name");
const jobInput = document.querySelector(".popup__input_name_job");
const popups = document.querySelectorAll(".popup");

const titleName = document.querySelector(".profile__name");
const titleJob = document.querySelector(".profile__job");

const buttonOpenPopUpAutor = document.querySelector(".profile__edit");
const popupAutor = document.querySelector(".popup_autor");
const popupMesto = document.querySelector(".popup_mesto");
const profileAdd = document.querySelector(".profile__add");

const formMesto = popupMesto.querySelector("form");
const formAuthot = popupAutor.querySelector("form");

const bigPhoto = document.querySelector(".popup__photo");

const namePhoto = document.querySelector(".popup__photo");
const nameLink = document.querySelector(".popup__textimg");

const elementsSection = document.querySelector(".elements");
const photoBigOpen = document.querySelector(".popup_bigphoto");
const newCardPhoto = document.querySelector(".popup__input_name_photo");
const newCardLink = document.querySelector(".popup__input_name_mesto");
const templateElement = document.querySelector(".element__tempate").content;
const templateSelector = ".element__tempate";


const setting = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const popupAuthorValidation = new FormValidator(setting, formMesto);
popupAuthorValidation.enableValidation();

const popupMestoValidation = new FormValidator(setting, formAuthot);
popupMestoValidation.enableValidation();


//единая функция открытия попапов
function openPopUp(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

//единая функция закрытия попап
function closePopUp(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}


// функция закрытия по оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopUp(popup);
    }
  })
});

//закрытие по esc
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopUp(openedPopup);
  }
}

function submitFormHandlerAuthor(evt) {
  evt.preventDefault();
  titleJob.textContent = jobInput.value;
  titleName.textContent = nameInput.value;
  closePopUp(popupAutor);
}

//вызвали функцию
profileAdd.addEventListener("click", () => {
  openPopUp(popupMesto);
});

buttonOpenPopUpAutor.addEventListener("click", (event) => {
  openPopUp(popupAutor);
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
});

function addMesto(evt) {
  evt.preventDefault();
  const inputMesto = newCardLink.value;
  const inputLinkImg = newCardPhoto.value;

  const cardData = {
    name: inputMesto,
    link: inputLinkImg,
  };
  console.log("1");
  addElement(cardData);
  // mestoPopupSubmitButton.classList.add(setting.inactiveButtonClass);
  // mestoPopupSubmitButton.setAttribute("disabled", true);
  popupAuthorValidation.disableSubmitButton();
  closePopUp(popupMesto);
  evt.target.reset();
}

//обработчик
formMesto.addEventListener("submit", addMesto);
formAuthot.addEventListener("submit", submitFormHandlerAuthor);

initialCards.forEach((item) => {
  addElement(item);
});


function addElement(item) {
  elementsSection.prepend(createCard(item));
}

function createCard(initialCards) {
  const card = new Card(initialCards, templateSelector, showPopupImg);

  return card.createCard();
}

function showPopupImg(nameCard, linkCard) {
  namePhoto.src = linkCard;
  namePhoto.alt = nameCard;
  nameLink.textContent = nameCard;
  openPopUp(photoBigOpen);
}

