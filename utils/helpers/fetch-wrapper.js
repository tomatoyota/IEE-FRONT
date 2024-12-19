import axios from 'axios';
// import { router } from '../router/router.js';
const { VITE_PATH } = import.meta.env;
// import { useTabsStore } from '../../stores/Tabs.js';
import swalWithCustomStyles from '@/utils/sweetAlert'

const baseJwtURL = `/account/v1`;
const axiosInstanceJwt = axios.create({
    baseURL: baseJwtURL,
})

const baseURL = `/api/v1`;
const axiosInstance = axios.create({
    baseURL: baseURL,
})


function handleErrorResponse(err) {
    // ?非 200 或非 401 的狀態顯示(ex. 500 時顯示)
    if (err.response && (err.response.status.toString().startsWith('5'))) {
        swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: '伺服器異常，請聯絡管理人員！',
            confirmButtonColor: '#0E2A34',
            confirmButtonText: '確認',
            background: '#F0F0F2',
            width: 400
        })
        // console.error('伺服器異常，請聯絡管理人員！');
        router.push('/error');
        return
    }
    if (err.response && err.response.status === 404) {
        swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: `無法進行此動作，請重新整理頁面(${err.response.status})`,
            confirmButtonColor: '#0E2A34',
            confirmButtonText: '確認',
            background: '#F0F0F2',
            width: 400
        })
        // console.warn(`無法進行此動作，請重新整理頁面 (${err.response.status})`);
        router.push('/error'); 
        return 
    }
    if (err.response && err.response.status === 403) {
        swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: `${err.response.data.rtnMsg}`,
            confirmButtonColor: '#0E2A34',
            confirmButtonText: '確認',
            background: '#F0F0F2',
            width: 400
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload()
            }
        });
        // console.warn(`無法進行此動作，請重新整理頁面 (${err.response.status})`);
        router.push('/error'); 
        return 
    }
    if (err.response && err.response.status !== 401) {
        return Promise.reject(err)
    }
    /* token 到期，導到登入頁 */
    // const store = useTabsStore();
    if (err.response && err.response.status === 401) {
        swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: '登入逾期，請重新登入',
            confirmButtonColor: '#0E2A34',
            confirmButtonText: '確認',
            width: 500
        }).then((result) => {
            if (result.isConfirmed) {
                // store.clearTabsList(); // 清除
                router.push('/');
            }
        })
        // console.warn(`無法進行此動作，請重新整理頁面 (${err.response.status})`);
        router.push('/error'); 
        return
    }
}

axiosInstanceJwt.interceptors.response.use(
    config => config,
    err => handleErrorResponse(err)
);

axiosInstance.interceptors.response.use(
    config => config,
    err => handleErrorResponse(err)
);


//*axios
export { axiosInstanceJwt, axiosInstance, handleErrorResponse }
