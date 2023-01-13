let addButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector('.popup');
let closeButton = document.querySelector(".popup__close-button");
let form = document.querySelector(".form");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
let inputName;
let inputAboutme;
let popupTemplate;
let formFieldset;
let formInputname;
let formInputaboutme;
//let popupTemplate = document.querySelector("#popup__template").content;
//let popupProfile = document.querySelector('.popup_profile');

// clone the content of the template tag 
//let popupElements = popupTemplate.querySelector('.popup').cloneNode(true);

// add content
//userElement.querySelector(".user__avatar").src = "tinyurl.com/v4pfzwy";
//userElement.querySelector(".user__name").textContent = "Duke, mayor of Cormorant";

// make it appear on the page
//popupProfile.append(popupElements); 

const inputNameform = {
  type:"text", 
  id:"name", 
  name:"name",
  placeholder:"Name",
}

const inputAboutmeform = {
  type:"text", 
  id:"about-me", 
  name:"about-me",
  placeholder:"About me",   
}

const inputNewPlaceTitle = {
  type:"title", 
  id:"title", 
  name:"title",
  placeholder:"Title",   
}

const inputNewPlaceLink = {
  type:"text", 
  id:"image-link", 
  name:"image-link",
  placeholder:"Image link",   
}

 


function setFormAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
  element.setAttribute(attr, attributes[attr]);
    });
  }

function openFormProfile() {

    popupTemplate = document.querySelector("#popup__template").content;
    formFieldset = document.querySelector('.form__fieldset');
    formInputname = popupTemplate.querySelector('.form__input').cloneNode(true);
    formInputaboutme = popupTemplate.querySelector('.form__input').cloneNode(true);
    formFieldset.append(formInputname); 
    formFieldset.append(formInputaboutme); 

    setFormAttributes(formInputname, inputNameform);
    setFormAttributes(formInputaboutme, inputAboutmeform);

    popup.classList.add('popup_visible');

    inputName = document.querySelector("#name");
    inputAboutme = document.querySelector("#about-me");
    
    profileName = document.querySelector(".profile__name");
    profileProfession = document.querySelector(".profile__profession");
    inputName.value = profileName.textContent;
    inputAboutme.value = profileProfession.textContent;
  }

  function openFormGallery() {

    popupTemplate = document.querySelector("#popup__gallery").content;
    formFieldset = document.querySelector('.form__fieldset');
    formInputname = popupTemplate.querySelector('.form__input').cloneNode(true);
    formInputaboutme = popupTemplate.querySelector('.form__input').cloneNode(true);
    formFieldset.append(formInputname); 
    formFieldset.append(formInputaboutme); 

    setFormAttributes(formInputname, inputNameform);
    setFormAttributes(formInputaboutme, inputAboutmeform);

    popup.classList.add('popup_visible');

    inputName = document.querySelector("#name");
    inputAboutme = document.querySelector("#about-me");
    
    profileName = document.querySelector(".profile__name");
    profileProfession = document.querySelector(".profile__profession");
    inputName.value = profileName.textContent;
    inputAboutme.value = profileProfession.textContent;
  }


function closeForm() {
    popup.classList.remove('popup_visible');
    let inputFormname = document.querySelector("#name");
    let removeInputname = inputFormname.remove("#name");
    let inputFormaboutme = document.querySelector("#about-me");
    let removeInputaboutme = inputFormaboutme.remove("#about-me");
    
  }

function inputValue(event) {
  event.preventDefault();
  if (inputName.hasAttribute("name")) {

    console.log(inputName);
    
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputAboutme.value;  
    closeForm();
  }

    
  } 

addButton.addEventListener("click", openFormProfile); 
closeButton.addEventListener("click", closeForm); 
form.addEventListener("submit", inputValue);

