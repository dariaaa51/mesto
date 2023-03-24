export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
    this._userPhoto = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
  }

  setUserAvatar(result) {
    this._userPhoto.src = result.avatar;
  }
}

export { UserInfo };
