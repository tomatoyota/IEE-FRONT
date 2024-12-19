import { defineStore } from 'pinia';
import axiosInstance from '@/services/api';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    user: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    // async testConnection() {
    //   this.isLoading = true;
    //   try {
    //     const response = await axiosInstance.get('/test');
    //     return response.data;
    //   } catch (error) {
    //     this.error = error.response?.data?.message || 'Connection failed';
    //     console.error('Error:', this.error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async login(account, password) {
      this.isLoading = true;
      try {
        const response = await axiosInstance.post('/backend-users/login', {
          account,
          password,
        });
        this.user = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        console.error('Error:', this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;
      try {
        const response = await axiosInstance.post('/backend-users/logout');
        this.user = null;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Logout failed';
        console.error('Error:', this.error);
      } finally {
        this.isLoading = false;
      }
    }
  },
});