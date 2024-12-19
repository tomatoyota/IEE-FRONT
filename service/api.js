import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cieestage.gogotest.xyz/api/v1',
  timeout: 5000, // 設置超時時間
});

export default axiosInstance;