export const validationParams = {
    formSelector: ".popup__form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}

const resetValidity = (props) => {
    const {
        formSelector, 
        inputSelector, 
        errorClass, 
        inputErrorClass
    } = props;
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        const inputs = form.querySelectorAll(inputSelector)
        inputs.forEach((inputItem) => {
            const error = document.querySelector(`${inputSelector}-${inputItem.name}-error`);
            if (inputItem.validity.valid) {
                const errorMessage = document.querySelector(`${inputSelector}-${inputItem.name}-error`);
                errorMessage.classList.remove(errorClass); 
                inputItem.classList.remove(inputErrorClass);
            }
        });
    });
}

const disableSubmitButton = (props) => {
    const {
        formSelector, 
        inputSelector,
        inactiveButtonClass, 
        submitButtonSelector
    } = props; 
    
    const forms =  Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        const inputs = form.querySelectorAll(inputSelector);
        inputs.forEach((inputItem) => {
            const formToCheck = inputItem.closest(formSelector);
            const buttonElement = formToCheck.querySelector(submitButtonSelector);
            toggleButtonState({
                inactiveButtonClass, 
                buttonElement,
                inputs
            });
        });
    });
}

const toggleButtonState = (props) => {
    const {
        inactiveButtonClass, 
        buttonElement,
        inputs
    } = props;
            if (hasInvalidInput({inputs})) {
                buttonElement.classList.add(inactiveButtonClass);
                buttonElement.disabled = true;
            } else {
                buttonElement.classList.remove(inactiveButtonClass);
                buttonElement.disabled = false;  
            }
}

const hasInvalidInput = (props) => {  
    const {   
        inputs  
    } = props;  
    const inputsArray = Array.from(inputs);  
    return inputsArray.some((input) => {  
      return !input.validity.valid;  
    });  

} 

const showError = (props) => {
    const { 
        inputItem, 
        inputErrorClass, 
        inputSelector, 
        errorClass
    } = props;   
    inputItem.classList.add(inputErrorClass);
    const errorMessage = document.querySelector(`${inputSelector}-${inputItem.name}-error`);
    errorMessage.textContent = inputItem.validationMessage;
    errorMessage.classList.add(errorClass);
}

const hideError = (props) => {
    const {
        inputItem, 
        inputErrorClass, 
        inputSelector, 
        errorClass
    } = props;
    inputItem.classList.remove(inputErrorClass);
    const errorMessage = document.querySelector(`${inputSelector}-${inputItem.name}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(errorClass);
}

const checkValidity = (inputItem) => {
    if (!inputItem.validity.valid) {
        return false;
    } else {
        return true;
    }
 }

const enableValidation = (props) => {
    const {
        formSelector, 
        inputSelector, 
        inputErrorClass, 
        errorClass, 
        inactiveButtonClass, 
        submitButtonSelector
    } = props;
    if (formSelector) {
        const forms =  Array.from(document.querySelectorAll(formSelector));
        forms.forEach((form) => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
            });
            const buttonElement = form.querySelector(submitButtonSelector);
            const inputs = form.querySelectorAll(inputSelector);       
            inputs.forEach((inputItem) => {
                inputItem.addEventListener("input", () => {
                    const isValid = checkValidity(inputItem);
                    toggleButtonState({ 
                        inactiveButtonClass, 
                        buttonElement,
                        inputs,

                    });
                    if(isValid) {
                        hideError({ 
                            inputItem, 
                            inputErrorClass, 
                            inputSelector, 
                            errorClass
                        });
                    } else {
                        showError({ 
                            inputItem, 
                            inputErrorClass, 
                            inputSelector, 
                            errorClass
                        });
                    }
                });
            });


        });     
    }
}

enableValidation(validationParams); 

export function disableSubmitButtonOnStart() {
    disableSubmitButton(validationParams);
}

export function resetValidityOnStart () {
    resetValidity(validationParams); 
}