import {
  Card
} from "./Card.js";

import {     
  addListeners, 
  profileForm, 
  addPlaceForm,
  closePopup,
  profileName,
  inputName,
  profileProfession,
  inputAboutme
} from "./utils.js";

import { 
  FormValidation 
} from "./FormValidator.js";

const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
}

const galleryElements = document.querySelector('.gallery__elements');

const galleryCardsInputs = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const enableValidation = (validationParams) => {
  const Validation = new FormValidation(validationParams);
  Validation.enableValidation();  
}

const disableSubmitButton = (validationParams) => {
const  disableSubmit = new FormValidation(validationParams);
disableSubmit.disableSubmitButton();
}

function disableSubmitButtonOnStart() {
  disableSubmitButton(validationParams);
}  

const resetValidity = (validationParams) => {
  const  resetValidity = new FormValidation(validationParams);
  resetValidity.resetValidity();
}

function resetValidityOnStart () {
resetValidity(validationParams); 
}

function addGalleryElementContent() {
  const newObjectGallery = new Object();
  const addPlaceFormTitle = document.querySelector("#addplaceform__title");
  const addPlaceFormImageLink = document.querySelector("#addplaceform__image-link");
  
  newObjectGallery.name = addPlaceFormTitle.value;
  newObjectGallery.link = addPlaceFormImageLink.value;
  newObjectGallery.new = true; 

  renderOneElement(newObjectGallery);
}

const renderArrayElements = (galleryCardsInputs) => { 
  galleryCardsInputs.forEach((data) => {
    renderOneElement(data)
  });
}

const renderOneElement = (data) => {
  const card = new Card(data);
  const cardElement = card.generateCard();  
  if (data.new) {
    galleryElements.prepend(cardElement);
  } else {
    galleryElements.append(cardElement);
  }  
}

function submitAddPlaceForm(event) {
  event.preventDefault();
  addGalleryElementContent();
  closePopup(addPlaceForm);
  event
    .target
    .reset();
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputAboutme.value;
  closePopup(profileForm);
  event
    .target
    .reset();
}

document
  .querySelector("#addplaceform")
  .addEventListener("submit", submitAddPlaceForm);
document
  .querySelector("#profileform")
  .addEventListener("submit", submitProfileForm);


renderArrayElements(galleryCardsInputs);
addListeners();
enableValidation(validationParams); 

export {
  addGalleryElementContent,
  resetValidityOnStart,
  disableSubmitButtonOnStart,
}
