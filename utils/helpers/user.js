export default {
  getUsername() {
    const username = localStorage.getItem('admin-user')

    if (username) {
      return JSON.parse(username).backendUserAccount
    }
  },
  getUserEmail(){
    const userEmail = localStorage.getItem('admin-user')

    if (userEmail) {
      return JSON.parse(userEmail).email;
    }
  },
  getUserLastTimeLogin() {
    const username = localStorage.getItem('admin-user')

    if (username) {
      return JSON.parse(username).lastTimeLogin
    }
  },
  getUserAccount() {
    const profile = localStorage.getItem('user-profile');
    return profile ? JSON.parse(profile).account : null;
  },
  getUserProfile() {
    const profile = localStorage.getItem('user-profile');
    // console.log('profile', profile)
    return profile ? JSON.parse(profile) : null; // 返回 user-profile 資料，若無則返回 null
  },
  getIsLogin() {
    return !!localStorage.getItem('isLogin') // 判斷登入狀態是否存在
  },
  setIsLogin(status) {
    localStorage.setItem('isLogin', status) // 保存登入狀態
  },
  setUserProfile(profile) {
    localStorage.setItem('user-profile', JSON.stringify(profile));
  },
  removeLogin() {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('this-user') // 移除用戶資料
    localStorage.removeItem('user-profile')
  },
  getHasChangedPassword(){
    const hasChangedPassword = localStorage.getItem('user-profile')

    if (hasChangedPassword) {
      // return JSON.parse(hasChangedPassword).hasChangedPassword
      const parsedProfile = JSON.parse(hasChangedPassword);
      return parsedProfile.hasOwnProperty('passwordChange') ? parsedProfile.passwordChange : false;
      console.log(hasChangedPassword);
    }
  },
  // forgetPassword(){
  //   localStorage.getItem('userAccount')
  // }
}
