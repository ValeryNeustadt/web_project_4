import { 
    openPopup
} from "./utils.js";

class Card {
    constructor(data) {
      this.name = data.name;
      this.link = data.link;
    }

    _getTemplate() {  
      const galleryElement = document
        .querySelector("#gallery")
        .content.querySelector(".element")
        .cloneNode(true);
      return galleryElement;
    }

    generateCard() {
      this._element = this._getTemplate();
  
      this._element
        .querySelector(".element__text")
        .textContent = this.name;
      this._element
        .querySelector(".element__photo")
        .src = this.link;
      this._element
        .querySelector(".element__photo")
        .alt = `Photo of ${this.link}`;  
      this._setEventListeners(); 

      return this._element;
    }
  
    _setEventListeners() {

      this._element
        .querySelector(".element__trash-button")
        .addEventListener("click", () => {
          this._element.remove();
        });

      this._element
        .querySelector(".element__button-like")
        .addEventListener("click", () => {
          this._element
            .querySelector(".element__button-like")
            .classList.toggle("element__button-like_active");
        });
  
      this._element
        .querySelector(".element__photo")
        .addEventListener("click", () => {
          openPopup(this._rendrePopupImagePreview());
        });
    }
  
    _rendrePopupImagePreview() {
      const imagePreview = document.querySelector("#imagepreview");
      imagePreview
        .querySelector(".popup__image-content")
        .setAttribute("src", `${this.link}`);
      imagePreview
        .querySelector(".popup__image-content")
        .setAttribute("alt", `Photo of ${this.name}`);
      imagePreview
        .querySelector(".popup__image-header")
        .textContent = this.name; 
      return imagePreview;
    }
}

export {
    Card
}