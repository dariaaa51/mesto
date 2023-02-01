const hideErrorMessage = (formElement, inputElement, config) => {
    //Убрать спан с ошибкой под инпутом
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);

    errorElement.textContent = ''
}

const showErrorMessage = (formElement, inputElement, config) => {
    //Добавить спан с ошибкой под инпутом
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);

    errorElement.textContent = inputElement.validationMessage;
}

// Функция проверяет formInput на корректность введённых данных и вызывает hideError и showError
const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
        hideErrorMessage(formElement, inputElement, config);
    }
    else {
        showErrorMessage(formElement, inputElement, config);
    }
}

// Изменить способ добавления слушателей событий форме и её полям.
const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig} = config;

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement);
            })
        });
    }

const enableValidation = (config) => {
    const { formSelector, ...restConfig} = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
};

// Функция обходит массив полей и отвечает на вопрос:
// «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
function hasInvalidInput(inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
 }
 

  //  функция которая блокирует кнопку отправить
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    }
    else {
        buttonElement.disabled = false;
    }
}

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inputErrorClass: 'popup_input_type_error',
    errorClass: 'popup__input-error_is-active'    
}

enableValidation(config);