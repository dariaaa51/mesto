// Редактировать карточку
const buttonOpenEdit = document.querySelector(".profile__button_type_edit");
const popupEdit = document.querySelector("#editPopup");
const buttonCloseEdit = document.querySelector("#closeEditPopup");
const profileNameEdit = document.querySelector(".profile__name");
const profileJobEdit = document.querySelector(".profile__description");
const editFormEdit = document.querySelector("#editForm");
const nameInputEdit = document.querySelector("#popupNameInput");
const jobInputEdit = document.querySelector("#popupJobInput");

function openEditPopup() {
  popupEdit.classList.add("popup_opened");
  nameInputEdit.value = profileNameEdit.textContent;
  jobInputEdit.value = profileJobEdit.textContent;
}

buttonOpenEdit.addEventListener("click", openEditPopup);

function closeEditPopup() {
  popupEdit.classList.remove("popup_opened");
}

buttonCloseEdit.addEventListener("click", closeEditPopup);

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameEdit.textContent = `${nameInputEdit.value}`;
  profileJobEdit.textContent = `${jobInputEdit.value}`;
  closeEditPopup();
}

editFormEdit.addEventListener("submit", editFormSubmitHandler);

// Добавить карточку
const buttonAdd = document.querySelector(".profile__button_type_add");
const popupAdd = document.querySelector("#addPopup");
const buttonCloseAdd = document.querySelector("#closeAddPopup");
const editFormAdd = document.querySelector("#addForm");
const nameInputAdd = document.querySelector("#popupDesignationInput");
const jobInputAdd = document.querySelector("#popupPlaceInput");
const elementTemplate = document.querySelector("#element-template");
const elements = document.querySelector(".elements");
const imagePopup = document.querySelector(".popup_content_image");
const closeImagePopupButton = document.querySelector("#figureClosed");

function openAddPopup() {
  popupAdd.classList.add("popup_opened");
}

buttonAdd.addEventListener("click", openAddPopup);

function closeAddPopup() {
  popupAdd.classList.remove("popup_opened");
}

buttonCloseAdd.addEventListener("click", closeAddPopup);

function openImagePopup(header, link) {
  imagePopup.classList.add("popup_opened");
  imagePopup.querySelector(".popup__image-caption").textContent = header;
  imagePopup.querySelector(".popup__image").src = link;
}

// Добавление фото
const initialElements = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialElements.forEach((element) => addCard(element.name, element.link));

function addCard(header, link) {
  const template = elementTemplate.content;
  const newElement = template.cloneNode(true);

  newElement.querySelector(".element__title").textContent = header;
  newElement.querySelector(".element__picture").src = link;
  newElement
    .querySelector(".element__picture")
    .addEventListener("click", () => {
      openImagePopup(header, link);
    });
  const like = newElement.querySelector(".element__like");
  newElement.querySelector(".element__like").addEventListener("click", (e) => {
    like.classList.toggle("element__like_clicked");
  });

  // const classes = Array.from(e.target.classList);
  // const liked = classes.find((el) => el === 'element__like_clicked');
  // if (liked) {
  //   e.target.classList.remove("element__like_clicked");
  //   return;
  // }
  // e.target.classList.add("element__like_clicked");
  const deleteButton = newElement.querySelector(".element__button-delete")
  
  elements.append(newElement);
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.remove();
  })
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newHeaderValue = `${nameInputAdd.value}`;
  const newImageLink = `${jobInputAdd.value}`;
  addCard(newHeaderValue, newImageLink);
  closeAddPopup();
}

function closeImagePopup(evt) {
  evt.preventDefault();
  imagePopup.classList.remove("popup_opened");
}
closeImagePopupButton.addEventListener("click", closeImagePopup);

editFormAdd.addEventListener("submit", addFormSubmitHandler);
