export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    // this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    // this._removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }
  // _removeEventListeners() {
  //   console.log("hall0");
  //   this._popupSelector.removeEventListener("mousedown", (evt) => {
  //     if (
  //       evt.target.classList.contains("popup_opened") ||
  //       evt.target.classList.contains("popup__close-button")
  //     ) {
  //       this.close();
  //     }
  //   });
  // }
}
