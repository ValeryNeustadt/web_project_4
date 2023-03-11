export class FormValidation {
    constructor (validationParams) {
        this._formSelector = validationParams.formSelector; //".popup__form",
        this._inputSelector = validationParams.inputSelector; //".form__input",
        this._submitButtonSelector = validationParams.submitButtonSelector; //".form__button",
        this._inactiveButtonClass = validationParams.inactiveButtonClass; //"form__button_disabled",
        this._inputErrorClass = validationParams.inputErrorClass; //"form__input_type_error",
        this._errorClass = validationParams.errorClass; //"form__error_visible",
    }
  
    _showError (inputItem) {
        inputItem.classList.add(this._inputErrorClass);
        const errorMessage = document.querySelector(`${this._inputSelector}-${inputItem.name}-error`);
        errorMessage.textContent = inputItem.validationMessage;
        errorMessage.classList.add(this._errorClass);
    }
  
    _hideError (inputItem) {
          inputItem.classList.remove(this._inputErrorClass);
          const errorMessage = document.querySelector(`${this._inputSelector}-${inputItem.name}-error`);
          errorMessage.textContent = "";
          errorMessage.classList.remove(this._errorClass);
      }
    
    _toggleButtonState (inputs, buttonElement) {
                if (
                  Array.from(inputs).some((input) => {
                return !input.validity.valid;
                 })
                ) {
                    buttonElement.classList.add(this._inactiveButtonClass);
                    buttonElement.disabled = true;
                } else {
                    buttonElement.classList.remove(this._inactiveButtonClass);
                    buttonElement.disabled = false;  
                }
    }
  
    _getForms () {
        const forms =  Array.from(document.querySelectorAll(this._formSelector));
        return forms;
    }
  
    enableValidation () {
        this._forms =  this._getForms();
        this._forms.forEach((form) => {
          this._form = form;
            form.addEventListener("submit", (e) => {
                e.preventDefault();
            }); 
            this._setEventListener ();
        });
    }
  
    resetValidity() {
        this._forms = this._getForms();
        this._forms.forEach((form) => {
        this._form = form;
        this._inputs = this._form.querySelectorAll(this._inputSelector);
        this._inputs.forEach((inputItem) => {
            document.querySelector(`${this._inputSelector}-${inputItem.name}-error`);
            if (inputItem.validity.valid) {
                this._errorMessage = document.querySelector(`${this._inputSelector}-${inputItem.name}-error`);
                this._errorMessage
                    .classList
                    .remove(this._errorClass); 
                inputItem
                    .classList
                    .remove(this._inputErrorClass);
            }
            }); 
        });  
    }
  
    disableSubmitButton () {
      this._forms = this._getForms();
      this._forms.forEach((form) => {
        this._form = form;
        const inputs = this._form.querySelectorAll(this._inputSelector);
        inputs.forEach((inputItem) => {
            this._formToCheck = inputItem.closest(this._formSelector);
            const buttonElement = this._formToCheck.querySelector(this._submitButtonSelector);
            this._toggleButtonState(inputs, buttonElement);
          });
        });
    }
  
    _toggleInputError (inputItem) {
      if(inputItem.validity.valid) {
          this._hideError(inputItem);
      } else {
          this._showError(inputItem);
      }
    }

    _setEventListener () {
      const buttonElement = this._form.querySelector(this._submitButtonSelector);
      const inputs = this._form.querySelectorAll(this._inputSelector); 
      inputs.forEach((inputItem) => {
            inputItem.addEventListener("input", () => {
                this._toggleButtonState(inputs, buttonElement);
                this._toggleInputError (inputItem);
                });
            });
    }
  
}