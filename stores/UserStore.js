import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    editData: null,
    userData: null
  }),
  actions: {
    updateEditData(editData) {
      this.editData = editData;
    },
    updateUserData(userData) {
      this.userData = userData;
    },
    clearStore() {
      this.editData = '';
      this.userData = '';
    }
  }
});