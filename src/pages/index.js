import { FormValidator } from "../script/components/FormValidator.js";
import { Card } from "../script/components/Card.js";
import {
  nameInput,
  jobInput,
  buttonopenAutor,
  buttonopenAvatar,
  profileAdd,
  formMesto,
  formAuthot,
  formAvatar,
  templateSelector,
  setting
} from "../script/utils/constans.js"

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
import Api from "../script/components/Api"



const popupBigPhoto = new PopupWithImage(bigPhotoSelector);
const popupAutorForm = new PopupWithForm(
  popupAutorSelector,
  submitFormHandlerAuthor,
);
const popupDelete = new PopupWithForm('.popup_delete')


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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'c9823303-b55f-4738-a9da-237c09a74944',
    'Content-Type': 'application/json'
  }
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
  popupAvatarForm.renderLoading(true);
  api.changeAvatar(value.avatar)
    .then(user => {
      userInform.setUserAvatar(user.avatar)
      popupAvatarForm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false);
    });
}


buttonopenAvatar.addEventListener("click", () => {
  popupAvatarForm.open();
  popupAvatarFormValidation.disableSubmitButton();
});


function submitFormHandlerAuthor({ name, job }) {
  popupAutorForm.renderLoading(true);
  api.editProfile(name, job)
    .then((item) => {
      userInform.setUserInfo(item.name, item.about);
      popupAutorForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAutorForm.renderLoading(false);
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
  popupMestoForm.renderLoading(true);
  api.addNewCard(data.name, data.link)
    .then((e) => {
      defaultCardList.addItem(createCard(e))
      popupMestoForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupMestoForm.renderLoading(false);
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

