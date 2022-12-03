import { FormValidator } from "../script/components/FormValidator.js";
import { Card } from "../script/components/Card.js";
import { initialCards } from "../script/initialCards.js";
import Section from "../script/components/Section.js";
import {
  popupAutorSelector,
  popupMestoSelector,
  bigPhotoSelector
} from "../script/utils/constans.js";
import PopupWithImage from "../script/components/Popup/PopupWithImage.js";
import PopupWithForm from "../script/components/Popup/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import "./index.css"

const nameInput = document.querySelector(".popup__input_name_name");
const jobInput = document.querySelector(".popup__input_name_job");
const buttonOpenPopUpAutor = document.querySelector(".profile__edit");

const popupAutor = document.querySelector(".popup_autor");
const popupMesto = document.querySelector(".popup_mesto");
const profileAdd = document.querySelector(".profile__add");

const formMesto = popupMesto.querySelector("form");
const formAuthot = popupAutor.querySelector("form");

const templateSelector = ".element__tempate";

const setting = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const popupBigPhoto = new PopupWithImage(bigPhotoSelector);
const popupAutorForm = new PopupWithForm(
  popupAutorSelector,
  submitFormHandlerAuthor
);
const popupMestoForm = new PopupWithForm(popupMestoSelector, addMesto);
popupBigPhoto.setEventListeners();
popupAutorForm.setEventListeners();
popupMestoForm.setEventListeners();


const userInform = new UserInfo({
  name: ".profile__name",
  info: ".profile__job",
});


const popupAuthorValidation = new FormValidator(setting, formAuthot);
popupAuthorValidation.enableValidation();

const popupMestoValidation = new FormValidator(setting, formMesto);
popupMestoValidation.enableValidation();

function submitFormHandlerAuthor(evt) {
  const { name, job } = evt.target;
  evt.preventDefault();

  userInform.setUserInfo(name.value, job.value);
  popupAuthorValidation.disableSubmitButton();
  popupAutorForm.close();
}


buttonOpenPopUpAutor.addEventListener("click", (event) => {
  popupAutorForm.openPopUp();
  const input = userInform.getUserInfo();
  nameInput.value = input.name;
  jobInput.value = input.info;
});

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  ".elements"
);

profileAdd.addEventListener("click", () => {
  popupMestoForm.openPopUp();
  popupMestoValidation.disableSubmitButton();
});

function addMesto(data) {

  const { mesto, photo } = data.target;
  const formValue = {
    name: mesto.value,
    link: photo.value,
  };
  defaultCardList.addItem(createCard(formValue));
  popupMestoValidation.disableSubmitButton();
  popupMestoForm.close();
}

function createCard(item) {
  const card = new Card(item, templateSelector, showPopupImg);
  const cardItem = card.generateCard();
  return cardItem;
}

defaultCardList.renderItems(initialCards);

function showPopupImg(name, link) {
  popupBigPhoto.open(name, link);
}
