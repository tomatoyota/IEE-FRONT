import { defineStore } from 'pinia';
import testSrv from '@/service/test.js';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    // user: JSON.parse(localStorage.getItem('admin-user'))|| null,
    isLoggedIn: false,
    isAdmin: false,  // 是否為管理員
    accountType: 1,  // account_type: 1=個人, 2=團體, 3=學生
  }),
  getters: {
    isLoggedIn: (state) => !!state.user, // 檢查 user 是否存在
  },
  actions: {
    setIsAdmin(isAdmin: boolean) {
      this.isAdmin = isAdmin;
    },
    setAccountType(accountType: number) {
      this.accountType = accountType;
    },
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },

    async userLogin(account: string, password: string) {
      const result = await testSrv.userLogin({ account, password });

      if (result.isSuccess) {
        this.user = result.data.data.userData;
        localStorage.setItem('this-user', JSON.stringify(this.user));
        router.push('/index');
        return { isSuccess: true };
      } else {
        return { isSuccess: false, msg: result.msg };
      }
    },

    async userLogout() {
      const result = await testSrv.userLogout();
      if (result.isSuccess) {
        this.user = null;
        localStorage.removeItem('this-user');
        return { isSuccess: true };
      } else {
        return { isSuccess: false, msg: result.msg };
      }
    },

    // 清除 Session
    clearSession() {
      this.user = null;
      this.setIsLoggedIn(false);
      this.setIsAdmin(false);
      this.setAccountType(1);  // 設定預設 accountType
      localStorage.removeItem('this-user');
    }
  }
  // actions: {
  //   async userLogin(account: string, password: string) {
  //     try {
  //       const response = await fetch(`/backend-users/login`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ account, password })
  //       });

  //       const user = await response.json();

  //       if (user.rtnCode !== '0000') {
  //         return {
  //           isSuccess: false,
  //           msg: user.rtnMsg
  //         };
  //       }

  //       // update pinia state
  //       this.user = user;
  //       // store user details and jwt in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('admin-user', JSON.stringify(user.data.userData));
  //       // redirect to previous url or default to home page
  //       router.push(this.returnUrl || '/admin');
  //       return {
  //         isSuccess: true
  //       };
  //     } catch (error) {
  //       return {
  //         isSuccess: false,
  //         msg: 'An error occurred while logging in'
  //       };
  //     }
  //   },

  //   async logout() {
  //     try {
  //       const response = await fetch(`/backend-users/logout`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });

  //       const user = await response.json();

  //       if (user.rtnCode !== '0000') {
  //         return {
  //           isSuccess: false,
  //           msg: user.rtnMsg
  //         };
  //       }


  //       // 清除 pinia 狀態
  //       this.user = null;
  //       localStorage.removeItem('admin-user');
        
  //       return {
  //         isSuccess: true
  //       };
  //     } catch (error) {
  //       return {
  //         isSuccess: false,
  //         msg: 'An error occurred while logging out'
  //       };
  //     }
  //   }
  // }
});