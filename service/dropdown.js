// import { axiosInstance, callApi } from '../utils/helpers/fetch-wrapper';
import { api } from '../utils/axios.js'


function handleError(error) {
  console.error('API 發生錯誤:', error) // 可以用於記錄日誌

  const rtnCode = error?.response?.data?.rtnCode || 'UNKNOWN_ERROR'
  const rtnMsg = error?.response?.data?.rtnMsg || '發生未知錯誤'

  return {
    isSuccess: false,
    rtnCode: rtnCode,
    msg: rtnMsg
  }
}

export default {
  async getLocationList() {
    try {
      const res = await api.get(`/location`)
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
  },
  async getPersonalLevelList(obj) {
    try {
      const res = await api.get(`/level/personal`, obj)
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
  },
  async getGroupLevelList(){
    try {
      const res = await api.get(`/level/group`)
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
  
  },
  async getBranchList() {
    try {
      const res = await api.get(`/branch`)
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
   
  },
  async getAcademicsVolume() {
    try {
      const res = await api.get(`/academics/dropdown/volume`, obj)
      if (res === null || res.data === null) {
        return null
      }

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
    
  }
}
