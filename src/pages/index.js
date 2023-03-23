import "./index.css";

import {
  buttonOpenEdit,
  buttonAdd,
  nameInputEdit,
  jobInputEdit,
  popupEdit,
  formAddPopup,
  formEditPopup,
  formEditAvatar,
  popupAdd,
  config,
} from "../utilits/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utilits/сards.js";
import { Api } from "../components/Api.js";

let currentUserId;

// Объект для передачи данных серверу
const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61/",
  "b0832912-0612-451f-a255-c3171e888069"
);

// Валидация
const validatorAddCardForm = new FormValidator(config, formAddPopup);
const validatorEditCardForm = new FormValidator(config, formEditPopup);
// const validatorEditProfileAvatar = new FormValidator(config, formEditAvatar);

// Попап с картинкой
const popupPhoto = new PopupWithImage(".popup_content_image");

// Создание экземпляра с карточкой
const handleCardClick = (data) => {
  popupPhoto.open(data);
};

function createCard(item) {
  const card = new Card(
    item,
    ".cards-template",
    currentUserId,
    handleCardClick,
    // handleTrashClick,
    // addCardLike,
    // deleteCardLike
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const callbackSubmitFormCard = (data) => {
  return api
    .addNewCard(data)
    .then((items) => {
      const newCardElement = createCard(items);
      sectionCards.addItemPrep(newCardElement);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Отрисовка массива карточек на странице
const sectionCards = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      sectionCards.addItem(cardElement);
    },
  },
  ".elements"
);

// sectionCards.renderItems();

// Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  // userPicSelector: "."
});

// Создание формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile-edit",
  callbackSubmitFormProfile,
});

// Добавление новой карты из формы
const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_new-place",
  callbackSubmitFormCard,
});

// Коллбеки для 1. создания формы редактирования профиля 2. добавления новой карты
const callbackSubmitFormProfile = (data) => {
  userProfile.setUserInfo(data);
  popupEditProfile.close();
};



// Промис
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([items, user]) => {
    currentUserId = user._id;
    sectionCards.renderItems(items);
    // userProfile.setUserAvatar(user);
    // userProfile.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

// Слушатели:
buttonOpenEdit.addEventListener("click", () => {
  const dataUserProfile = userProfile.getUserInfo();
  nameInputEdit.value = dataUserProfile.name;
  jobInputEdit.value = dataUserProfile.job;

  validatorEditCardForm.resetForm();
  popupEditProfile.open();
});

buttonAdd.addEventListener("click", () => {
  validatorAddCardForm.resetForm();
  popupNewPlace.open();
});

popupPhoto.setEventListeners();
popupNewPlace.setEventListeners();
popupEditProfile.setEventListeners();

// Включение валидации
validatorAddCardForm.enableValidation();
validatorEditCardForm.enableValidation();
// validatorEditProfileAvatar.enableValidation();
