class FormValidator {
  constructor(config, formName) {
    this._config = config;
    this._formName = formName;
  }

  _hideErrorMessage(inputElement, config) {
    //Убрать спан с ошибкой под инпутом
    const { inputErrorClass, errorClass } = config;
    const errorElement = this._formName.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);

    errorElement.textContent = "";
  }

  _showErrorMessage(inputElement, config) {
    //Добавить спан с ошибкой под инпутом
    const { inputErrorClass, errorClass } = config;
    const errorElement = this._formName.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);

    errorElement.textContent = inputElement.validationMessage;
  }

  // Функция проверяет formInput на корректность введённых данных и вызывает hideError и showError
  _checkInputValidity(inputElement, config) {
    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement, config);
    } else {
      this._showErrorMessage(inputElement, config);
    }
  }

  // Изменить способ добавления слушателей событий форме и её полям.
  _setEventListeners(formElement, config) {
    const { inputSelector, submitButtonSelector, ...rest } = config;
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });

    const inputList = Array.from(
      this._formName.querySelectorAll(inputSelector)
    );
    const buttonElement = this._formName.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement, rest);
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, rest);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  resetForm() {
    const { inputSelector, submitButtonSelector, ...rest } = this._config;
    this._formName.reset();
    const inputList = Array.from(
      this._formName.querySelectorAll(inputSelector)
    );
    inputList.forEach((input) => {
      this._hideErrorMessage(input, rest);
      const inputList = Array.from(
        this._formName.querySelectorAll(inputSelector)
      );
      const buttonElement = this._formName.querySelector(submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  enableValidation = (config) => {
    const { formSelector, ...rest } = this._config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, rest);
    });
  };

  // Функция обходит массив полей и отвечает на вопрос:
  // «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
  _hasInvalidInput(inputList) {
    return inputList.some((item) => {
      return !item.validity.valid;
    });
  }

  //  функция которая блокирует кнопку отправить
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }
}

export { FormValidator };
