import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import {
  profileName,
  profileProfession,
  profileForm,
  addPlaceForm,
  inputName,
  inputAboutme,
  imagePreview,
  validationParams,
  cardListSection,
  galleryCardsInputs,
} from "../utils/constants.js";

const addPlaceFormValidator = new FormValidation(
  validationParams,
  addPlaceForm
);

const profileFormValidator = new FormValidation(validationParams, profileForm);

function cardRender(data) {
  const card = new Card(data, (imageData) => {
    const popupWithImage = new PopupWithImage(imagePreview, imageData);
    popupWithImage.openPopup();
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const renderArrayElements = new Section(
  {
    data: galleryCardsInputs,
    renderer: (data) => {
      //   const card = new Card(data, (imageData) => {
      //   const popupWithImage = new PopupWithImage (imagePreview, imageData);
      //   popupWithImage.openPopup();
      // });
      //   const cardElement = card.generateCard();
      const cardElement = cardRender(data);
      renderArrayElements.setItemAppend(cardElement);
    },
  },
  cardListSection
);

const submitAddPlaceForm = new PopupWithForm(addPlaceForm, (data) => {
  data["name"] = data["title"];
  data["link"] = data["image-link"];
  delete data["title"];
  delete data["image-link"];
  // const card = new Card(data, (imageData) => {
  //   const popupWithImage = new PopupWithImage (imagePreview, imageData);
  //     popupWithImage.openPopup();
  // });
  // const cardElement = card.generateCard();
  const cardElement = cardRender(data);
  renderArrayElements.setItemPrepend(cardElement);
});

const userInfo = new UserInfo(profileName, profileProfession);

const submitProfileForm = new PopupWithForm(profileForm, (data) => {
  const inputName = data["name"];
  const inputAboutme = data["about-me"];
  //const userInfo = new UserInfo (inputName, inputAboutme);
  userInfo.setUserInfo(inputName, inputAboutme);
});

renderArrayElements.renderItems();
addPlaceFormValidator.enableValidation();
profileFormValidator.enableValidation();
submitAddPlaceForm.setEventListeners();
submitProfileForm.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  submitAddPlaceForm.open();
  addPlaceFormValidator.toggleButtonState();
  addPlaceFormValidator.resetValidity();
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    //const userInfo = new UserInfo (profileName, profileProfession);
    const getUserInfo = userInfo.getUserInfo();
    inputName.value = getUserInfo.profileName;
    inputAboutme.value = getUserInfo.profileProfession;
    submitProfileForm.open();
    profileFormValidator.toggleButtonState();
    profileFormValidator.resetValidity();
  });
