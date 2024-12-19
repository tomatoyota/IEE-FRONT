import { api } from '../utils/axios.js';
// import userHelper from '../utils/helpers/user.js';
// import axios from 'axios';


export default {
    // 取得筆記本列表
    async postAcademicsList (obj) {
        try {
            const res = await api.post(`/academics/front/list`, obj);

            if (res === null || res.data === null) {
                return null
            }

            return {
                isSuccess: true,
                data: res.data.data
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    
    async getAcademics(id) {
        // console.log(id)
        try {
            const res = await api.get(`/academics/front/${id}`);

            if (res === null || res.data === null) {
                return null
            }
            const academicsData = res.data.data;
            
            return {
                isSuccess: true,
                data: academicsData,
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    async getAcademicsVolume() {
        try {
            const res = await api.get(`/academics/dropdown/volume`);
    
            if (res === null || res.data === null) {
                return null;
            }
    
            return {
                isSuccess: true,
                data: res.data.data,
                loading: false
            };
        } catch (error) {
            return {
                isSuccess: false,
                rtnCode: error.response?.data?.rtnCode,
                msg: error.response?.data?.rtnMsg || '發生錯誤',
                loading: false
            };
        }
    },
    async postIssueByVolume(obj) {
        try {
            const res = await api.post(`/academics/front/list`, obj);
    
            if (res === null || res.data === null) {
                return null;
            }
    
            return {
                isSuccess: true,
                data: res.data.data,
                loading: false
            };
        } catch (error) {
            return {
                isSuccess: false,
                rtnCode: error.response?.data?.rtnCode,
                msg: error.response?.data?.rtnMsg || '發生錯誤',
                loading: false
            };
        }
    },
    

    
}