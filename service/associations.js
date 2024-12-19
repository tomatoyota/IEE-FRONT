import { api } from '../utils/axios.js';
import userHelper from '../utils/helpers/user.js';
import axios from 'axios';

export default {
    // 取得筆記本列表
    async getAssociationsList (obj) {
        try {
            const res = await api.post(`/associations/front/list`, obj);

            if (res === null || res.data === null) {
                return null
            }

            return {
                isSuccess: true,
                data: res.data
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    async getAssociations (id) {
        // console.log(id)
        try {
            const res = await api.get(`/associations/front/${id}`);

            if (res === null || res.data === null) {
                return null
            }
            const associationsData = res.data.data;
            
            return {
                isSuccess: true,
                data: associationsData,
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    async getEbook (id) {
        try {
            const res = await api.get(`/associations/link/${id}`);

            if (res === null || res.data === null) {
                return null
            }

            return {
                isSuccess: true,
                data: res.data
            }
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.rtnMsg
            }
        }
    },
    async getAssociationYears() {
        try {
            const res = await api.get(`/associations/dropdown/year`);
    
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
    async getSeasonsByYear(obj) {
        try {
            const res = await api.post(`/associations/front/list`, obj);
    
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