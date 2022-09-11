let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name_name');
let jobInput = document.querySelector('.popup__input_name_job');


let titleName = document.querySelector('.profile__name');
let titleJob = document.querySelector('.profile__job');

const buttonOpenPopUp = document.querySelector('.profile__edit');
const buttonClosePopUp = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function openPopUp() {
  popup.classList.add('popup_opened');
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;

};

function closePopUp() {
  popup.classList.remove('popup_opened');
};


function formSubmitHandler(evt) {
  evt.preventDefault();
  titleJob.textContent = nameInput.value;
  titleName.textContent = jobInput.value;
  closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);
buttonOpenPopUp.addEventListener('click', openPopUp);
buttonClosePopUp.addEventListener('click', closePopUp);
