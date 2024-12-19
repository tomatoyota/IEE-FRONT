
import { api } from '../utils/axios.js'
//import userHelper from '../utils/helpers/user.js';

export default {
    async putPersonalMember(obj){
        try {
            const res = await api.put(`/members/personal/front/update`, obj);
            
            if (res === null || res.data === null) {
                return null
            }
            return {
                isSuccess: true,
                data: res.data
            }
        } catch (error) {
            //console.log(error)
            return error
            // return {
              // isSuccess: false,
            //     rtnCode: error.res.data.rtnCode,
            //     msg: error.res.data.rtnMsg
            // }
        }
    },
    async putGroupMember(obj){
        try {
            const res = await api.put(`/members/group/front/update`, obj);
            
            if (res === null || res.data === null) {
                return null
            }
            return {
                isSuccess: true,
                data: res.data
            }
        } catch (error) {
            return error
            // return {
            //     isSuccess: false,
            //     msg: error.res.data.rtnMsg
            // }
        }
    },
  async editGroupProfile(userId){
    try{
      const res = await api.get(`/members/group/${userId}`);
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    }catch (error) {
      return error
      // return {
      //   isSuccess: false,
      //   msg: error.response.data.rtnMsg
      // }
    }
  },
  async editPersonalProfile(obj){
    try{
      const res = await api.get(`/members/personal/${obj}`);
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    }catch (error) {
      return error
      // return {
      //   isSuccess: false,
      //   msg: error.response.data.rtnMsg
      // }
    }
  },
}