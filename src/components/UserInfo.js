export class UserInfo {
  constructor(profileName, profileProfession) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
    // this._profileName = document.querySelector(".profile__name");
    // this._profileProfession = document.querySelector(".profile__profession");
  }

  getUserInfo() {
    const userValues = {
      // userValues = {
      profileName: this._profileName.textContent,
      profileProfession: this._profileProfession.textContent,
    };
    //console.log(userValues);
    return userValues;
  }

  setUserInfo(inputName, inputAboutMe) {
    this._profileName.textContent = inputName;
    this._profileProfession.textContent = inputAboutMe;
  }
}
