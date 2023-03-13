export default class UserInfo {
  constructor({ userNameElement, userInfoElement }) {
    this._userName = document.querySelector(userNameElement);
    this._userJob = document.querySelector(userInfoElement);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.job = this._userJob.textContent;

    return userInfo;
  }

  setUserInfo(formData) {
    this._userName.textContent = formData['username'];
    this._userJob.textContent = formData['userjob'];
  }
}

export { UserInfo }