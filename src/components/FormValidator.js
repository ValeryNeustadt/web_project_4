export class FormValidation {
  constructor(validationParams, form) {
    this._formElement = form.querySelector(validationParams.formSelector); // "#popup__addplaceform" or "#popup__profileform"
    this._formSelector = validationParams.formSelector; //".popup__form",
    this._inputSelector = validationParams.inputSelector; //".form__input",
    this._submitButtonSelector = validationParams.submitButtonSelector; //".form__button",
    this._inactiveButtonClass = validationParams.inactiveButtonClass; //"form__button_disabled",
    this._inputErrorClass = validationParams.inputErrorClass; //"form__input_type_error",
    this._errorClass = validationParams.errorClass; //"form__error_visible",
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputs = this._formElement.querySelectorAll(this._inputSelector); //this variable need for  resetValidity() method and for this._inputsArray variable
    this._inputsArray = Array.from(this._inputs);
  }

  _showError(inputItem) {
    inputItem.classList.add(this._inputErrorClass);
    const errorMessage = this._formElement.querySelector(
      `${this._inputSelector}-${inputItem.name}-error`
    );
    errorMessage.textContent = inputItem.validationMessage;
    errorMessage.classList.add(this._errorClass);
  }

  _hideError(inputItem) {
    inputItem.classList.remove(this._inputErrorClass);
    const errorMessage = this._formElement.querySelector(
      `${this._inputSelector}-${inputItem.name}-error`
    );
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputsArray.some((input) => {
      return !input.validity.valid;
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListener();
  }

  resetValidity() {
    this._inputs.forEach((inputItem) => {
      //if (inputItem.validity.valid) {
      this._hideError(inputItem);
      //}
    });
  }

  _toggleInputError(inputItem) {
    if (inputItem.validity.valid) {
      this._hideError(inputItem);
    } else {
      this._showError(inputItem);
    }
  }

  _setEventListener() {
    this._inputs.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this.toggleButtonState();
        this._toggleInputError(inputItem);
      });
    });
  }
}
