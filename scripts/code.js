const profileForm = document.querySelector("#profileform");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const inputName = document.querySelector("#profileform__name");
const inputAboutme = document.querySelector("#profileform__about-me");


const addPlaceForm = document.querySelector("#addplaceform");
let addPlaceFormTitle = document.querySelector("#addplaceform__title");
let addPlaceFormImageLink = document.querySelector("#addplaceform__image-link");

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


addListeners();

const galleryElements = document.querySelector('.gallery__elements');
const galleryTemplate = document.querySelector('#gallery').content;


function createElement(element) {
  const galleryElement = galleryTemplate.querySelector('.element').cloneNode(true);
  galleryElement.querySelector('.element__text').textContent = element.name;

  const elementPhoto = galleryElement.querySelector('.element__photo');
  elementPhoto.src = element.link;
  elementPhoto.alt = `Photo of ${element.name}`;

  elementPhoto.addEventListener('click', () => {
    galleryElement.querySelector('.element__photo').src = element.link;
    popupImageContent.setAttribute("src", `${element.link}`);
    popupImageHeader.textContent = element.name;
    imagePreview.classList.remove('popup_closed');
    imagePreview.classList.add('popup_opened');

  })

  const trashButton = galleryElement.querySelector('.element__trash-button');
  trashButton.addEventListener("click", function () {
    galleryElement.remove();
  });

  const likeButton = galleryElement.querySelector('.element__button-like');
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__button-like_active");
  });

  console.log(galleryElement);
  return galleryElement;
}

galleryCardsInputs.forEach(element => {
  galleryElements.append(createElement(element));
});

function addGalleryElementContent() {
  let newObjectGallery = new Object();
  newObjectGallery.name = addPlaceFormTitle.value;
  newObjectGallery.link = addPlaceFormImageLink.value;
  galleryElements.prepend(createElement(newObjectGallery));
}

function addListeners() {
  editButton.addEventListener("click", openProfileForm);
  addButton.addEventListener("click", openAddPlaceForm);

  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

  formAddPlace.addEventListener("submit", submitAddPlaceForm);
  formProfile.addEventListener("submit", submitProfileForm);
}

function closePopup(popup) {
  popup.classList.add('popup_closed');
  popup.classList.remove('popup_opened');
}

function openProfileForm() {
  profileForm.classList.remove('popup_closed');
  profileForm.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAboutme.value = profileProfession.textContent;
}

function openAddPlaceForm() {
  addPlaceForm.classList.remove('popup_closed');
  addPlaceForm.classList.add('popup_opened');
}

function submitAddPlaceForm(event) {
  event.preventDefault();
  addGalleryElementContent();
  closePopup(addPlaceForm);
  formAddPlace.reset();
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputAboutme.value;
  closePopup(profileForm);
  formAddPlace.reset();
}

