// Кнопки открытия попапов
export const buttonOpenEdit = document.querySelector(
  ".profile__button_type_edit"
);
export const buttonAdd = document.querySelector(".profile__button_type_add");

// Редактировать профиль
export const nameInputEdit = document.querySelector("#popupNameInput");
export const jobInputEdit = document.querySelector("#popupJobInput");
export const popupEdit = document.querySelector("#editPopup");
export const formEditPopup = document.querySelector("#editForm");

// Аватарка
export const formEditAvatar = document.querySelector("#formAvatarPopup");

// Добавить место
export const formAddPopup = document.querySelector("#addForm");
export const popupAdd = document.querySelector("#addPopup");

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inputErrorClass: "popup_input_type_error",
  errorClass: "popup__input-error_is-active",
};
