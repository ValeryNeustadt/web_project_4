import  {restartValidation, resetValidityStart} from "./validate.js";

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const profileForm = document.querySelector("#popup__profileform");
const inputName = document.querySelector("#profileform__name");
const inputAboutme = document.querySelector("#profileform__about-me");

const addPlaceForm = document.querySelector("#popup__addplaceform");
const addPlaceFormTitle = document.querySelector("#addplaceform__title");
const addPlaceFormImageLink = document.querySelector("#addplaceform__image-link");

const imagePreview = document.querySelector("#imagepreview");
const popupImageContent = document.querySelector(".popup__image-content");
const popupImageHeader = document.querySelector(".popup__image-header");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");

const submitButtonProfileForm = document.querySelector("#profileform__submit-button");
const submitButtonAddPlaceForm = document.querySelector("#addplaceform__submit-button");

const formAddPlace = document.querySelector("#addplaceform");
const formProfile = document.querySelector("#profileform");

const galleryElements = document.querySelector('.gallery__elements');
const galleryTemplate = document.querySelector('#gallery').content;

const galleryCardsInputs = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


galleryCardsInputs.forEach(element => {
  galleryElements.append(createElement(element));
});

addListeners();

function addListeners() {
  editButton.addEventListener("click", openProfileForm);
  addButton.addEventListener("click", openAddPlaceForm);
//Thanks!
  const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
          }
          if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
          }
      })
  })
  formAddPlace.addEventListener("submit", submitAddPlaceForm);
  formProfile.addEventListener("submit", submitProfileForm);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened'); // find the opened popup
    closePopup(openedPopup); // close the opened popup with `closePopup`
  }
}

function createElement(element) {
  const galleryElement = galleryTemplate.querySelector('.element').cloneNode(true);
  galleryElement.querySelector('.element__text').textContent = element.name;

  const elementPhoto = galleryElement.querySelector('.element__photo');
  elementPhoto.src = element.link;
  elementPhoto.alt = `Photo of ${element.name}`;

  elementPhoto.addEventListener('click', () => {
    popupImageContent.setAttribute("src", `${element.link}`);
    popupImageContent.setAttribute("alt", `Photo of ${element.name}`);
    popupImageHeader.textContent = element.name;
    openPopup(imagePreview);
  
  })

  const trashButton = galleryElement.querySelector('.element__trash-button');
  trashButton.addEventListener("click", function () {
    galleryElement.remove();
  });

  const likeButton = galleryElement.querySelector('.element__button-like');
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__button-like_active");
  });

  return galleryElement;
}

function addGalleryElementContent() {
  const newObjectGallery = new Object();
  newObjectGallery.name = addPlaceFormTitle.value;
  newObjectGallery.link = addPlaceFormImageLink.value;
  galleryElements.prepend(createElement(newObjectGallery));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  if(!popup.querySelector(".popup__image-content")) {
    return popup.querySelector(".popup__form").reset(); 
  };
}

function openProfileForm() {
  openPopup(profileForm);
  inputName.value = profileName.textContent;
  inputAboutme.value = profileProfession.textContent;
  submitButtonProfileForm.disabled = true;
  resetValidityStart();
}

function openAddPlaceForm() {
  openPopup(addPlaceForm);
  resetValidityStart();
}

function submitAddPlaceForm(event) {
  event.preventDefault();
  addGalleryElementContent();
  closePopup(addPlaceForm);
  restartValidation();
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputAboutme.value;
  closePopup(profileForm);
  restartValidation();
}