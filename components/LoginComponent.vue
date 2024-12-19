<template>
  <div class="px-1">
    <!-- 半透明黑色背景層 -->
    <div :class="overlayClass"></div>

    <div class="d-lg-flex login-container model-width mx-auto my-auto rounded">
      <!-- <v-card class="d-lg-flex mx-auto " flat> -->
      <div class="absolute right-4 top-4">
        <Icon
          name="mi:close"
          class="outlinkIcon text-2xl"
          @click="$emit('closeMenu')"
        />
      </div>
      <div class="my-auto">
        <div
          v-if="
            currentView === 'accountEnquiry' || currentView === 'forgotPassword'
          "
          class="mb-4 flex flex-row"
        >
          <button
            @click="changeView('login')"
            class="absolute left-4 top-4 flex-auto"
          >
            <div class="flex flex-row gap-1">
              <div>
                <Icon name="mi:chevron-left" class="outlinkIcon text-2xl" />
              </div>
              <div>返回</div>
            </div>
          </button>
          <div class="absolute right-4 top-4">
            <Icon
              name="mi:close"
              class="outlinkIcon text-2xl"
              @click="$emit('closeMenu')"
            />
          </div>
        </div>
        <!-- 登入 -->
        <div v-if="currentView === 'login'">
          <dev v-if="changePsd" class="flex flex-col justify-center">
            <h1 class="mb-2 py-2 text-3xl font-bold">變更預設密碼</h1>
            <div class="mb-8">
              登入成功！為確保帳戶安全，建議您立即變更預設密碼
            </div>
            <button
              @click="goToChangePsdHandler"
              class="mb-6 flex-1 rounded-lg bg-gray-900 py-4 font-thin text-gray-100"
            >
              變更預設密碼
            </button>
            <button
              @click="skipPasswordChangeHandler"
              class="flex-1 rounded-lg border border-gray-900 py-4 font-thin text-gray-900"
            >
              稍後在說
            </button>
          </dev>
          <!-- input -->
          <dev v-else>
            <h1 class="mb-2 py-2 text-3xl font-bold">會員登入</h1>

            <!-- 錯誤訊息 -->
            <div v-if="showErrorMsg" class="alert">
              <Icon
                name="mdi-close-circle-outline"
                class="outlinkIcon mr-4 text-2xl"
              />

              <div class="flex-1">{{ rtnMsg }}</div>
            </div>
            <form
              class="flex flex-col justify-center"
              @submit.prevent="loginUser"
            >
              <div class="mb-10">
                <label class="mb-5 block">
                  <span
                    class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
                  >
                    會員證號
                  </span>
                  <div
                    class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
                  >
                    <input
                      class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                      type="text"
                      v-model="account"
                      placeholder="請輸入會員證號"
                    />
                  </div>
                </label>

                <label class="block">
                  <span
                    class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
                  >
                    密碼
                  </span>
                  <div
                    class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
                  >
                    <input
                      class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      v-model="password"
                      placeholder="請輸入密碼"
                      autocomplete="current-password"
                    />
                    <div class="eyeButton">
                      <span style="cursor: pointer" @click="toggleShowPassword"
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
                </label>
              </div>

              <!-- <button
            class="mb-10 rounded-lg bg-gray-900 px-36 py-4 font-thin text-gray-100"
            type="submit"
            
          >
            登入
          </button> -->
              <button
                class="mb-10 rounded-lg bg-gray-900 px-36 py-4 font-thin text-gray-100"
                @click="login"
              >
                登入
              </button>
              <!-- <button @click="logout">登出</button> -->
            </form>

            <div class="flex flex-row justify-between">
              <button
                @click="changeView('accountEnquiry')"
                class="text-base font-bold text-blue-900 underline decoration-blue-900 decoration-2"
              >
                查詢會員證號
              </button>
              <button
                @click="changeView('forgotPassword')"
                class="text-base font-bold text-blue-900 underline decoration-blue-900 decoration-2"
              >
                忘記密碼
              </button>
            </div>

            <div class="my-10">
              <p class="text-sm">
                若需要幫助或有任何疑問，請透過02-27075885或<a
                  class="font-normal text-blue-900 underline decoration-blue-900"
                  >ciee@ms35.hinet.net</a
                >聯繫我們
              </p>
            </div>
          </dev>
        </div>

        <!-- 查詢會員證號 -->
        <div v-else-if="currentView === 'accountEnquiry'">
          <div class="my-auto grid gap-4">
            <h1 class="py-2 text-3xl font-bold">查詢會員證號</h1>

            <!-- 成功時顯示訊息 -->
            <div v-if="showSuccessMsg" class="flex flex-col">
              <div class="sussess">
                <Icon
                  name="mdi-check-circle-outline"
                  class="outlinkIcon mr-4 text-2xl"
                />
                <div class="flex-1">{{ rtnMsg }}</div>
              </div>
              <div class="mb-12">
                如未收到該電子郵件，請檢查您的垃圾郵件資料夾。該郵件是由<span
                  class="font-bold"
                  >ciee@ms35.hinet.net</span
                >所寄出
              </div>
              <button
                @click="changeView('login')"
                class="mb-10 flex-1 rounded-lg bg-gray-900 px-28 py-4 font-thin text-gray-100"
              >
                返回會員登入
              </button>
            </div>
            <!-- 查詢會員證號表單頁面 -->
            <div v-if="checkMemberFrom">
              <div class="mb-3 text-base font-normal">
                查詢個人會員證號請填寫下列資訊，查詢團體會員證號請透過02-27075885聯繫管理員
              </div>
              <form
                class="flex flex-col justify-center"
                @submit.prevent="checkMember"
              >
                <div class="mb-10">
                  <!-- 錯誤訊息 -->
                  <div v-if="showErrorMsg" class="alert">
                    <Icon
                      name="mdi-close-circle-outline"
                      class="outlinkIcon mr-4 text-2xl"
                    />

                    <div class="flex-1">
                      {{ rtnMsg }}
                    </div>
                  </div>

                  <label class="mb-5 block">
                    <span
                      class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
                    >
                      會員姓名
                    </span>
                    <div
                      class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
                    >
                      <input
                        class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        v-model="chineseName"
                        placeholder="請輸入會員姓名"
                        aria-label="chineseName"
                      />
                    </div>
                  </label>

                  <label class="block">
                    <span
                      class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
                    >
                      電子信箱
                    </span>
                    <div
                      class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
                    >
                      <input
                        class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                        id="email"
                        v-model="email"
                        placeholder="請輸入申請會員時登記的信箱"
                      />
                    </div>
                  </label>
                </div>

                <button
                  class="px-auto rounded-lg bg-gray-900 py-4 font-thin text-gray-100"
                  type="submit"
                >
                  發送會員證號
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- 忘記密碼 -->
        <div v-else-if="currentView === 'forgotPassword'">
          <div class="my-auto grid">
              <h1 class="py-2 text-3xl font-bold">忘記密碼</h1>
              <div class="text-base font-normal my-4">
                個人會員忘記密碼請填寫下列資訊，團體會員忘記密碼請透過02-27075885聯繫管理員
              </div>
            <!-- 錯誤提示 -->
            <div v-if="emailErrormsg" class="alert">
              <Icon
                name="mdi-close-circle-outline"
                class="outlinkIcon mr-4 text-2xl"
              />

              <div class="flex-1">{{ rtnMsg }}</div>
            </div>
            <!-- 成功提示 -->
            <div v-else-if="emailSent" class="flex flex-col">
              <!-- <div v-if="emailSentErr" class="alert">
              <Icon
                name="mdi-close-circle-outline"
                class="outlinkIcon mr-4 text-2xl"
              />

              <div class="flex-1">{{ rtnMsg }}</div>
            </div> -->
              <div class="sussess">
                <Icon
                  name="mdi-check-circle-outline"
                  class="outlinkIcon mr-4 text-2xl"
                />
                <div class="flex-1">{{ rtnMsg }}</div>
              </div>
              <!-- <form
                class="flex flex-col justify-center"
                @submit.prevent="tokenVerfy"
              >
                <div class="mb-10">
                  <label class="block">
                    <span
                      class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
                    >
                      驗證連結
                    </span>
                    <div
                      class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
                    >
                      <input
                        class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                        id="token&email"
                        v-model="verfyUrl"
                        placeholder="請至信箱收取連結並填寫於此"
                      />
                    </div>
                    <p v-if="emailSentErr" class="text-xs text-rose-600">
                      {{ ErrrtnMsg }}
                    </p>
                  </label>
                </div>

                <button
                  class="px-auto mb-10 rounded-lg bg-gray-900 py-4 font-thin text-gray-100"
                  type="submit"
                >
                  驗證
                </button>
              </form> -->
              <button
                  @click="changeView('login')"
                  class="mb-10 flex-1 rounded-lg bg-gray-900 px-auto py-4 font-thin text-gray-100"
                >
                  返回會員登入
                </button>
            </div>
            <!-- 更新密碼 -->
            <div v-if="update" class="update-content">
              <!-- 成功時顯示訊息 -->
              <div v-if="updateSuccess" class="flex flex-col">
                <div class="sussess">
                  <Icon
                    name="mdi-check-circle-outline"
                    class="outlinkIcon mr-4 text-2xl"
                  />
                  <div class="flex-1">{{ rtnMsg }}</div>
                </div>

                <button
                  @click="changeView('login')"
                  class="mb-10 flex-1 rounded-lg bg-gray-900 px-32 py-4 font-thin text-gray-100"
                >
                  返回會員登入
                </button>
              </div>
              <div v-else>
                <div class="text-base font-normal">驗證通過，請輸入新密碼</div>
                <form
                  class="flex flex-col justify-center"
                  @submit.prevent="updatePassword"
                >
                  <div class="mb-10">
                    <label class="block">
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
                          id="newPassword"
                          v-model="newPassword"
                          placeholder="至少8個字元且須包含英文字母與數字"
                          @blur="validatePassword"
                        />
                        <!-- // TODO 密碼規則 -->
                      </div>

                      <div v-if="showValidation" class="mt-2">
                        <div class="flex items-center">
                          <Icon
                            :name="isLengthValid ? 'mdi:check' : 'mdi:close'"
                            :class="
                              isLengthValid ? 'text-green-700' : 'text-rose-600'
                            "
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
                            :class="
                              hasLetter ? 'text-green-700' : 'text-rose-600'
                            "
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
                            :class="
                              hasNumber ? 'text-green-700' : 'text-rose-600'
                            "
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
                  </div>

                  <button
                    class="px-auto mb-10 rounded-lg bg-gray-900 py-4 font-thin text-gray-100"
                    type="submit"
                    :disabled="!isPasswordValid"
                  >
                    確認
                  </button>
                </form>
              </div>
            </div>
            <!-- 填寫電子郵件 -->
            <div v-if="!emailSent && !update && !emailErrormsg">
              <div v-if="rtnMsg" class="alert">
              <Icon
                name="mdi-close-circle-outline"
                class="outlinkIcon mr-4 text-2xl"
              />

              <div class="flex-1">{{ rtnMsg }}</div>
            </div>
              <!-- <div class="mb-6 text-base font-normal">
                個人會員忘記密碼請填寫下列資訊，團體會員忘記密碼請透過02-27075885聯繫管理員
              </div> -->

              <form
                class="flex flex-col justify-center"
                @submit.prevent="checkEmail"
              >
                <div class="mb-10">
                  <label class="block">
                    <span
                      class="mb-2 block text-base font-normal text-slate-500 after:ml-0.5"
                    >
                      電子信箱
                    </span>
                    <div
                      class="flex items-center border-b border-slate-300 bg-white px-2 py-2"
                    >
                      <input
                        class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
                        id="email"
                        v-model="email"
                        placeholder="請輸入申請會員時登記的信箱"
                      />
                    </div>
                  </label>
                </div>

                <button
                  class="px-auto mb-10 rounded-lg bg-gray-900 py-4 font-thin text-gray-100"
                  @click="submit"
                >
                  發送重設密碼連結
                </button>
              </form>
            </div>
          </div>
          <div class="my-10">
            <p class="text-sm">
              若需要幫助或有任何疑問，請透過02-27075885或<a
                class="font-normal text-blue-900 underline decoration-blue-900"
                >ciee@ms35.hinet.net</a
              >聯繫我們
            </p>
          </div>
        </div>
      </div>
      <!-- </v-card> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import testSrv from '@/service/test.js'
import { LoginStore } from '@/stores/LoginStore'
import userHelper from '@/utils/helpers/user.js'
import headerHelper from '@/utils/helpers/header.js'
import user from '@/utils/helpers/user.js'
// import { emailCheck } from '@/service/test.js'

// loading
// const loading = ref(false)
const emit = defineEmits(['closeMenu'])

const currentView = ref('login')
const changeView = (view) => {
  rtnMsg.value = ''; // 重置 rtnMsg
  showErrorMsg.value = false;
  showSuccessMsg.value = false;
  currentView.value = view // 切換到指定的視圖
  // emailErrorMsg.value = false;
  showSuccess.value = false;
  emailSent.value = false;
  checkMemberFrom.value = true;
  
}
const overlayClass = ref('fullscreen-overlay')
const account = ref('')
const password = ref('')
const chineseName = ref('')
const email = ref('')
const verfyUrl = ref('')
const showPassword = ref(false)
const loginResponse = ref(null)
const errorResponse = ref(null)

const changePsd = ref(false)
// const showErrormsg = ref(false)
const emailErrormsg = ref(false)
const emailSentErr = ref(false)
const ErrrtnMsg = ref('')

const showSuccess = ref(false)

const emailInput = ref(true)
const emailSent = ref(false)
const update = ref(false)
const newPassword = ref('')
const showValidation = ref(false)
const isLengthValid = ref(false)
const hasLetter = ref(false)
const hasNumber = ref(false)

const checkMemberFrom = ref(true)
const showSuccessMsg = ref(false)
const showErrorMsg = ref(false)
const rtnMsg = ref('')

const updateSuccess = ref(false)

const router = useRouter()
// const authStore = useAuthStore()

const valid = ref(false)
let resolveUserChoice // 用於儲存 Promise 的解決函數

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const handleResize = () => {
  overlayClass.value =
    window.innerWidth >= 1280
      ? 'fullscreen-overlay'
      : 'fullscreen-overlay-mobile'
}

onMounted(() => {
  handleResize() // 初始化時檢查螢幕寬度
  window.addEventListener('resize', handleResize)

  try {
    const profile = userHelper.getUserProfile()
  } catch (error) {
    console.error('userHelper 尚未初始化:', error)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

// 登入方法
const userLogin = LoginStore()

const login = async () => {
  showErrorMsg.value = false
  changePsd.value = false
  // 檢查表單是否有效
  if (!account.value.trim() || !password.value.trim()) {
    showErrorMsg.value = true
    rtnMsg.value = '請填寫會員證號和密碼'
    return
  }

  const headers = headerHelper.setHeader
  try {
    const response = await testSrv.userLogin(
      { account: account.value, password: password.value },
      { headers }
    )
    if (!response.isSuccess === true) {
      //錯誤處理
      showErrorMsg.value = true
      rtnMsg.value = response.msg
    } else {
      const userData = response.data.isAdmin
        ? response.data.data.backendUserId
        : response.data.data.frontUserData.front_user_id

      const userProfile = {
        userId: userData,
        isAdmin: response.data.isAdmin,
        passwordChange: response.data.passwordChange,
        payment: response.data.payment,
        accountType: response.data.isAdmin
          ? ''
          : response.data.data.frontUserData.account_type
      }

      userLogin.updateLoginStatus(true)
      userLogin.updateUserProfile(userProfile)

      localStorage.setItem('user-profile', JSON.stringify(userProfile))
      localStorage.setItem('this-user', JSON.stringify(userData))

      const CIEEil = userLogin.getIsLogin()
      localStorage.setItem('cieeil', CIEEil)

      userHelper.setIsLogin(true)
      userHelper.setUserProfile(userProfile)

      //cookie
      const isAdmin = true
      document.cookie = `isAdmin=${isAdmin}; path=/; max-age=3600; secure`

      const ProfileData = JSON.parse(localStorage.getItem('user-profile'))
      const hasChangedPassword = ProfileData ? ProfileData.passwordChange : null

      if (hasChangedPassword === true) {
        changePsd.value = true
        // 等待用戶操作完成
        await waitForUserChoice()
      } else if (hasChangedPassword === false) {
        // console.log('用戶已經更改過密碼')
      } else {
        console.log('無法獲取密碼狀態')
      }

      router.push('/')
      emit('closeMenu')
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
    if (error.response && error.response.status === 401) {
      console.log('帳號或密碼錯誤')
      showErrorMsg.value = true
      rtnMsg.value = '帳號或密碼錯誤'
    } else if (error.code === 'ECONNABORTED') {
      console.log('請求超時，請稍後再試')
      showErrorMsg.value = true
      rtnMsg.value = '請求超時，請稍後再試'
    } else {
      console.log('發生未知錯誤，請稍後再試')
      showErrorMsg.value = true
      rtnMsg.value = '發生未知錯誤，請稍後再試'
    }
  }
}

const waitForUserChoice = () => {
  return new Promise((resolve) => {
    resolveUserChoice = resolve
  })
}
const goToChangePsdHandler = () => {
  goToChangePsd()
  // console.log('用戶選擇了變更密碼')
  if (resolveUserChoice) resolveUserChoice() // 解決 Promise
}
const skipPasswordChangeHandler = () => {
  skipPasswordChange()
  // console.log('用戶選擇了稍後再說')
  if (resolveUserChoice) resolveUserChoice() // 解決 Promise
}

const goToChangePsd = () => {
  localStorage.setItem('needsPasswordReset', 'true')
}

const skipPasswordChange = () => {
  changePsd.value = false // 隱藏提示
}

const emailRule = [
      (v) => !!v || '此欄位為必填',
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '電子郵件格式不正確'
    ]
const checkEmail = async () => {
  emailErrormsg.value = false
  emailSent.value = false
  update.value = false
  emailSentErr.value = false
 
  // if (!email.value.trim()) {
  //   emailErrormsg.value = true
  //   rtnMsg.value = '請輸入有效的電子郵件地址'
  //   console.log('請輸入有效的電子郵件地址')
  //   return
  // }
  for (let rule of emailRule) {
    const result = rule(email.value);
    if (result !== true) {
      // emailErrormsg.value = true;
      rtnMsg.value = result; // 顯示錯誤訊息
      return;
    }
  }

  try {
    // 呼叫 testSrv.emailCheck 函數，將電子郵件傳遞過去
    const response = await testSrv.emailCheck(email.value)
    if (response.isSuccess) {
      // 如果驗證通過發送帶有 token 的郵件 API
      emailInput.value = false
      emailSent.value = true
      rtnMsg.value = response.data.rtnMsg
    } else {
      // alert('電子郵件無效或不存在');
      // emailErrormsg.value = ture
      // console.error('電子郵件檢查失敗1:', response)
      // emailSentErr.value = true
      rtnMsg.value = response.msg
    }
  } catch (error) {
    // emailErrormsg.value = true
    // console.error('電子郵件檢查失敗2:', error)
    // emailSentErr.value = true
    rtnMsg.value = response.msg
  }
}
const tokenVerfy = async () => {
  update.value = false

  const input = verfyUrl.value.trim()

  // if (!input) {
  //   VerfyErrormsg.value = true
  //   rtnMsg.value = '請輸入驗證連結'
  //   return
  // }

  const urlParams = new URLSearchParams(input.split('?')[1])
  const token = urlParams.get('token')
  const email = urlParams.get('email')
  console.log('token:', token)
  console.log('email:', email)
  if (!token || !email) {
    // emailErrormsg.value = true
    // rtnMsg.value = '驗證連結格式不正確，請檢查後重新輸入'
    console.log('驗證連結格式不正確，請檢查後重新輸入')
    return
  }
  const obj = {
    email: email,
    token: token
  }

  const verifyResponse = await testSrv.sendVerificationEmail(obj)
  console.log('verifyResponse:', verifyResponse)
  if (verifyResponse.isSuccess === true) {
    // alert('驗證郵件已發送到您的電子郵件地址');
    emailSentErr.value = false
    showSuccess.value = true
    rtnMsg.value = verifyResponse.rtnMsg
    console.log('驗證郵件已發送到您的電子郵件地址:', verifyResponse)
    const userAccount = verifyResponse.userAccount
    if (userAccount) {
      localStorage.setItem('userAccount', userAccount)
      console.log('userAccount 已儲存:', userAccount)
    } else {
      console.warn('回應中未包含 userAccount')

      rtnMsg.value = verifyResponse.rtnMsg
    }
    emailSent.value = false
    update.value = true
  } else {
    // alert('發送驗證郵件失敗: ' + verifyResponse.msg);
    // emailErrormsg.value = ture
    emailSentErr.value = true
    ErrrtnMsg.value = verifyResponse.msg
    console.log('發送驗證郵件失敗:', verifyResponse)
  }
}


const isPasswordValid = computed(
  () => isLengthValid.value && hasLetter.value && hasNumber.value
);
const validatePassword = () => {
  const value = newPassword.value;

  isLengthValid.value = value.length >= 8;
  hasLetter.value = /[a-zA-Z]/.test(value);
  hasNumber.value = /[0-9]/.test(value);

  showValidation.value = true;
};

const updatePassword = async () => {
  updateSuccess.value = false
  if (!isPasswordValid.value) {
    console.error("密碼無效，請檢查輸入");
    return;
  }
  console.log('newPassword:', newPassword.value)
  const userAccount = localStorage.getItem('userAccount')
  // const cleanUserAccount = JSON.parse(userAccount) // 移除多餘的引號

  const obj = {
    frontUserId: userAccount,
    password: newPassword.value
  }

  const response = await testSrv.passwordUpdate(obj)
  console.log('response:', response)
  try {
    if (response.isSuccess === true) {
      // update.value = false
      updateSuccess.value = true
      // alert('密碼已更新');
      console.log('密碼已更新:', response)
      rtnMsg.value = response.data.rtnMsg

      // showSuccess.value = true
    } else {
      // alert('密碼更新失敗: ' + response.msg);
      console.error('密碼更新失敗:', response.msg)
      // emailErrormsg.value = ture
      rtnMsg.value = response.msg
    }
  } catch (error) {
    // alert('密碼更新時發生錯誤');
    console.error('密碼更新時發生錯誤:', error)
  }
}
const checkMember = async () => {
  checkMemberFrom.value = true
  showErrorMsg.value = false // 初始化錯誤顯示'
  showSuccessMsg.value = false // 初始化成功顯示
  rtnMsg.value = '' // 清空訊息
  if (
    !chineseName.value ||
    !chineseName.value.trim() ||
    !email.value ||
    !email.value.trim()
  ) {
    showErrorMsg.value = true
    rtnMsg.value = '請填寫會員姓名和電子信箱'
    return
  }

  const data = {
    chineseName: chineseName.value,
    email: email.value
  }

  try {
    const response = await testSrv.checkMemberEmail(data)
  

    if (response.rtnCode === '0000') {
      checkMemberFrom.value = false
      showErrorMsg.value = false
      showSuccessMsg.value = true // 顯示成功訊息
      rtnMsg.value = response.rtnMsg || '會員資訊已發送'
    } else {
      showErrorMsg.value = true // 顯示錯誤訊息
      rtnMsg.value = response.rtnMsg || '找不到該會員姓名或信箱'
    }
  } catch (error) {
    showErrorMsg.value = true
    rtnMsg = response.rtnMsg || '查詢時發生錯誤，請稍後再試'
    console.error('查詢會員失敗:', error)
    // alert('查詢時發生錯誤，請稍後再試')
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
}

.alert {
  background-color: rgba(27, 36, 130, 0.2);
  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0.75rem 0;
}
.sussess {
  background-color: rgba(111, 190, 159, 0.2);

  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
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
