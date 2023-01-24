const profileForm = document.querySelector("#profileform");
let inputName = document.querySelector("#profileform__name");
let inputAboutme = document.querySelector("#profileform__about-me");

const addPlaceForm = document.querySelector("#addplaceform");
let addPlaceFormTitle = document.querySelector("#addplaceform__title");
let addPlaceFormImageLink = document.querySelector("#addplaceform__image-link");

const imagePreview = document.querySelector("#imagepreview");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const closeButtonProfileForm = document.querySelector("#profileform__close-button");
const closeButtonAddPlaceForm = document.querySelector("#addplaceform__close-button");
const closeButtonImagePreview = document.querySelector("#imagepreview__close-button");
const submitButtonProfileForm = document.querySelector("#profileform__submit-button");
const submitButtonAddPlaceForm = document.querySelector("#addplaceform__submit-button");

let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

let inputFistField;
let inputSecondField;

let galleryElements;
let elementNode; 

let cardInputId;
let icard = 0;


const galleryCardsInputs = [
  {
    inputFistField: "Yosemite Valley",
    inputSecondField: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    inputFistField: "Lake Louise",
    inputSecondField: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    inputFistField: "Bald Mountains",
    inputSecondField: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    inputFistField: "Latemar",
    inputSecondField: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    inputFistField: "Vanoise National Park",
    inputSecondField: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    inputFistField: "Lago di Braies",
    inputSecondField: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

let cardArray = galleryCardsInputs;

creatingCard (cardArray);
addListeners();

function creatingCard (cardArray) {
  for (icard; icard <= galleryCardsInputs.length - 1; icard++) {
    cardInputId = icard;
    addAttributeCardToInput (cardArray);
    creatingGalleryElementStartUp (inputFistField, inputSecondField);
    galleryElements.append(elementNode);
    trashButtonListener();
    likeButtonListener();
    imageListener();
   }
}

function creatingNewCard (cardArray) {
  for (icard; icard <= galleryCardsInputs.length - 1; icard++) {
    cardInputId = icard;
    addAttributeCardToInput (cardArray);
    creatingGalleryElementStartUp (inputFistField, inputSecondField);
    galleryElements.prepend(elementNode);
    trashButtonListener();
    likeButtonListener();
    imageListener();
  }
}

function addAttributeCardToInput (cardArray) {
  let cardfield = cardArray.at(cardInputId);
  function setMultipleAttributesonElement(cardfield) {
    Object.keys(cardfield).forEach(attribute => {
      if (attribute === "inputFistField" ) {
        inputFistField = `${cardfield[attribute]}`;
      } else if (attribute === "inputSecondField") {
        inputSecondField = `${cardfield[attribute]}`;
        }
    });
  }
  setMultipleAttributesonElement(cardfield);
}

function creatingGalleryElementStartUp (inputFistField, inputSecondField) {
    let galleryTemplate = document.querySelector("#gallery").content;
    galleryElements = document.querySelector('.gallery__elements');
    elementNode = galleryTemplate.querySelector('.element').cloneNode(true);
    elementNode.setAttribute("id", `element__${inputFistField.replace(/ /g, '_')}`);
    let elementPhotoClass = elementNode.querySelector(".element__photo");
    elementPhotoClass.setAttribute("id", `photo__${inputFistField.replace(/ /g, '_')}`);
    elementPhotoClass.setAttribute("alt", `Photo ${inputFistField.replace(/ /g, '_')}`);
    elementPhotoClass.setAttribute("src", `${inputSecondField}`);
    let elementHeaderClass = elementNode.querySelector(".element__text");
    elementHeaderClass.setAttribute("id", `text__${inputFistField.replace(/ /g, '_')}`);
    elementHeaderClass.querySelector(`#text__${inputFistField.replace(/ /g, '_')}`);
    elementHeaderClass.textContent = inputFistField;
    let elementTrashButtonClass = elementNode.querySelector(".element__trash");
    elementTrashButtonClass.setAttribute("id", `trash-button__${inputFistField.replace(/ /g, '_')}`);
    let elementLikeButtonClass = elementNode.querySelector(".element__button-like");
    elementLikeButtonClass.setAttribute("id", `button-like__${inputFistField.replace(/ /g, '_')}`);
}

function addListeners() {
  editButton.addEventListener("click", openProfileForm);
  addButton.addEventListener("click", openAddPlaceForm);

  closeButtonAddPlaceForm.addEventListener("click", closeAddPlaceForm);
  closeButtonProfileForm.addEventListener("click", closeProfileForm );

  submitButtonAddPlaceForm.addEventListener("click", submitAddPlaceForm);
  submitButtonProfileForm.addEventListener("click", submitProfileForm);
}

function openProfileForm() {
  popupFormAnimationFadeIn (profileForm);
  inputName.value = profileName.textContent;
  inputAboutme.value = profileProfession.textContent;
}

function openAddPlaceForm() {
  addPlaceFormTitle.value = null;
  addPlaceFormImageLink.value = null;
  popupFormAnimationFadeIn (addPlaceForm);
}

function openImagePreview() { 
  imagePopupAnimationFadeIn (addPlaceForm);
}

function submitAddPlaceForm (event) {
  event.preventDefault();
  addGalleryElementContent();
  closeAddPlaceForm();
}

function submitProfileForm (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputAboutme.value;
  closeProfileForm();  
}

function closeProfileForm() {
  popupFormAnimationOut (profileForm);
}

function closeAddPlaceForm() {
  popupFormAnimationOut (addPlaceForm);
}

function trashButtonListener() {
  const trashButton = document.querySelector(`#trash-button__${inputFistField.replace(/ /g, '_')}`);
  const elementItem = document.querySelector(`#element__${inputFistField.replace(/ /g, '_')}`);
    trashButton.addEventListener("click", function () {
    elementItem.remove();
  }); 
}

function likeButtonListener() {
  const likeButton = document.querySelector(`#button-like__${inputFistField.replace(/ /g, '_')}`);
    likeButton.addEventListener("click", function () {
     if (likeButton.className == 'element__button-like') {
      likeButton.classList.add('element__button-like_active');
     } else {
      likeButton.classList.remove('element__button-like_active');
     }
  });
}

 function imageListener() {
  const imageElement = document.querySelector(`#photo__${inputFistField.replace(/ /g, '_')}`);
  imageElement.addEventListener("click", function () {
    let imageId = imageElement.getAttribute('id');
    let imageSrc = imageElement.getAttribute('src');
    creatingImagePopup(imageId,imageSrc);
   }); 
}

function closeImagePopup(imagePreview) {

  closeButtonImagePreview.addEventListener("click", function () {
    imagePopupAnimationFadeOut (imagePreview);
   }); 
}

function addGalleryElementContent () {
  let newObjectToArrayGallery = new Object();
  newObjectToArrayGallery.inputFistField = addPlaceFormTitle.value;
  newObjectToArrayGallery.inputSecondField = addPlaceFormImageLink.value;
  let newArrayLength = cardArray.push(newObjectToArrayGallery);
  icard = newArrayLength - 1;
  creatingNewCard (cardArray);  
}


function creatingImagePopup(inputFistField, inputSecondField) {
  let imagePhotoClass = document.querySelector(".popup__image-content");
  imagePhotoClass.setAttribute("src", `${inputSecondField}`);
  let imageHeaderClass = document.querySelector("#imagepreview__header");
  imageHeaderClass.textContent = inputFistField.replaceAll("photo_", "").replaceAll("_", " ");
  imagePopupAnimationFadeIn (imagePreview);
  closeImagePopup(imagePreview);
}

function imagePopupAnimationFadeIn (newadd) {
  newadd.classList.add('popup_visible');
  let opacity = 0;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 100) {
      clearInterval(idop);
    } else {
      opacity++; 
      newadd.style.opacity = opacity + '%';
    }
  }
}

function imagePopupAnimationFadeOut (addclose) {
  let opacity = 100;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 0) {
      clearInterval(idop);
      addclose.classList.remove('popup_visible');
    } else {
      opacity--; 
      addclose.style.opacity = opacity + '%';
    }
  }
}

function popupFormAnimationFadeIn (newadd) {
  newadd.classList.add('popup_visible');
  let opacity = 0;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 100) {
      clearInterval(idop);
      
    } else {      
      opacity++;
      newadd.style.opacity = opacity + '%';
    }
  }
}

function popupFormAnimationOut (addclose) {
  let opacity = 100;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 0) {
      clearInterval(idop);
      addclose.classList.remove('popup_visible');
    } else {
      opacity--; 
      addclose.style.opacity = opacity + '%';
    }
  }
}