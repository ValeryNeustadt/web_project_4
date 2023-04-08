import Popup from "../components/Popup.js";
export class PopupWithImage extends Popup {
    constructor (popupSelector, data){
        super(popupSelector);
        this.name = data.name;
        this.link = data.link;
        this._popupImageContent =  this._popupSelector.querySelector(".popup__image-content");
        this._popupImageHeader =  this._popupSelector.querySelector(".popup__image-header");
    }
   
    _rendrePopupImagePreview() {
        this._popupImageContent.setAttribute("src", `${this.link}`);
        this._popupImageContent.setAttribute("alt", `Photo of ${this.name}`);
        this._popupImageHeader.textContent = this.name;      
    }

    openPopup () {
        super.open();
        this._rendrePopupImagePreview();
        super.setEventListeners();
    }
  }

  
  
