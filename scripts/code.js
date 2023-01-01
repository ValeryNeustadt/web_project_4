let addButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector('.popup');
let closeButton = document.querySelector(".form__close-button");
let form = document.querySelector(".form");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
let inputName = document.querySelector(".form__input-name");
let inputAboutme = document.querySelector(".form__input-aboutme");

function toggleForm() {
    popup.classList.add('popup_visible');
    inputName.value = profileName.textContent
    inputAboutme.value = profileProfession.textContent;
  }

function closeForm() {
    popup.classList.remove('popup_visible');
  }

function inputValue(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputAboutme.value;   
    popup.classList.remove('popup_visible');
  } 

addButton.addEventListener("click", toggleForm); 
closeButton.addEventListener("click", closeForm); 
form.addEventListener("submit", inputValue);

