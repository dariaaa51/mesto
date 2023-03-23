import './index.css';

import { 
  buttonOpenEdit,
  buttonAdd,
  nameInputEdit,
  jobInputEdit,
  popupEdit,
  formAddPopup, 
  formEditPopup,
  popupAdd,
  config
} from "../utilits/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utilits/сards.js";
import { Api } from "../components/Api.js";

// Объект для передачи данных серверу
const apiConnect = new Api({
  link: "https://mesto.nomoreparties.co/v1/cohort-61/",
  headers: {
    authorization: "b0832912-0612-451f-a255-c3171e888069",
    "Content-Type": "application/json",
  },
});


// Включение валидации
const validatorAddCardForm = new FormValidator(config, formAddPopup);
validatorAddCardForm.enableValidation();

const validatorEditCardForm = new FormValidator(config, formEditPopup);
validatorEditCardForm.enableValidation();

// Попап с картинкой
const popupPhoto = new PopupWithImage(".popup_content_image");
popupPhoto.setEventListeners();

// Создание экземпляра с карточкой
const handleCardClick = (data) => {
  popupPhoto.open(data);
};

function createCard(item) {
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
      sectionCards.addItem(createCard(item))
    },
  },
  ".elements"
);

sectionCards.renderItems();

const callbackSubmitFormProfile = (data) => {
  userProfile.setUserInfo(data);
  popupEditProfile.close();
}

const callbackSubmitFormCard = (data) => {
  const newCardElement = createCard(data);
  sectionCards.addItem(newCardElement);
  popupNewPlace.close();
}

// Добавление новой карты из формы
const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_new-place",
  callbackSubmitFormCard
});

popupNewPlace.setEventListeners();

// Слушатель события
buttonAdd.addEventListener("click", () => {
  validatorAddCardForm.resetForm();
  popupNewPlace.open();
});

// Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
});

// Создание формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile-edit",
  callbackSubmitFormProfile
});
popupEditProfile.setEventListeners();

// Слушатель события открытия формы редактирования
buttonOpenEdit.addEventListener('click', () => {
  const dataUserProfile = userProfile.getUserInfo();
  nameInputEdit.value = dataUserProfile.name;
  jobInputEdit.value = dataUserProfile.job;

  validatorEditCardForm.resetForm()
  popupEditProfile.open();
}
)
