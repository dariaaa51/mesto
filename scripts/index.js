const buttonEdit  = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
// let popupSumbitButton = document.querySelector(".popup__submit-btn");

function openPopup() {
  popup.classList.add('popup__container_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

buttonEdit.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup__container_opened');
}

buttonClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileJob.textContent = `${jobInput.value}`;
  closePopup();
}

editForm.addEventListener('submit', formSubmitHandler);
