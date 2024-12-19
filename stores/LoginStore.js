import { defineStore } from 'pinia';
import userHelper from '@/utils/helpers/user';

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        isLogin: userHelper.getIsLogin(),
        redirectUrl: '',
        // userProfile: {
        //     userId: null,
        //     isAdmin: false,
        //     accountType: null,
        //     passwordChange: false,
        //     payment: false,
        //   },
        userProfile: userHelper.getUserProfile(),
        // email: userHelper.getUser(),
        // isFromSocial: userHelper.getIsFromSocial()
    }),
    getters: {
        userIsLogin: ({ isLogin }) => {
            isLogin = userHelper.getIsLogin();
            return isLogin;
        },
        userEmail: ({ email }) => { // 取得使用者 email
            email = userHelper.getUserEmail();
            return email;
        },
        userAccount: ({ account }) => { // 取得使用者帳號
            account = userHelper.getUser();
            return account;
        },
        // getIsFromSocial: ({ isFromSocial }) => { // 取得是否從社群登入
        //     isFromSocial = userHelper.getIsFromSocial();
        //     return isFromSocial
        // },
        getAccountType: ({ accountType }) => {
            return accountType;
          },
    },
    actions: {
        getIsLogin() {
            this.isLogin = userHelper.getIsLogin();
        },
        getUserEmail() {
            this.email = userHelper.getUserEmail();
        },
        getUserAccount() {
            this.account = userHelper.getUser();
        },
        // fromSocialhandler() {
        //     this.isFromSocial = userHelper.getIsFromSocial();
        // },
        setAccountType() {
            if (this.isLogin) {
              // 假設你可以透過 userHelper 或其他方式來獲取 account_type
              this.accountType = userHelper.getAccountType();  // 這裡需要你根據實際情況來獲取 account_type
            } else {
              this.accountType = null;
            }
          },
          updateLoginStatus(status) {
            // console.log('Updating login status:', status);
            userHelper.setIsLogin(status);
          },
          updateUserProfile(profile) {
            // console.log('Updating user profile:', profile);
            localStorage.setItem('user-profile', JSON.stringify(profile)); // 更新到 localStorage
            // localStorage.setItem('admin-user', JSON.stringify(userData))
          },
          clearUserProfile() {
            this.userProfile = {
              userId: null,
              isAdmin: false,
              accountType: null,
              passwordChange: false,
              payment: false,
            };
            userHelper.removeLogin(); // 移除 localStorage 中的用戶數據
          },
        setRedirectUrl (path) {
            this.redirectUrl = path;
        },
        removeRedirectUrl() {
            this.redirectUrl = '';
        }
    }
})
