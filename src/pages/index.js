import "../pages/index.css";

//The like button should not move to top when the text appears. Please take a look at the design
//I'm sorry, but I don't understand this point.
//I couldn't find information about what happens when the number of likes is zero.
//In the previous sprint, the "Like" button was on the same level as the name of the place.
//For me, this means that when a number changes from zero to one,
//it should move up and free up space for the counter.

import { Card } from "../components/Card.js";
import { PopupConfirmDelete } from "../components/PopupConfirmDelete.js";
import { FormValidation } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import Api from "../utils/Api.js";

import {
  profileAddButton,
  profileEditButton,
  avatarEditButton,
  profileName,
  profileProfession,
  profileForm,
  addPlaceForm,
  avatarForm,
  inputName,
  inputAboutme,
  imagePreview,
  validationParams,
  cardListSection,
  confirmPopup,
  profileInfoSelector,
  userImageSelector,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  token: "02d6028b-ac6a-4274-af91-85096bd7453f",
});

const addPlaceFormValidator = new FormValidation(
  validationParams,
  addPlaceForm
);

const avatarFormValidator = new FormValidation(validationParams, avatarForm);

const profileFormValidator = new FormValidation(validationParams, profileForm);

const popupWithImage = new PopupWithImage(imagePreview);
popupWithImage.setEventListeners();

const confirmDeletePopup = new PopupConfirmDelete(confirmPopup);
confirmDeletePopup.setEventListeners();

function renderCard(data, userId) {
  const card = new Card(
    data,
    (imageData) => {
      popupWithImage.open(imageData);
    },
    (cardId) => {
      confirmDeletePopup.open();
      confirmDeletePopup.setAction(() => {
        api
          .deleteCard(cardId)
          .then((res) => {
            confirmDeletePopup.close();
            card.removeElement();
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
          .finally(() => {
            confirmDeletePopup.renderLoading(false);
          });

        confirmDeletePopup.renderLoading(true);
      });
    },
    (cardId) => {
      const checkLiked = card.isLiked();
      if (checkLiked) {
        api
          .deleteLikes(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      } else {
        api
          .addLikes(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      }
    },
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const userInfo = new UserInfo(
  profileName,
  profileProfession,
  profileInfoSelector,
  userImageSelector
);

let cardSection;

Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setUserImage(userData.avatar);
    console.log(cards);
    cardSection = new Section(
      {
        data: cards,
        renderer: (data) => {
          const cardElement = renderCard(data, userData._id);
          cardSection.appendItem(cardElement);
        },
      },
      cardListSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const addPlacePopup = new PopupWithForm(addPlaceForm, (data) => {
  const cardData = {
    name: data["title"],
    link: data["image-link"],
  };
  api
    .addCard(cardData.name, cardData.link)
    .then((post) => {
      const cardElement = renderCard(post, post.owner._id);
      cardSection.prependItem(cardElement);
      addPlacePopup.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      // addPlacePopup.renderLoading(false);
    })
    .finally(() => {
      addPlacePopup.renderLoading(false);
    });
  addPlacePopup.renderLoading(true);
});

const profilePopup = new PopupWithForm(profileForm, (data) => {
  const inputName = data["name"];
  const inputAboutMe = data["about-me"];
  api
    .setUserData(inputName, inputAboutMe)
    .then((post) => {
      userInfo.setUserInfo(post.name, post.about, post._id);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      // profilePopup.renderLoading(false);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
  profilePopup.renderLoading(true);
});

const updateAvatarPopup = new PopupWithForm(avatarForm, (data) => {
  const imageLink = data["image-link"];
  api
    .setUserAvatar(imageLink)
    .then((post) => {
      userInfo.setUserImage(imageLink);
      updateAvatarPopup.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      // updateAvatarPopup.renderLoading(false);
    })
    .finally(() => {
      updateAvatarPopup.renderLoading(false);
    });
  updateAvatarPopup.renderLoading(true);
});

avatarFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();
profileFormValidator.enableValidation();
addPlacePopup.setEventListeners();
profilePopup.setEventListeners();
updateAvatarPopup.setEventListeners();

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

function handleEditAvatarButtonClick() {
  avatarFormValidator.toggleButtonState();
  avatarFormValidator.resetValidity();
  updateAvatarPopup.open();
}

profileAddButton.addEventListener("click", handleAddCardButtonClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
avatarEditButton.addEventListener("click", handleEditAvatarButtonClick);
