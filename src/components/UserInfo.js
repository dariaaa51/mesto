export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserInfo(formData) {
    this._userName.textContent = formData["username"];
    this._userJob.textContent = formData["userjob"];
  }
}

export { UserInfo };
