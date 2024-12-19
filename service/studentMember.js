import { api } from '../utils/axios.js';
// import { axiosInstance, callApi } from '../utils/helpers/fetch-wrapper';

export default {
    // async postMember (obj) {
    //     try{
    //         const method = 'POST';
    //         const url = '/members/personal';
    //         const data = obj;
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    // async searchStudentMember (frontUserId, name, level, paymentStatus,page, size, sortField, sortOrder) {
    //     try{
    //         const method = 'GET';
    //         const url = `/members/students?frontUserId=${frontUserId}&name=${name}&level=${level}&paymentStatus=${paymentStatus}&page=${page}&size=${size}&sortField=${sortField}&sortOrder=${sortOrder}`;
    //         const data = '';
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    // async getAcademicsDetail (id) {
    //     try{
    //         const method = 'GET';
    //         const url = `/members/personal/${id}`;
    //         const data = '';
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    // async putMember (obj, id) {
    //     try{
    //         const method = 'PUT';
    //         const url = `/members/personal/${id}`;
    //         const data = obj;
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    // async deleteMember (id) {
    //     try{
    //         const method = 'DELETE';
    //         const url = `/members/personal/${id}`;
    //         const data = '';
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    // async getPaymentHistory (id) {
    //     try{
    //         const method = 'GET';
    //         const url = `/members/personal/payments/${id}`;
    //         const data = '';
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    // async verifyEmail (obj) {
    //     try{
    //         const method = 'GET';
    //         const url = `/members/students/verify-email`;
    //         const data = obj;
    //         const res = await callApi(method, url, data);
            
    //         return res

    //     }catch(error){
    //         return error
    //     }
    // },
    async postMember (obj) {
        try {
            const res = await api.post(`/members/students`, obj);

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
    async getLocationList () {
        try {
            const res = await api.get(`/location`);

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

    async studentEmail (obj){
        try {
            const res = await api.post(`/members/students/front/verify-email`, obj);

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
    async studentVerifyEmail(obj){
        try {
            const res = await api.post(`/members/student/front/verifyCode`, obj);

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
                rtnCode: error.response.data.rtnCode,
                msg: error.response.data.rtnMsg
            }
        }
    }
    
}