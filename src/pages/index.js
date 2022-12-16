import { FormValidator } from "../script/components/FormValidator.js";
import { Card } from "../script/components/Card.js";

import Section from "../script/components/Section.js";
import {
  popupAutorSelector,
  popupMestoSelector,
  bigPhotoSelector,
  popupAvatarSelector
} from "../script/utils/constans.js";
import PopupWithImage from "../script/components/Popup/PopupWithImage.js";
import PopupWithForm from "../script/components/Popup/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import "./index.css"
import { api } from "../script/components/Api.js"


const nameInput = document.querySelector(".popup__input_name_name");
const jobInput = document.querySelector(".popup__input_name_job");

//аватар
const buttonopenAutor = document.querySelector(".profile__edit");
const buttonopenAvatar = document.querySelector(".profile__button")


const popupAutor = document.querySelector(".popup__autor");
const popupMesto = document.querySelector(".popup_mesto");
const profileAdd = document.querySelector(".profile__add");
const popupAvatar = document.querySelector(".popup__avatar")

const formMesto = popupMesto.querySelector("form");
const formAuthot = popupAutor.querySelector("form");
const formAvatar = popupAvatar.querySelector("form")

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
  submitFormHandlerAuthor,
);
const popupDelete = new PopupWithForm('.popup__delete')


const popupAvatarForm = new PopupWithForm(popupAvatarSelector,
  submitFormHandlerAvatar
)

const popupMestoForm = new PopupWithForm(popupMestoSelector, addMesto);


const popupAuthorValidation = new FormValidator(setting, formAuthot);
popupAuthorValidation.enableValidation();

const popupMestoValidation = new FormValidator(setting, formMesto);
popupMestoValidation.enableValidation();

const popupAvatarFormValidation = new FormValidator(setting, formAvatar)
popupAvatarFormValidation.enableValidation();

const userInform = new UserInfo({
  name: ".profile__name",
  info: ".profile__job",
  avatar: ".profile__avatar"
});



let userId
Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInform.setUserInfo(user.name, user.about);
    userInform.setUserAvatar(user.avatar);
    defaultCardList.renderItems(cards.reverse());
  })


function submitFormHandlerAvatar(value) {
  popupAvatarForm.renderLoading(true)
  api.changeAvatar(value.avatar)
    .then(user => {
      userInform.setUserAvatar(user.avatar)
      popupAvatarForm.close()
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false)
    });
}





buttonopenAvatar.addEventListener("click", () => {
  popupAvatarForm.open();
  popupAvatarFormValidation.enableValidation
});



function submitFormHandlerAuthor({ name, job }) {
  popupAutorForm.renderLoading(true)
  api.editProfile(name, job)
    .then((item) => {
      userInform.setUserInfo(item.name, item.about);
      popupAutorForm.close();
      // userInform.setUserAvatar(avatar)
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false)
    });
}

buttonopenAutor.addEventListener("click", () => {
  popupAutorForm.open();
  const input = userInform.getUserInfo();
  nameInput.value = input.name;
  jobInput.value = input.info;
});

const defaultCardList = new Section(
  {
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  ".elements"
);

profileAdd.addEventListener("click", () => {
  popupMestoForm.open();
  popupMestoValidation.disableSubmitButton();
});

function addMesto(data) {
  popupMestoForm.renderLoading(true)
  api.addNewCard(data.name, data.link)
    .then((e) => {
      defaultCardList.addItem(createCard(e))
      popupMestoForm.close();
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false)
    });
}

function createCard(item) {
  const card = new Card({
    data: item, userId: userId,
    showPopupImg: (name, link) => {
      popupBigPhoto.open(name, link);
    },
    popupDeleteClick:
      (cardId) => {
        popupDelete.open()
        popupDelete.changeHandleSubmit(() => {
          api.deleteCards(cardId)
            .then(() => {
              card.deleteImg()
              popupDelete.close()
            })
        })
      }, likeCick: (cardId) => {
        api.addNewlike(cardId)
          .then((i) => {
            card.havelike(i)
          })

      },
    deleteLikeClick: (cardId) => {
      api.deletelikes(cardId)
        .then((i) => {
          card.havelike(i)
        })
    }
  },
    templateSelector);

  const cardItem = card.generateCard();

  return cardItem;
}


popupBigPhoto.setEventListeners();
popupAutorForm.setEventListeners();
popupMestoForm.setEventListeners();
popupDelete.setEventListeners();
popupAvatarForm.setEventListeners();

