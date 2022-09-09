let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name_name');
let jobInput = document.querySelector('.popup__input_name_job');

let titleName = document.querySelector('.profile__name');
let titleJob = document.querySelector('.profile__job');

const openPopUp = document.querySelector('.profile__edit');
const closePopUp = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');


openPopUp.addEventListener('click', () => {
    popup.classList.add('active');

});

closePopUp.addEventListener('click', () => {
    popup.classList.remove('active');
});

console.log(openPopUp, closePopUp);

formElement.addEventListener('submit', formSubmitHandler);


function formSubmitHandler(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    titleName.textContent = nameValue;
    titleJob.textContent = jobValue;
    popup.classList.remove('active');
}



console.log(formElement, nameInput, jobInput);
