import {
  Card,
} from "./Card.js";

import {     
  openPopup,
  closePopup,
} from "./utils.js";

import { 
  FormValidation,
} from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession")
const profileForm = document.querySelector("#popup__profileform");
const inputName = document.querySelector("#profileform__name");
const inputAboutme = document.querySelector("#profileform__about-me");
const addPlaceForm = document.querySelector("#popup__addplaceform");

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

const addPlaceFormValidator = new FormValidation(validationParams, addPlaceForm);
const profileFormValidator = new FormValidation(validationParams, profileForm);

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

function addListeners() {
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
  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", openProfileForm);
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", openAddPlaceForm);
  document
    .querySelector("#addplaceform")
    .addEventListener("submit", submitAddPlaceForm);
  document
    .querySelector("#profileform")
    .addEventListener("submit", submitProfileForm);
}
  
function openProfileForm() {
  profileFormValidator.enableValidation();
  openPopup(profileForm);
  inputName.value = profileName.textContent;
  inputAboutme.value = profileProfession.textContent;
  profileFormValidator.disableSubmitButton();
  profileFormValidator.resetValidity();
}

function openAddPlaceForm() {
  addPlaceFormValidator.enableValidation();
  openPopup(addPlaceForm);
  addPlaceFormValidator.disableSubmitButton();
  addPlaceFormValidator.resetValidity();
}

renderArrayElements(galleryCardsInputs);
addListeners();

