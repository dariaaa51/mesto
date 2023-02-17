import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const buttonOpenEdit = document.querySelector(".profile__button_type_edit");
const buttonCloseEdit = document.querySelector("#closeEditPopup");
const nameInputEdit = document.querySelector("#popupNameInput");
const jobInputEdit = document.querySelector("#popupJobInput");
const profileNameEdit = document.querySelector(".profile__name");
const profileJobEdit = document.querySelector(".profile__description");
const editFormEdit = document.querySelector("#editForm");
const buttonAdd = document.querySelector(".profile__button_type_add");
const nameInputAdd = document.querySelector("#popupDesignationInput");
const jobInputAdd = document.querySelector("#popupPlaceInput");
const buttonCloseAdd = document.querySelector("#closeAddPopup");
const cardsContainer = document.querySelector(".elements");
const editFormAdd = document.querySelector("#addForm");
const popupEdit = document.querySelector("#editPopup");
const popupAdd = document.querySelector("#addPopup");
const addCardButtonSave = popupAdd.querySelector(".popup__submit-btn");


// Функция закрытия по оверлею
const closePopupWithClick = function (evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
};

// Функция закрытия по кнопке Escape
const closePopupWithEsc = function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// Добавить карточки при загрузке страницы
initialCards.forEach(function (item) {
  renderCard(item.link, item.name);
});

// Функция добавления карточек
function renderCard(link, name) {
  const cardTemplate = new Card("#element-template", name, link);
  cardsContainer.prepend(cardTemplate.createCard());
}

// Функция добавления карточек через инпуты
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  renderCard(jobInputAdd.value, nameInputAdd.value);
  const resetForm = new FormValidator(config, editFormAdd);
  resetForm.resetForm();
  closePopup(popupAdd);
  addCardButtonSave.disabled = true;
}

// Слушатель отправки формы добавления карточки из попапа
editFormAdd.addEventListener("submit", handleAddFormSubmit);

const enableValidation = (config, popup) => {
  const formValidatorEditProfile = new FormValidator(config, popup);
  formValidatorEditProfile.enableValidation();
};

// Функция открытия редактирования профиля
function openEditPopup() {
  openPopup(popupEdit);
  nameInputEdit.value = profileNameEdit.textContent;
  jobInputEdit.value = profileJobEdit.textContent;

  enableValidation(config, popupEdit);
}

// Слушатель кнопки открытия попапа редактирования профиля
buttonOpenEdit.addEventListener("click", openEditPopup);

// Функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEdit.textContent = nameInputEdit.value;
  profileJobEdit.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}

// Слушатель отправки формы редактирования профиля
editFormEdit.addEventListener("submit", handleProfileFormSubmit);

function closeAddCardPopup() {
  closePopup(popupAdd);

  const resetForm = new FormValidator(config, editFormAdd);
  resetForm.resetForm();
}

// Слушатель кнопки закрытия попапа добавления карточки
buttonCloseAdd.addEventListener("click", closeAddCardPopup);

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("mousedown", closePopupWithClick);
  document.addEventListener("keydown", closePopupWithEsc);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("mousedown", closePopupWithClick);
  document.removeEventListener("keydown", closePopupWithEsc);
}

// Слушатель кнопки открытия попапа для добавления карточки
buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);

  const inputList = editFormAdd.querySelectorAll(".popup__text");
  inputList.forEach((input) => {
    input.addEventListener("keydown", () => {
      enableValidation(config, popupAdd);
    });
  });
});

// Слушатель кнопки закрытия попапа редактирования профиля
buttonCloseEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inputErrorClass: "popup_input_type_error",
  errorClass: "popup__input-error_is-active",
};

export { openPopup, closePopup };
