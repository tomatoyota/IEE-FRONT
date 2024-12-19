import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'https://cieestage.gogotest.xyz/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // // 添加回應攔截器
  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     const statusCode = error.response?.status;

  //     if (statusCode === 404) {
  //       navigateTo('/error', { statusCode: 404, statusMessage: 'API Endpoint Not Found' });
  //     } else {
  //       console.error('伺服器錯誤:', error.message);
  //       navigateTo('/error');
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     const statusCode = error.response?.status;

  //     if (statusCode === 404) {
  //       throw createError({
  //         statusCode: 404,
  //         statusMessage: 'API Endpoint Not Found',
  //       });
  //     } else {
  //       throw createError({
  //         statusCode: statusCode || 500,
  //         statusMessage: error.message || '伺服器錯誤',
  //       });
  //     }
  //   }
  // );


  return {
    provide: {
      api,
    },
  }
})