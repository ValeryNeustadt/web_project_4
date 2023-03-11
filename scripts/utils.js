import { resetValidityOnStart, disableSubmitButtonOnStart } from "./index.js";

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const profileForm = document.querySelector("#popup__profileform");
const inputName = document.querySelector("#profileform__name");
const inputAboutme = document.querySelector("#profileform__about-me");

const addPlaceForm = document.querySelector("#popup__addplaceform");

function addListeners() {
    document
      .querySelector(".profile__edit-button")
      .addEventListener("click", openProfileForm);
    document
      .querySelector(".profile__add-button")
      .addEventListener("click", openAddPlaceForm);
  
    const popups = document.querySelectorAll('.popup')
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt
                  .target
                  .classList
                  .contains('popup_opened')
                ) {
              closePopup(popup)
            }
            if (evt
                  .target
                  .classList
                  .contains('popup__close-button')
                ) {
              closePopup(popup)
            }
        })
    })
  

  }
  
  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }
  
  function openPopup(popup) {
    popup
      .classList
      .add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    
  }
  
  function closePopup(popup) {
    popup
      .classList
      .remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
  
  function openProfileForm() {
    openPopup(profileForm);
    inputName.value = profileName.textContent;
    inputAboutme.value = profileProfession.textContent;
    disableSubmitButtonOnStart();
    resetValidityOnStart();
  }
  
  function openAddPlaceForm() {
    openPopup(addPlaceForm);
    disableSubmitButtonOnStart();
    resetValidityOnStart();
  }


export { 
    addListeners, 
    profileForm, 
    addPlaceForm,
    closePopup,
    profileName,
    inputName,
    profileProfession,
    inputAboutme,
    openPopup
}