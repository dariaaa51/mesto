import "./index.css";

import {
  buttonOpenEdit,
  buttonAdd,
  nameInputEdit,
  jobInputEdit,
  popupEdit,
  formAddPopup,
  formEditPopup,
  popupEditAvatar,
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
import { Api } from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";

let currentUserId;

// Объект для передачи данных серверу
const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61/",
  "b0832912-0612-451f-a255-c3171e888069"
);

// ---------------------------------------------------------
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

// ---------------------------------------------------------
// Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
});

// ---------------------------------------------------------
// Создание карточек
function createCard(item) {
  const card = new Card(
    item,
    ".cards-template",
    currentUserId,
    handleCardClick,
    handleTrashClick,
    makeCardLike,
    deleteCardLike
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// ---------------------------------------------------------
// Создание формы редактирования профиля
const callbackFormProfile = (data) => {
  const dataUserProfile = userProfile.getUserInfo();
  popupEditProfile.setInputValues(dataUserProfile);

  return api
    .sendUserInfoApi(data)
    .then((items) => {
      userProfile.setUserInfo(items);
    })
    .catch((err) => {
      console.log(`При редактировании профиля возникла ошибка - ${err}`);
    });
};

const popupEditProfile = new PopupWithForm(
  ".popup_profile-edit",
  callbackFormProfile
);

popupEditProfile.setEventListeners();

// ---------------------------------------------------------
// Добавление новой карты из формы
const callbackFormCard = (data) => {
  return api
    .addNewCard(data)
    .then((items) => {
      const newCardElement = createCard(items);
      sectionCards.addItemPrepend(newCardElement);
    })
    .catch((err) => {
      console.log(`При добавлении кароточки возникла ошибка - ${err}`);
    });
};

const popupNewPlace = new PopupWithForm(".popup_new-place", callbackFormCard);

popupNewPlace.setEventListeners();

// ---------------------------------------------------------
// Добавление лайка
const makeCardLike = (card) => {
  return api
    .putLike(card.getCardId())
    .then(({ likes }) => {
      card.updateLike(likes);
    })
    .catch((err) => {
      console.log(`При установке лайка возникла ошибка - ${err}`);
    });
};

// Удаление лайка
const deleteCardLike = (card) => {
  return api
    .deleteLike(card.getCardId())
    .then(({ likes }) => {
      card.updateLike(likes);
    })
    .catch((err) => {
      console.log(`При удалении лайка карточки возникла ошибка - ${err}`);
    });
};

// ---------------------------------------------------------
// Удаление карточки
const handleCardFormDelete = (cardDeleted) => {
  return api
    .deleteCard(cardDeleted.getCardId())
    .then(() => {
      cardDeleted.deleteCard();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(`При удалении карточки возникла ошибка - ${err}`);
    });
};

const popupDelete = new PopupWithSubmit(
  ".popup_delete-card",
  handleCardFormDelete
);

const handleTrashClick = (cardDeleted) => {
  popupDelete.open(cardDeleted);
};

popupDelete.setEventListeners();

// ---------------------------------------------------------
// Смена аватара
const callbackFormAvatar = (picture) => {
  return api
    .setAvatar(picture)
    .then((items) => {
      userProfile.setUserAvatar(items);
    })
    .catch((err) => {
      console.log(`При смене аватара возникла ошибка - ${err}`);
    });
};

const popupChangeAvatar = new PopupWithForm(
  ".popup_new-avatar",
  callbackFormAvatar
);

popupChangeAvatar.setEventListeners();

// ---------------------------------------------------------
// Валидация
const validatorAddCardForm = new FormValidator(config, formAddPopup);
validatorAddCardForm.enableValidation();

const validatorEditCardForm = new FormValidator(config, formEditPopup);
validatorEditCardForm.enableValidation();

// const validatorEditProfileAvatar = new FormValidator(config, formEditAvatar);
// validatorEditProfileAvatar.enableValidation();

// ---------------------------------------------------------
// Попап с картинкой
const popupPhoto = new PopupWithImage(".popup_content_image");

const handleCardClick = (link, name) => {
  popupPhoto.open(link, name);
};

popupPhoto.setEventListeners();

// ---------------------------------------------------------
// Промис
Promise.all([api.getCardsApi(), api.getUserInfoApi()])
  .then(([items, user]) => {
    currentUserId = user._id;
    sectionCards.renderItems(items);
    userProfile.setUserAvatar(user);
    userProfile.setUserInfo(user);
  })
  .catch((err) => {
    console.log(`Возникла глобальная ошибка - ${err}`);
  });
  
// ---------------------------------------------------------
// Слушатели:
// Кнопка редактирования
buttonOpenEdit.addEventListener("click", () => {
  const dataUserProfile = userProfile.getUserInfo();
  popupEditProfile.setInputValues(dataUserProfile);
  nameInputEdit.value = dataUserProfile.name;
  jobInputEdit.value = dataUserProfile.job;
  validatorEditCardForm.resetForm();
  popupEditProfile.open();
});

// Кнопка добавления нового места
buttonAdd.addEventListener("click", () => {
  // formAddPopup.resetForm();
  validatorAddCardForm.resetForm();
  popupNewPlace.open();
});

// Кнопка смены аватара
popupEditAvatar.addEventListener("click", () => {
  popupChangeAvatar.open();
  // validatorEditProfileAvatar.resetForm();
});








