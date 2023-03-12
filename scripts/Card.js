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
      
      this._trashButton = this._element.querySelector(".element__trash-button");
      this._likeButton = this._element.querySelector(".element__button-like");

      this._imagePreview = document.querySelector("#imagepreview");
      this._imageElement = this._element.querySelector(".element__photo");
      this._imageText = this._element.querySelector('.element__text');

      this._imageText
        .textContent = this.name;
      this._imageElement
        .src = this.link;
      this._imageElement
        .alt = `Photo of ${this.link}`;
        
      this._setEventListeners(); 

      return this._element;
    }
  
    _setEventListeners() {


      this._trashButton
        .addEventListener("click", this._removeElement
        );

      this._likeButton
        .addEventListener("click", this._toggleLikeButton
        );
  
      this._imageElement
        .addEventListener("click", this._openPopup
        );
    }

    _removeElement = () => {
        this._element.remove();      
    }

    _toggleLikeButton = () => {
      this._likeButton
        .classList.toggle("element__button-like_active");
    }
  
    _openPopup = () => {
      this._rendrePopupImagePreview();
      openPopup(this._imagePreview);

    }


    _rendrePopupImagePreview() {
      this._popupImageContent = this._imagePreview.querySelector(".popup__image-content");
      this._popupImageHeader = this._imagePreview.querySelector(".popup__image-header");
      this._popupImageContent
        .setAttribute("src", `${this.link}`);
      this._popupImageContent
        .setAttribute("alt", `Photo of ${this.name}`);
      this._popupImageHeader
        .textContent = this.name;      
    }
}

export {
    Card
}