export class Card {
  constructor(
    data,
    handleCardClick,
    handleCardDelete,
    handleToggleLikes,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleToggleLikes = handleToggleLikes;
    this._userId = userId;
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
    this._element.id = this._id;
    this._trashButton = this._element.querySelector(".element__trash-button");
    this._likeButton = this._element.querySelector(".element__button-like");
    this._imageElement = this._element.querySelector(".element__photo");
    this._imageText = this._element.querySelector(".element__text");
    this._likeNumber = this._element.querySelector(".element__number-like");
    this._imageText.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Photo of ${this._link}`;
    this._setEventListeners(this._id);
    this._showTrashButton();
    this._renderLikes();
    return this._element;
  }

  _showTrashButton() {
    if (this._cardOwnerId === this._userId) {
      this._trashButton.classList.add("element__trash-button_visible");
    }
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", () => {
      this._handleCardDelete(this._element.id);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleToggleLikes(this._element.id);
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  _renderLikes() {
    this._likeNumber.textContent = this._likes.length || "";
    if (this.isLiked()) {
      this._likeButton.classList.add("element__button-like_active");
    } else {
      this._likeButton.classList.remove("element__button-like_active");
    }
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }
}
