import "./index.css";

import {
  buttonOpenEdit,
  buttonAdd,
  nameInputEdit,
  jobInputEdit,
  popupEdit,
  editFormAdd,
  popupAdd,
  config,
  formEditProfilePhoto,
  buttonEditProfilePhoto,
} from "../utilits/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
// import { initialCards } from "../utilits/сards.js";
import { Api } from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";

// Объект для передачи данных серверу
const apiConnect = new Api({
  link: "https://mesto.nomoreparties.co/v1/cohort-61/",
  headers: {
    authorization: "b0832912-0612-451f-a255-c3171e888069",
    "Content-Type": "application/json",
  },
});

// API
// const apiConnect = new Api(api);

// Переменная  c ID пользователя
let currentUserId;

// Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
});

// Включение валидации(проверить названия форм и дивов)
const validatorAddCardForm = new FormValidator(config, popupAdd);
validatorAddCardForm.enableValidation();

const validatorEditCardForm = new FormValidator(config, popupEdit);
validatorEditCardForm.enableValidation();

// const validatorEditProfilePhoto = new FormValidator(
//   config,
//   formEditProfilePhoto
// );
// validatorEditProfilePhoto.enableValidation();

// Попап с картинкой
const popupPhoto = new PopupWithImage(".popup_content_image");
popupPhoto.setEventListeners();

// // Создание экземпляра с карточкой
// const handleCardClick = (data) => {
//   popupPhoto.open(data);
// };

// function createCard(item) {
//   const card = new Card(
//     {
//       data: item,
//       handleCardClick,
//     },
//     ".cards-template"
//   );

//   return card.generateCard();
// }

// name, link iz popupwithimage
const createCard = function (cardObject) {
  const cardItem = new Card(
    cardObject,
    "element-template",
    currentUserId,
    { cardId: cardObject._id, author: cardObject.owner._id },
    {
      handleZoomCard: (name, link) => {
        popupPhoto.open(name, link);
      },
      handleDeleteCard: (cardElement, cardId) => {
        popupSubmitDeleteCard.open(cardElement, cardId);
      },
      handleLikeCard: (cardId) => {
        apiConnect
          .likeCard(cardId)
          .then((res) => {
            cardItem.renderCardLike(res);
          })
          .catch((err) => {
            console.log(`Возникла ошибка - ${err} при лайке карточки`);
          });
      },
      handleDeleteLikeCard: (cardId) => {
        apiConnect
          .dislikeCard(cardId)
          .then((res) => {
            cardItem.renderCardLike(res);
          })
          .catch((err) => {
            console.log(`Возникла ошибка - ${err} при дизлайке карточки`);
          });
      },
    }
  );
  return cardItem.generateCard();
};

// Отрисовка массива карточек на странице
const sectionCards = new Section(
  {
    renderer: (cardObject) => {
      sectionCards.addItem(createCard(cardObject));
    },
  },
  ".elements"
);

// sectionCards.renderItems();

// Редактирование аватара
const popupEditAvatar = new PopupWithForm("#avatar-popup", {
  callbackFormSubmit: (userProfileData) => {
    popupEditAvatar.putSavingProcessText();
    apiConnect
      .setAvatar(userProfileData)
      .then((res) => {
        userProfile.setUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`При обновлении аватара возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditAvatar.returnSavingProcessText();
      });
  },
});
popupEditAvatar.setEventListeners();

// Создание формы редактирования профиля
const popupEditProfile = new PopupWithForm("#popupEdit", {
  callbackFormSubmit: (userProfileData) => {
    popupEditProfile.putSavingProcessText();
    apiConnect
      .sendUserInfo(userProfileData)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, userjob: res.about });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`При редактировании профиля возникла ошибка - ${err}`);
      })
      .finally(() => {
        popupEditProfile.returnSavingProcessText();
      });
  },
});
popupEditProfile.setEventListeners();

// Добавление новой карты из формы
const popupNewPlace = new PopupWithForm("#editPopup", {
  callbackFormSubmit: (formValues) => {
    popupNewPlace.putSavingProcessText();
    apiConnect
      .addNewCard({ name: formValues.name, link: formValues.link })
      .then((card) => {
        sectionCards.addItem(createCard(card));
        popupNewPlace.close();
      })
      .catch((err) => {
        console.log(`При добавлении новой карточки возникла ошибка - ${err}`);
      })
      .finally(() => {
        popupNewPlace.returnSavingProcessText();
      });
  },
});
popupNewPlace.setEventListeners();

// Объявление popup подтверждения удаления карточки
const popupSubmitDeleteCard = new PopupWithSubmit("#delete-card", {
  callbackNotice: (cardElement, cardId) => {
    apiConnect
      .deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupSubmitDeleteCard.close();
      })
      .catch((err) => {
        console.log(`При удалении карточки возникла ошибка - ${err}`);
      });
  },
});
popupSubmitDeleteCard.setEventListeners();

// Слушатель события для кнопки добавления карточки
buttonAdd.addEventListener("click", () => {
  validatorAddCardForm.resetForm();
  popupNewPlace.open();
});

// Слушатель события для открытия формы редактирования
buttonOpenEdit.addEventListener("click", () => {
  const dataUserProfile = userProfile.getUserInfo();
  nameInputEdit.value = dataUserProfile.name;
  jobInputEdit.value = dataUserProfile.job;

  validatorEditCardForm.resetForm();
  popupEditProfile.open();
});

// Слушатель события для кнопки изменения аватара
buttonEditProfilePhoto.addEventListener("click", () => {
  validatorEditProfilePhoto.resetForm();
  popupEditAvatar.open();
});

// Промис для положительных результатов запросов
Promise.all([apiConnect.getUserInfo(), apiConnect.getCards()])
  .then(([userProfileData, cardObject]) => {
    currentUserId = userProfileData._id;
    userProfile.setUserInfo({
      name: userProfileData.name,
      job: userProfileData.about,
    });
    sectionCards.renderItems(cardObject.reverse());
    userProfile.setUserAvatar(userProfileData.avatar);
  })
  .catch((err) => {
    console.log(`Возникла ошибка, ${err}`);
  });
