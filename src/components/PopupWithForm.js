import Popup from "../components/Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.form');
        this._inputList = this._popupSelector.querySelectorAll('.form__input');
    }
  
    _getInputValues() { 
        this._formValues = {};        
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;

    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }


    close() {
        super.close();
        this._form.reset();
    }
  }