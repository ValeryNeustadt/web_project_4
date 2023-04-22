export class UserInfo {
  constructor(
    profileName,
    profileProfession,
    profileInfoSelector,
    userImageSelector
  ) {
    this._profileName = document.querySelector(profileName);
    this._profileProfession = document.querySelector(profileProfession);
    //this._id = document.querySelector(profileInfoSelector);
    this._image = document.querySelector(userImageSelector);
  }

  getUserInfo() {
    const userValues = {
      profileName: this._profileName.textContent,
      profileProfession: this._profileProfession.textContent,
    };
    return userValues;
  }

  setUserInfo(inputName, inputAboutMe, id) {
    this._profileName.textContent = inputName;
    this._profileProfession.textContent = inputAboutMe;
    //this._id.id = id;
  }

  setUserImage(imageLink) {
    this._image.src = imageLink;
    this._image.alt = `Photo of ${this._profileName.textContent}`;
  }
}
