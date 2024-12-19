import { api } from '../utils/axios.js'
import userHelper from '../utils/helpers/user.js'
import {axiosInstance, handleErrorResponse} from '../utils/helpers/fetch-wrapper.js'

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
  //
  async test() {
    try {
      const res = await api.get('/test')
      if (res === null || res.data === null) {
        return null
      }

      if (res.data.rtnCode !== '0000') {
        return {
          isSuccess: false,
          msg: res.data.rtnMsg
        }
      }

      // userHelper.setUser(res.data.data.userData);
      // userHelper.isLogin();

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
  },

  // 註冊(發驗證信)
  // async userRegister(user) {
  //     try {
  //         const res = await api.post('/users/signup', {
  //             email: user.email,
  //             password: user.password
  //         });

  //         if (res === null || res.data === null) {
  //             return null
  //         };

  //         if (res.data.rtnCode !== '0000') {
  //             return {
  //                 isSuccess: false,
  //                 msg: res.data.rtnMsg
  //             }
  //         };

  //         return {
  //             isSuccess: true,
  //             expiredAt: res.data.data.expireAt
  //         }
  //     } catch (error) {
  //         return {
  //             isSuccess: false,
  //             msg: error.response.data.rtnMsg
  //         }
  //     }
  // },
  // 登入
  async userLogin(user) {
    try {
      const res = await api.post('/backend-users/login', {
        account: user.account,
        password: user.password
      })

      if (res === null || res.data === null) {
        return null
      }

      if (res.data.rtnCode !== '0000') {
        return {
          isSuccess: false,
          msg: res.data.rtnMsg
        }
      }

      // userHelper.setUser(res.data.data.userData);
      // userHelper.isLogin();

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      // handleErrorResponse(error);
      // return handleError(error)
      return {
        isSuccess: false,
        msg: error.response?.data?.rtnMsg || '發生未知錯誤'
        // msg: error || '發生未知錯誤'
    };
    }
  },
  async emailCheck(email) {
    try {
      const res = await api.post('/password/emailcheck', {
        email: email
      })

      if (res === null || res.data === null) {
        return {
          isSuccess: false,
          msg: '未能接收到回應',
          // data: res.data
        }
      }

      if (res.data.rtnCode !== '0002') {
        return {
          isSuccess: false,
          msg: res.data.rtnMsg
        }
      }

      return {
        isSuccess: true,
        data: res.data
      }
    } catch (error) {
      return handleError(error)
    }
  },

  async sendVerificationEmail(obj) {
    try {
      // 發送請求到後端的驗證 API
      const res = await api.post('/verify', obj)

      if (!res || !res.data) {
        return {
          isSuccess: false,
          msg: '未能接收到回應'
        }
      }

      if (res.data.rtnCode !== '0002') {
        return {
          isSuccess: false,
          msg: res.data.rtnMsg,
        }
      }

      return {
        isSuccess: true,
        msg: res.data.rtnMsg,
        userAccount: res.data.userAccount
      }
    } catch (error) {
      return handleError(error)
    }
  },
  //忘記密碼-修改密碼
  // async passwordUpdate(obj) {
  //   try {
  //     const res = await api.put('/password/update', obj)

  //     if (!res || !res.data) {
  //       return {
  //         isSuccess: false,
  //         msg: '未能接收到回應'
  //       }
  //     }

  //     if (res.data.rtnCode !== '0002') {
  //       return {
  //         isSuccess: false,
  //         msg: res.data.rtnMsg,
  //       }
  //     }

  //     return {
  //       isSuccess: true,
  //       msg: res.data.rtnMsg,
  //     }
  //   } catch (error) {
  //     return handleError(error)
  //   }
  // },

  async passwordUpdate(obj){
    try {
        const res = await api.put(`/password/update`, obj);

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
},
async memberUpdatePsd(obj) {
  try {
    const res = await api.put('/member/password/update', obj)
    if (!res || !res.data) {
      return {
        isSuccess: false,
        msg: '未能接收到回應'
      }
    }

    if (res.data.rtnCode !== '0002') {
      return {
        isSuccess: false,
        msg: res.data.rtnMsg,
      }
    }

    return {
      isSuccess: true,
      msg: res.data.rtnMsg,
    }
  }catch (error) {
    return handleError(error)
  }
},
  // 重設密碼
  // async updatePassword(userId, token, newPassword) {
  //   try {
  //     const res = await api.post('/password/update', {
  //       frontUserId: userId,
  //       password: newPassword,
  //       token
  //     })

  //     if (!res?.data) {
  //       return { isSuccess: false, msg: '未能接收到回應' }
  //     }

  //     if (res.data.rtnCode !== '0000') {
  //       return { isSuccess: false, msg: res.data.rtnMsg }
  //     }

  //     return { isSuccess: true, msg: '密碼更新成功' }
  //   } catch (error) {
  //     return handleError(error)
  //   }
  // },
  async checkMemberEmail(data) {
    try {
      const response = await api.post('/members/email', data)
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
// 會員密碼修改
  async updatePassword(data) {
    try {
      const response = await api.put('/member/password/update', data)
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },

  // 信箱驗證(註冊)
  // async verifyRegister(verifyCode) {
  //     try {
  //         const res = await api.post('/users/signup/verify', { verifyCode });

  //         if (res === null || res.data === null) {
  //             return null
  //         };

  //         if (res.data.rtnCode !== '0000') {
  //             return {
  //                 isSuccess: false,
  //                 msg: res.data.rtnMsg
  //             }
  //         };

  //         return {
  //             isSuccess: true
  //         }
  //     } catch (error) {
  //         return {
  //             isSuccess: false,
  //             msg: error.response.data.rtnMsg
  //         }
  //     }
  // },
  // 登出
  async userLogout() {
    userHelper.removeLogin()
  },
  async backendUserLogout() {
    try {
      const response = await api.post('/backend-users/logout')
      return response.data
    } catch (error) {
      return handleError(error)
    }
  },
}
