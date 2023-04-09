import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import {
  profileAddButton,
  profileEditButton,
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

const popupWithImage = new PopupWithImage(imagePreview);
popupWithImage.setEventListeners();

function renderCard(data) {
  const card = new Card(data, (imageData) => {
    // const popupWithImage = new PopupWithImage(imagePreview, imageData);
    popupWithImage.open(imageData);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardSection = new Section(
  {
    data: galleryCardsInputs,
    renderer: (data) => {
      //   const card = new Card(data, (imageData) => {
      //   const popupWithImage = new PopupWithImage (imagePreview, imageData);
      //   popupWithImage.openPopup();
      // });
      //   const cardElement = card.generateCard();
      const cardElement = renderCard(data);
      cardSection.appendItem(cardElement);
    },
  },
  cardListSection
);

const userInfo = new UserInfo(profileName, profileProfession);

const addPlacePopup = new PopupWithForm(addPlaceForm, (data) => {
  const cardData = {
    name: data["title"],
    link: data["image-link"],
  };
  // data["name"] = data["title"];
  // data["link"] = data["image-link"];
  // delete data["title"];
  // delete data["image-link"];
  // const card = new Card(data, (imageData) => {
  //   const popupWithImage = new PopupWithImage (imagePreview, imageData);
  //     popupWithImage.openPopup();
  // });
  // const cardElement = card.generateCard();

  const cardElement = renderCard(cardData);
  cardSection.prependItem(cardElement);
  addPlacePopup.close();
});

const profilePopup = new PopupWithForm(profileForm, (data) => {
  const inputName = data["name"];
  const inputAboutMe = data["about-me"];
  console.log(inputName);
  userInfo.setUserInfo(inputName, inputAboutMe);
  profilePopup.close();
  //const userInfo = new UserInfo (inputName, inputAboutme);
});

cardSection.renderItems();
addPlaceFormValidator.enableValidation();
profileFormValidator.enableValidation();
addPlacePopup.setEventListeners();
profilePopup.setEventListeners();

function handleAddCardButtonClick() {
  addPlaceFormValidator.toggleButtonState();
  addPlaceFormValidator.resetValidity();
  addPlacePopup.open();
}

function handleEditProfileButtonClick() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.profileName;
  inputAboutme.value = userData.profileProfession;
  profileFormValidator.toggleButtonState();
  profileFormValidator.resetValidity();
  profilePopup.open();
}

profileAddButton.addEventListener("click", handleAddCardButtonClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
