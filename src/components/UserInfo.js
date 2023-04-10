export class UserInfo {
  constructor(profileName, profileProfession) {
    this._profileName = document.querySelector(profileName);
    this._profileProfession = document.querySelector(profileProfession);
  }

  getUserInfo() {
    const userValues = {
      profileName: this._profileName.textContent,
      profileProfession: this._profileProfession.textContent,
    };
    return userValues;
  }

  setUserInfo(inputName, inputAboutMe) {
    this._profileName.textContent = inputName;
    this._profileProfession.textContent = inputAboutMe;
  }
}
