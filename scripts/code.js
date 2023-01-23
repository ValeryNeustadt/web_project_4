let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let popup = document.querySelector('.popup');
let closeButton = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

let inputFistField;
let inputSecondField;

let formInputs;

let galleryElements;
let elementNode; 

let eventEditButton;
let eventAddButton;

let popupWindow;

let input;
let inputId;

const formProfileInputs = [

{
  type:"text",
  name:"name",
  placeholder:"Name",
  class:"form__input",
},

{
  type:"text",
  name:"about-me",
  placeholder:"About me",
  class:"form__input", 
},
];

const formGelleryInputs = [

{ 
  type:"text",
  name:"title",
  placeholder:"Title", 
  class:"form__input",
  required:"",
},

{ 
  type:"url",
  name:"image-link",
  placeholder:"Image link",
  class:"form__input",
  required:"",
}
];

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

let cardInputId;
let icard = 0;
let cardArray = galleryCardsInputs;

creatingCard (cardArray);
addListener();

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

function addGalleryElementContentStartUp (inputSecondField, inputFistField) {
  let elementPhotoId = document.querySelector(`#photo__${inputFistField}`);
  elementPhotoId.setAttribute("src", `${inputSecondField}`);
  let elementHeaderId = document.querySelector(`#text__${inputFistField}`);
  elementHeaderId.textContent = inputFistField;
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

function addListener() {
  editButton.addEventListener("click", profileListener);
  addButton.addEventListener("click", galleryListener);
  closeButton.addEventListener("click", closeForm);
}

function profileListener() {
  eventEditButton = true;
  openForm();
  editButton.removeEventListener("click", profileListener);
}

function galleryListener() {
  eventAddButton = true;
  openForm();
  addButton.removeEventListener("click", galleryListener);
}

function openForm() {
  popupFormAnimationFadeIn ();
  popup.classList.add('popup_visible');
  inputFistField = 0;
  inputSecondField = 0;
  if (eventAddButton) {
    formInputs = formGelleryInputs;
    creatingForm (formInputs);
    creatingFormTitle ();
    eventAddButton = false;
  }
  if (eventEditButton) {
    formInputs = formProfileInputs;
    creatingForm (formInputs);
    creatingFormTitle ();
    eventEditButton = false;
  }
}

function creatingForm (formValue) {
  let popupTemplate = document.querySelector("#popup__template").content;
  let popupForm = document.querySelector('.popup');
  popupWindow = popupTemplate.querySelector('.popup__window').cloneNode(true);
  popupForm.append(popupWindow);
  for (let i = 0; i <= formInputs.length - 1; i++) {
    inputId = i;
    let id = `field_${i+1}`;
    input = document.createElement("input");
    input.setAttribute('id', id);
    addAttributeToInput (formValue);
    const fieldset = document.querySelector(".form__fieldset");
    fieldset.appendChild(input);
    if (eventEditButton) {
      addProfileAttributeFromProfile (i, id);
    }
    if (eventAddButton) {
      getFormInputNames (i , id);
    }
   }
   let form = document.querySelector(".form");
   form.addEventListener("submit", inputValue);
}

function creatingFormTitle () {
  if (eventEditButton) {
    popupHeader = document.querySelector('.popup__header').textContent = "Edit profile";
  }
  if (eventAddButton) {
    popupHeader = document.querySelector('.popup__header').textContent = "New place";
  }
}

function addAttributeToInput (formValue) {
  let field = formValue.at(inputId);
  function setMultipleAttributesonElement(elem, elemAttributes) {
    Object.keys(field).forEach(attribute => {
      elem.setAttribute(attribute, elemAttributes[attribute]);
    });
  }
  setMultipleAttributesonElement(input, field);
}

function addProfileAttributeFromProfile (i, id) {
  if ((i+1) === 1 ) {
    getFormInputNames (i , id)
    profileName = document.querySelector(".profile__name");
    inputFistField.value = profileName.textContent;
  }
  if ((i+1) === 2 ) {
    getFormInputNames (i , id)
    profileProfession = document.querySelector(".profile__profession");
    inputSecondField.value = profileProfession.textContent;
  }
}

function getFormInputNames (i , id) {
  if ((i+1) === 1 ) {
    inputFistField = document.querySelector(`#${id}`);
  }
  if ((i+1) === 2 ) {
   inputSecondField = document.querySelector(`#${id}`);
  }
}

function closeForm() {
    popupFormAnimationOut ();
    addListener();
}

function inputValue (event) {
  event.preventDefault();
  if (popupHeader  === "Edit profile") {
    profileName.textContent = inputFistField.value;
    profileProfession.textContent = inputSecondField.value;
    closeForm();
  }   
  if (popupHeader  === "New place") {
    addGalleryElementContent ();
    closeForm();
  } 
  
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

function closeImagePopup(inputFistField) {
  let imageNode = document.querySelector(`#image-popup__${inputFistField.replace(/ /g, '_')}`);
  let imageCloseButtonClass = document.querySelector(`#image-close-button__${inputFistField.replace(/ /g, '_')}`);
  imageCloseButtonClass.addEventListener("click", function () {
    imagePopupAnimationFadeOut (inputFistField);
   }); 
}

function addGalleryElementContent () {
  let elementPhotoId = document.querySelector(`#photo__${inputFistField.value.replace(/ /g, '_')}`);
  let elementHeaderId = document.querySelector(`#text__${inputFistField.value.replace(/ /g, '_')}`);
  let newObjectToArrayGallery = new Object();
  newObjectToArrayGallery.inputFistField = inputFistField.value;
  newObjectToArrayGallery.inputSecondField = inputSecondField.value;
  let newArrayLength = cardArray.push(newObjectToArrayGallery);
  icard = newArrayLength - 1;
  creatingNewCard (cardArray);  
}

function creatingImagePopup(inputFistField, inputSecondField) {
  let imageTemplate = document.querySelector("#image").content;
  let imagePopup = document.querySelector(".image");
  let imageNode = imageTemplate.querySelector(".image__popup").cloneNode(true);
  imageNode.setAttribute("id", `image-popup__${inputFistField.replace(/ /g, '_')}`);
  let imagePhotoClass = imageNode.querySelector(".image__content");
  imagePhotoClass.setAttribute("id", `image__${inputFistField.replace(/ /g, '_')}`);
  imagePhotoClass.setAttribute("alt", `image ${inputFistField.replace(/ /g, '_')}`);
  imagePhotoClass.setAttribute("src", `${inputSecondField}`);
  let imageHeaderClass = imageNode.querySelector(".image__header");
  imageHeaderClass.setAttribute("id", `image-text__${inputFistField.replace(/ /g, '_')}`);
  imageHeaderClass.querySelector(`#image-text__${inputFistField.replace(/ /g, '_')}`);
  imageHeaderClass.textContent = inputFistField;
  let imageCloseButtonClass = imageNode.querySelector(".image__close-button");
  imageCloseButtonClass.setAttribute("id", `image-close-button__${inputFistField.replace(/ /g, '_')}`);
  imagePopup.prepend(imageNode);
  imageNode.classList.add('image__popup_visible');
  imagePopupAnimationFadeIn (inputFistField);
  closeImagePopup(inputFistField);
}

function imagePopupAnimationFadeIn (inputFistField) {
  let imageNode = document.querySelector(`#image-popup__${inputFistField.replace(/ /g, '_')}`);
  let opacity = 0;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 100) {
      clearInterval(idop);
    } else {
      opacity++; 
      imageNode.style.opacity = opacity + '%';
    }
  }
}

function imagePopupAnimationFadeOut (inputFistField) {
  let imageNode = document.querySelector(`#image-popup__${inputFistField.replace(/ /g, '_')}`);
  let opacity = 100;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 0) {
      clearInterval(idop);
      imageNode.classList.remove('image__popup_visible');
    } else {
      opacity--; 
      imageNode.style.opacity = opacity + '%';
    }
  }
}

function popupFormAnimationFadeIn () {
  let popupForm = document.querySelector('.popup');
  let opacity = 0;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 100) {
      clearInterval(idop);
    } else {
      opacity++;
      popupForm.style.opacity = opacity + '%';
    }
  }
}

function popupFormAnimationOut () {
  let popupForm = document.querySelector('.popup');
  let opacity = 100;
  const idop = setInterval(frame, 0.1);
  function frame() {
    if (opacity == 0) {
      clearInterval(idop);
      popup.classList.remove('popup_visible');
      popupWindow.remove();
    } else {
      opacity--; 
      popupForm.style.opacity = opacity + '%';
    }
  }
}

