const showError = (props) => {
    const { inputItem, inputErrorClass, inputSelector, errorClass, formSelector} = props;   
    inputItem.classList.add(inputErrorClass);
    const errorMessage = document.querySelector(`${inputSelector}-${inputItem.name}-error`);
    errorMessage.textContent = inputItem.validationMessage;
    errorMessage.classList.add(errorClass); 
}

// export const resetValidity = (props) => {
//     const {formSelector, inputSelector, errorClass} = props;
//     const form = document.querySelector(formSelector); 
//     const inputs = form.querySelectorAll(inputSelector)
//     inputs.forEach((inputItem) => {
//         const errorMessage = document.querySelector(`${inputSelector}_${inputItem.name}_error`);
//         errorMessage.classList.remove(errorClass);
//     });
    
// }


const hideError = (props) => {
    const {inputItem, inputErrorClass, inputSelector, errorClass} = props;
    inputItem.classList.remove(inputErrorClass);
    const errorMessage = document.querySelector(`${inputSelector}-${inputItem.name}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(errorClass);
}


const hasInvalidInput = (props) => {
    const { formToCheck, inputSelector } = props;
    const inputs = Array.from(formToCheck.querySelectorAll(inputSelector));
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  };

const toggleButtonState = (props) => {
    const { formSelector, inputItem, inputSelector, inactiveButtonClass, submitButtonSelector } = props;
    const formToCheck = inputItem.closest(formSelector);
    const buttonElement = formToCheck.querySelector(submitButtonSelector);
    if (hasInvalidInput({ formToCheck, inputSelector })) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

const checkValidity = (inputItem) => {
    if (!inputItem.validity.valid) {
        return false;
      } else {
        return true;
      }
 }

const enableValidation = (props) => {
    const {formSelector, inputSelector, inputErrorClass, errorClass, inactiveButtonClass, submitButtonSelector} = props;
    
    if (formSelector) {
        const form = document.querySelector(formSelector);              
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });     
        const inputs = document.querySelectorAll(inputSelector);        
        inputs.forEach((inputItem) => {
            inputItem.addEventListener("input", () => {
            const isValid = checkValidity(inputItem);
            if(isValid) {
                hideError({ inputItem, inputErrorClass, inputSelector, errorClass, inactiveButtonClass, submitButtonSelector, formSelector
                });
                toggleButtonState({ formSelector, inputItem, inputSelector, submitButtonSelector, inactiveButtonClass })
            } else {;
                showError({ inputItem, inputErrorClass, inputSelector, errorClass, inactiveButtonClass, submitButtonSelector, formSelector
                });
                toggleButtonState({ formSelector, inputItem, inputSelector, submitButtonSelector, inactiveButtonClass })
            }
        });
    });
    }
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  }); 


