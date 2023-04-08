export class UserInfo {
    constructor(profileName, profileProfession) {
        this._inputName = profileName;
        this._inputAboutme = profileProfession;
        this._profileName = document.querySelector(".profile__name");
        this._profileProfession = document.querySelector(".profile__profession");
    }
  
    getUserInfo() {
        this._userValues = {};   
        this._userValues = {
            profileName: this._inputName.textContent,
            profileProfession: this._inputAboutme.textContent
        };  
       return this._userValues;
    }

    setUserInfo() {
    this._profileName.textContent = this._inputName;
    this._profileProfession.textContent = this._inputAboutme;
    }
}
