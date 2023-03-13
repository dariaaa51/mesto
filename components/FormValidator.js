class FormValidator {
  constructor(config, formName) {
    this._config = config;
    this._formName = formName;

    this._inputList = Array.from(
      this._formName.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formName.querySelector(
      this._config.submitButtonSelector
    );
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

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement, rest);
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, rest);
        this._toggleButtonState();
      });
    });
  }

  resetForm() {
    const { inputSelector, submitButtonSelector, ...rest } = this._config;
    this._formName.reset();

    this._inputList.forEach((input) => {
      this._hideErrorMessage(input, rest);
      this._toggleButtonState();
    });
  }

  enableValidation = () => {
    const { formSelector, ...rest } = this._config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, rest);
    });
  };

  // Функция обходит массив полей и отвечает на вопрос:
  // «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
  _hasInvalidInput = () => {
    return this._inputList.some((item) => {
      return !item.validity.valid;
    });
  };

  // Дизейбл кнопки сабмита
  _disableSubmitButton() {
    this._buttonElement.setAttribute("disabled", true);
  }

  //  функция которая блокирует кнопку отправить
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._buttonElement.disabled = false;
    }
  };
}

export { FormValidator };
