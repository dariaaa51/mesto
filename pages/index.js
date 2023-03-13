import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utilits/сards.js"

// Кнопки открытия попапов
const buttonOpenEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");

// Редактировать профиль
const nameInputEdit = document.querySelector("#popupNameInput");
const jobInputEdit = document.querySelector("#popupJobInput");
const editFormEdit = document.querySelector("#editForm");
const popupEdit = document.querySelector("#editPopup");

// Добавить место
const editFormAdd = document.querySelector("#addForm");
const popupAdd = document.querySelector("#addPopup");

const buttonCloseEdit = document.querySelector("#closeEditPopup");
const profileNameEdit = document.querySelector(".profile__name");
const profileJobEdit = document.querySelector(".profile__description");
const nameInputAdd = document.querySelector("#popupDesignationInput");
const jobInputAdd = document.querySelector("#popupPlaceInput");
const buttonCloseAdd = document.querySelector("#closeAddPopup");
const cardsContainer = document.querySelector(".elements");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inputErrorClass: "popup_input_type_error",
  errorClass: "popup__input-error_is-active",
};

// Включение валидации
const validatorAddCardForm = new FormValidator(config, popupAdd);
validatorAddCardForm.enableValidation();

const validatorEditCardForm = new FormValidator(config, popupEdit);
validatorEditCardForm.enableValidation();

// Попап с картинкой
const popupPhoto = new PopupWithImage(".popup_content_image");
popupPhoto.setEventListeners();

// Создание экземпляра с карточкой
const handleCardClick = (data) => {
  popupPhoto.open(data);
};

function renderCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick,
    },
    ".cards-template"
  );

  return card.generateCard();
}

// Отрисовка массива карточек на странице
const sectionCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      // console.log(item);
      sectionCards.addInitialItemApp(cardElement);
    },
  },
  ".elements"
);

sectionCards.renderItems();

// Добавление новой карты из формы
const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_new-place",
  callbackFormSubmit: (data) => {
    const newCardElement = renderCard(data);
    sectionCards.addInitialItemPrep(newCardElement);
    popupNewPlace.close();
  },
});

popupNewPlace.setEventListeners();

// Слушатель события
buttonAdd.addEventListener("click", () => {
  editFormAdd.reset();
  // newPlaceValid.resetForm();
  popupNewPlace.open();
});

// Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameElement: ".profile__name",
  userInfoElement: ".profile__description",
});

// Создание формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile-edit",
  callbackFormSubmit: (data) => {
    userProfile.setUserInfo(data);
    popupEditProfile.close();
  },
});
popupEditProfile.setEventListeners();

// Слушатель события открытия формы редактирования
buttonOpenEdit.addEventListener('click', () => {
  const dataUserProfile = userProfile.getUserInfo();
  nameInputEdit.value = dataUserProfile.name;
  jobInputEdit.value = dataUserProfile.job;

  // profileValid.clearError();
  popupEditProfile.open();
}
)

// Добавить карточки при загрузке страницы
// initialCards.forEach(function (item) {
//   renderCard(item.link, item.name);
// });

// // Функция добавления карточек
// function renderCard(link, name) {
//   const cardTemplate = new Card("#element-template", name, link);
//   cardsContainer.prepend(cardTemplate.createCard());
// }

// // Функция добавления карточек через инпуты
// function handleAddFormSubmit(evt) {
//   evt.preventDefault();
//   renderCard(jobInputAdd.value, nameInputAdd.value);
//   closePopup(popupAdd);
// }

// // Слушатель отправки формы добавления карточки из попапа
// editFormAdd.addEventListener("submit", handleAddFormSubmit);

// // Функция открытия редактирования профиля
// function openEditPopup() {
//   openPopup(popupEdit);
//   nameInputEdit.value = profileNameEdit.textContent;
//   jobInputEdit.value = profileJobEdit.textContent;
// }

// // Слушатель кнопки открытия попапа редактирования профиля
// buttonOpenEdit.addEventListener("click", openEditPopup);

// // Функция изменения данных профиля
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileNameEdit.textContent = nameInputEdit.value;
//   profileJobEdit.textContent = jobInputEdit.value;
//   closePopup(popupEdit);
// }

// // Слушатель отправки формы редактирования профиля
// editFormEdit.addEventListener("submit", handleProfileFormSubmit);

// function closeAddCardPopup() {
//   closePopup(popupAdd);
// }

// // Слушатель кнопки закрытия попапа добавления карточки
// buttonCloseAdd.addEventListener("click", closeAddCardPopup);

// // Слушатель кнопки открытия попапа для добавления карточки
// buttonAdd.addEventListener("click", () => {
//   openPopup(popupAdd);
//   validatorAddCardForm.resetForm();
// });

// // Слушатель кнопки закрытия попапа редактирования профиля
// buttonCloseEdit.addEventListener("click", () => {
//   closePopup(popupEdit);
// });
