import Popup from "../components/Popup.js";
export class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__button");
    this._submitButtonTextContent = this._submitButton.textContent;
  }

  setAction(action) {
    this._handleFormSubmit = action;
  }
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //this.renderLoading(true);
      this._handleFormSubmit();
      //super.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }
}
