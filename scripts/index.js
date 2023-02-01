// Редактировать карточку
const buttonOpenEdit = document.querySelector(".profile__button_type_edit");
const popupEdit = document.querySelector("#editPopup");
const buttonCloseEdit = document.querySelector("#closeEditPopup");
const profileNameEdit = document.querySelector(".profile__name");
const profileJobEdit = document.querySelector(".profile__description");
const editFormEdit = document.querySelector("#editForm");
const nameInputEdit = document.querySelector("#popupNameInput");
const jobInputEdit = document.querySelector("#popupJobInput");

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
const photoCaption = imagePopup.querySelector(".popup__image-caption");
const photoWindow = imagePopup.querySelector(".popup__image");

// Закрытие попапа по overlay
function closePopupWithClick(popup) {
  const openedPopup = document.querySelector(".popup_opened");
  openedPopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(openedPopup);
    }
  });
}

// Закрытие попапа по esc
function closePopupWithEsc(event) {
  event.preventDefault();
  if (event.key === "Escape" || event.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keyup", closePopupWithEsc);
  closePopupWithClick(popup);
}

function openEditPopup() {
  openPopup(popupEdit);
  nameInputEdit.value = profileNameEdit.textContent;
  jobInputEdit.value = profileJobEdit.textContent;
}

buttonOpenEdit.addEventListener("click", openEditPopup);

function closeEditPopup() {
  closePopup(popupEdit);

  document.removeEventListener("keyup", closePopupWithEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

buttonCloseEdit.addEventListener("click", closeEditPopup);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEdit.textContent = `${nameInputEdit.value}`;
  profileJobEdit.textContent = `${jobInputEdit.value}`;
  closeEditPopup();
}

editFormEdit.addEventListener("submit", handleProfileFormSubmit);

function openAddPopup() {
  openPopup(popupAdd);
}

buttonAdd.addEventListener("click", openAddPopup);

function closeAddPopup() {
  closePopup(popupAdd);
}

buttonCloseAdd.addEventListener("click", closeAddPopup);

function openImagePopup(name, link) {
  openPopup(imagePopup);

  photoCaption.textContent = name;
  photoWindow.src = link;
  photoWindow.alt = name;
}

initialElements.forEach((element) => addCard(element.name, element.link));

function createCard(name, link) {
  const template = elementTemplate.content;
  const cardElement = template.cloneNode(true);
  const elementPicture = cardElement.querySelector(".element__picture");

  cardElement.querySelector(".element__title").textContent = name;
  elementPicture.src = link;
  elementPicture.alt = name;

   // Лайк на картинках
  elementPicture.addEventListener("click", () => {
    openImagePopup(name, link);
  });
  const like = cardElement.querySelector(".element__like");
  like.addEventListener("click", (e) => {
    like.classList.toggle("element__like_clicked");
  });

  const deleteButton = cardElement.querySelector(".element__button-delete");

  deleteButton.addEventListener("click", () => {
    const listItem = deleteButton.closest(".element");
    listItem.remove();
  });
  return cardElement;
}

function addCard(name, link) {
  const newElement = createCard(name, link);
  elements.prepend(newElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newHeaderValue = `${nameInputAdd.value}`;
  const newImageLink = `${jobInputAdd.value}`;
  addCard(newHeaderValue, newImageLink);
  closeAddPopup();

  evt.target.reset();
}

function closeImagePopup(evt) {
  evt.preventDefault();

  closePopup(imagePopup);
}
closeImagePopupButton.addEventListener("click", closeImagePopup);

editFormAdd.addEventListener("submit", handleAddFormSubmit);

