export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
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

  setUserAvatar(avatarLink) {
    this._avatarLink.src = avatarLink;
  }
}

export { UserInfo };
