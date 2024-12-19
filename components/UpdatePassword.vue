<template>
  <div class="px-1">
    <!-- 半透明黑色背景層 -->
    <div :class="overlayClass"></div>
    <div class="d-lg-flex login-container model-width mx-auto my-auto rounded">
      <div class="absolute right-4 top-4">
        <Icon
          name="mi:close"
          class="outlinkIcon text-2xl"
          @click="$emit('closeMenu')"
        />
      </div>
      
      <div v-if="showSusses" class="my-auto">
        <h1 class="mb-10 py-2 text-3xl font-bold">變更密碼</h1>
        <div class="flex flex-col">
          <div class="sussess">
            <Icon
              name="mdi-check-circle-outline"
              class="outlinkIcon mr-4 text-2xl"
            />
            <div class="flex-1">密碼變更成功</div>
          </div>
          <p class="mb-8">請務必牢記您的密碼，並使用新密碼重新登入</p>
          <button
            @click="loginAgain"
            class="mb-10 flex-1 rounded-lg bg-gray-900 px-32 py-4 font-thin text-gray-100"
          >
            重新登入
          </button>
        </div>
      </div>
      <div v-else class="my-auto">
        <h1 class="mb-10 py-2 text-3xl font-bold">變更密碼</h1>
        <div v-show="showErrormsg" class="alert">
          <Icon
            name="mdi-close-circle-outline"
            class="outlinkIcon mr-4 text-2xl"
          />

          <div class="flex-1">{{ rtnMsg }}</div>
        </div>

        <form
          class="flex flex-col justify-center"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-10">
            <label
              for="password"
              class="mb-2 block grid gap-1 text-base font-normal text-slate-500 after:ml-0.5"
            >
              <span
                class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
              >
                新密碼
              </span>

              <div
                class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
              >
                <input
                  class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  id="password"
                  placeholder="至少8個字元且須包含英文字母與數字"
                  required
                  @blur="validatePassword"
                />
                <div class="eyeButton">
                  <span
                    style="cursor: pointer"
                    @click="toggleShowPassword('password')"
                    ><Icon
                      :name="
                        showPassword
                          ? 'humbleicons:eye'
                          : 'humbleicons:eye-close'
                      "
                      class="outlinkIcon mr-1 text-2xl"
                    />
                  </span>
                </div>
              </div>

              <div v-if="showValidation" class="mt-2">
                <div class="flex items-center">
                  <Icon
                    :name="isLengthValid ? 'mdi:check' : 'mdi:close'"
                    :class="isLengthValid ? 'text-green-700' : 'text-rose-600'"
                    class="outlinkIcon text-2xl"
                  />
                  <p
                    :class="
                      isLengthValid
                        ? 'text-sm text-green-600'
                        : 'text-sm text-rose-500'
                    "
                  >
                    至少8個字元
                  </p>
                </div>
                <div class="flex items-center">
                  <Icon
                    :name="hasLetter ? 'mdi:check' : 'mdi:close'"
                    :class="hasLetter ? 'text-green-700' : 'text-rose-600'"
                    class="outlinkIcon text-2xl"
                  />
                  <p
                    :class="
                      hasLetter
                        ? 'text-sm text-green-600'
                        : 'text-sm text-rose-500'
                    "
                  >
                    包含英文字母
                  </p>
                </div>
                <div class="flex items-center">
                  <Icon
                    :name="hasNumber ? 'mdi:check' : 'mdi:close'"
                    :class="hasNumber ? 'text-green-700' : 'text-rose-600'"
                    class="outlinkIcon text-2xl"
                  />
                  <p
                    :class="
                      hasNumber
                        ? 'text-sm text-green-600'
                        : 'text-sm text-rose-500'
                    "
                  >
                    包含數字
                  </p>
                </div>
              </div>
            </label>
            <label class="mb-10 block" for="confirmPassword">
              <span
                class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
              >
                確認新密碼
              </span>
              <div
                class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
              >
                <input
                  class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  placeholder="請再次輸入新密碼"
                  autocomplete="current-password"
                  required
                />
                <div class="eyeButton">
                  <span
                    style="cursor: pointer"
                    @click="toggleShowPassword('confirmPassword')"
                    ><Icon
                      :name="
                        showConfirmPassword
                          ? 'humbleicons:eye'
                          : 'humbleicons:eye-close'
                      "
                      class="outlinkIcon mr-1 text-2xl"
                    />
                  </span>
                </div>
              </div>
              <p v-if="ValidationErr" class="text-xs text-rose-600">
                {{ rtnMsg }}
              </p>
            </label>
          </div>

          <button
            type="submit"
            class="mb-10 rounded-lg bg-gray-900 px-36 py-4 font-thin text-gray-100"
          >
            提交
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import testSrv from '@/service/test'
import userHelper from '@/utils/helpers/user.js'
import headerHelper from '@/utils/helpers/header.js'
import { Icon } from '@iconify/vue'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const overlayClass = ref('fullscreen-overlay')
    const handleResize = () => {
      overlayClass.value =
        window.innerWidth >= 1280
          ? 'fullscreen-overlay'
          : 'fullscreen-overlay-mobile'
    }
    // 用於存儲用戶的密碼和確認密碼

    const password = ref('')
    const confirmPassword = ref('')

    const showPassword = ref(false)
    const showConfirmPassword = ref(false)

    const rtnMsg = ref('')
    const showErrormsg = ref(false)
    const showSusses = ref(false)

    const showValidation = ref(false)
    const isLengthValid = ref(false)
    const hasLetter = ref(false)
    const hasNumber = ref(false)

    const ValidationErr = ref(false)

    const toggleShowPassword = (field) => {
      if (field === 'password') {
        showPassword.value = !showPassword.value
      } else if (field === 'confirmPassword') {
        showConfirmPassword.value = !showConfirmPassword.value
      }
    }

    const validatePassword = () => {
      const value = password.value

      // 檢查密碼條件
      isLengthValid.value = value.length >= 8
      hasLetter.value = /[a-zA-Z]/.test(value)
      hasNumber.value = /[0-9]/.test(value)
      const hasInvalidSpecialChar = /[^a-zA-Z0-9!@#$%^&*]/.test(value)
      // 顯示條件檢查結果
      showValidation.value = true

      return (
        !hasInvalidSpecialChar &&
        isLengthValid.value &&
        hasLetter.value &&
        hasNumber.value
      )
    }

    onMounted(() => {
      handleResize() // 初始化時檢查螢幕寬度
      window.addEventListener('resize', handleResize)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })
    const closeMenu = () => {}
    // 取得 URL 中的 token
    const token = route.params.token

    const handleSubmit = async () => {
      showErrormsg.value = false
      showSusses.value = false
      rtnMsg.value = ''

      const frontUserId = localStorage.getItem('this-user')
      const cleanUserId = JSON.parse(frontUserId) // 移除多餘的引號
      const isPasswordValid = validatePassword()
      // 驗證密碼條件
      if (!isPasswordValid) {
        showErrormsg.value = true
        showSusses.value = false
        console.log('密碼條件不符合')

        rtnMsg.value =
          '密碼必須至少8個字元，包含英文字母、數字，以及特殊符號 (!@#$%^&*)'

        console.log('showErrormsg:', showErrormsg.value)
        console.log('rtnMsg:', rtnMsg.value)
        return
      }
      // 驗證密碼與確認密碼是否一致
      if (password.value !== confirmPassword.value) {
        showErrormsg.value = true
        showSusses.value = false
        console.log('密碼與確認密碼不一致')
        rtnMsg.value = '密碼與確認密碼不一致'

        console.log('showErrormsg:', showErrormsg.value)
        console.log('rtnMsg:', rtnMsg.value)

        return
      }

      const obj = {
        frontUserId: cleanUserId,
        password: password.value
      }
      try {
        // 呼叫 API 更新密碼
        const response = await testSrv.passwordUpdate(obj)
        if (response.isSuccess === true) {
          console.log('密碼更新成功:', response)
          showSusses.value = true
          // router.push('/login') // 密碼更新成功後重定向到登入頁面
        } else {
          showErrormsg.value = true
          rtnMsg.value = response.data.rtnMsg
          console.log('密碼更新失敗:', response.msg)
        }
      } catch (error) {
        showErrormsg.value = true
        rtnMsg.value = error.response?.data?.rtnMsg || '更新密碼時發生未知錯誤'
        // alert('更新密碼時發生錯誤')
        console.error(error)
      }
    }

    const loginAgain = () => {
      const headers = headerHelper.setHeader
      localStorage.setItem('needsLogin', 'true')
      testSrv
        .userLogout() // 呼叫登出 API，若有 API 需要聯繫後端登出
        .then((response) => {
          console.log('成功登出')
          userHelper.removeLogin()
          userHelper.removeLogin(false)

          // 導回登入頁面或首頁
          router.push('/')
          window.location.reload()
          localStorage.setItem('needsLogin', 'true')
        })
        .catch((error) => {
          console.log('登出時發生錯誤：', error)
        })
    }

    return {
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      toggleShowPassword,
      handleSubmit,
      overlayClass,
      validatePassword,
      showValidation,
      isLengthValid,
      hasLetter,
      hasNumber,
      loginAgain,
      showErrormsg,
      rtnMsg,
      showSusses
    }
  }
}
</script>

<style scoped>
.fullscreen-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.fullscreen-overlay-mobile {
  background: #f8f8f8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.login-container {
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 20px;
  background-color: #f8f8f8;
}

.alert {
  background-color: rgba(27, 36, 130, 0.2);
  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
}
.sussess {
  background-color: rgba(111, 190, 159, 0.2);

  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
}
/* .AccountEnquiry-width {
  @media (min-width: 1280px) {
    max-width: 423px;
    height: 600px;
    background-color: #f8f8f8;
    padding: 10px 40px 40px 40px;
  }
  padding: 50px 40px 40px 40px;
  top: 96px;
} */
</style>
