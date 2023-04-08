export class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._imageElement = this._element.querySelector(".element__photo");
    this._imageText = this._element.querySelector(".element__text");
    this._imageText.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Photo of ${this._link}`;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", this._removeElement);
    this._likeButton.addEventListener("click", this._toggleLikeButton);
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _removeElement = () => {
    this._element.remove();
  };

  _toggleLikeButton = () => {
    this._likeButton.classList.toggle("element__button-like_active");
  };
}
