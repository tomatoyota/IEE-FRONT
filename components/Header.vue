<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useGlobalStore } from '@/stores/Global'
import { useAuthStore } from '@/stores/auth'
import testSrv from '@/service/test.js'
import { LoginStore } from '@/stores/LoginStore'
import { useRouter } from 'vue-router'
import userHelper from '@/utils/helpers/user.js'
import headerHelper from '@/utils/helpers/header.js'
import LoginComponent from '@/components/LoginComponent.vue'
import UpdatePassword from '~/components/UpdatePassword.vue'
import editSrv from '@/service/memberEditFront.js'
import { useUserStore } from '@/stores/UserStore'

const showResetPassword = ref(false)

const getUserLogin = () => {
  const userIsLogin = userHelper.getIsLogin()
  console.log(userIsLogin)
  return userIsLogin
}




const globalStore = useGlobalStore()
// const authStore = useAuthStore()
const loginStore = LoginStore()
const userStore = useUserStore()
const router = useRouter()

const isScrollToTop = computed(() => globalStore.scrollTop === 0)
const headerRef = ref(null)
const isclick = ref(false)
const isWindowNarrow = ref(false)

// const showLoginButton = computed(() => !authStore.isLoggedIn)
const showLoginButton = computed(() => {
  return !loginStore.userIsLogin
})

const showUserButton = computed(() => {
  return loginStore.userIsLogin
})

const handleResize = () => {
  isWindowNarrow.value = window.innerWidth < 1200 // 檢查視窗寬度
}
// const tokenVerfy = async (url) => {
//   // 提取 URL 參數
//   const urlParams = new URLSearchParams(url.split('?')[1])
//   const token = urlParams.get('token')
//   const email = urlParams.get('email')

//   console.log('token:', token)
//   console.log('email:', email)

//   if (!token || !email) {
//     console.log('驗證連結格式不正確，請檢查後重新輸入')
//     return
//   }

//   const obj = { email, token }

//   const verifyResponse = await testSrv.sendVerificationEmail(obj)
//   console.log('verifyResponse:', verifyResponse)

//   if (verifyResponse.isSuccess === true) {
//     showSuccess.value = true
//     rtnMsg.value = verifyResponse.rtnMsg
//     console.log('驗證郵件已發送到您的電子郵件地址:', verifyResponse)

//     const userAccount = verifyResponse.userAccount
//     if (userAccount) {
//       localStorage.setItem('userAccount', userAccount)
//       console.log('userAccount 已儲存:', userAccount)
//     } else {
//       console.warn('回應中未包含 userAccount')
//     }
//   } else {
//     console.error('發送驗證郵件失敗:', verifyResponse.msg)
//   }
// }

const navigateToGroupProfile = () => {
  const userId = loginStore.userProfile.userId
  // console.log('抓到ID:', userId);
  if (userId !== null) {
    editSrv.editGroupProfile(userId).then((res) => {
      console.log('response:', res)
      userStore.updateEditData(res.data.data)
    })
    router.push({
      path: '/groupProfile'
    })
  } else {
    console.error(
      '無法獲取 userId，請檢查用戶是否已登入或 localStorage 設置是否正確。'
    )
  }
}

const navigateToPresonalProfile = () => {
  const userId = loginStore.userProfile.userId
  if (userId !== null) {
    editSrv.editPersonalProfile(userId).then((res) => {
      // console.log('response:', res)
      userStore.updateEditData(res.data.data)
    })
    router.push('/personalProfile')
  } else {
    console.error(
      '無法獲取 userId，請檢查用戶是否已登入或 localStorage 設置是否正確。'
    )
  }
}

const toDashboard = () => {
  localStorage.setItem('isAdmin', 'true')
  // window.location.href = 'http://localhost:5173/admin';
  window.location.href = 'https://cieestage.gogotest.xyz/admin'
}

onMounted(() => {
  globalStore.headerOffsetH = headerRef.value.offsetHeight
  handleResize() // 初次載入時也要判斷一次視窗寬度
  window.addEventListener('resize', handleResize) // 綁定 resize 事件監聽器
  // 在掛載時從 localStorage 取得登入狀態
  const userProfile = userHelper.getUserProfile() // 從 localStorage 獲取 userProfile
  const userIsLogin = userHelper.getIsLogin() // 從 localStorage 獲取 userIsLogin


  if (userIsLogin && userProfile) {
    // 如果用戶已登入且有 profile 資訊，更新 store 狀態
    loginStore.updateLoginStatus(true)
    loginStore.updateUserProfile(userProfile)
    // console.log('登入資料1：',userProfile)
  } else {
    // 若未登入，清除狀態
    loginStore.updateLoginStatus(false)
    loginStore.clearUserProfile()
  }
  // const currentUrl = window.location.href
  // const paramsExist =
  //   currentUrl.includes('token') && currentUrl.includes('email')

  // if (paramsExist) {
  //   tokenVerfy(currentUrl)
  //   console.log('URL 參數存在，執行驗證程序')
  // }

  const needsPasswordReset = localStorage.getItem('needsPasswordReset') === 'true';
    if (needsPasswordReset) {
        showResetPassword.value = true;
        localStorage.removeItem('needsPasswordReset'); // 清理標記
    }
    const needsLogin = localStorage.getItem('needsLogin') === 'true';
    if (needsLogin) {
        showLoginDialog();
        localStorage.removeItem('needsLogin'); // 清理標記
    }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize) // 卸載時移除事件監聽器
})

// const loginResponse = response.data;
// authStore.setIsAdmin(loginResponse.isAdmin);  // 儲存 isAdmin
// authStore.setAccountType(loginResponse.data.frontUserData.account_type);  // 儲存 account_type

const loginDialog = ref(false)
const showLoginDialog = () => {
  loginDialog.value = true
}

const logout = () => {
  const headers = headerHelper.setHeader

  testSrv
    .userLogout() // 呼叫登出 API，若有 API 需要聯繫後端登出
    .then((response) => {
      console.log('成功登出')

      

      // 清除 localStorage 中的相關資料
      userHelper.removeLogin()

      // 更新 Pinia 狀態
      // const loginStore = LoginStore()
      // loginStore.setIsLogin(false) // 設定登出狀態
      // loginStore.setUserEmail('') // 清空用戶電郵
      userHelper.removeLogin(false)

      testSrv.backendUserLogout()
        .then(() => {
          console.log('後台 cookie 清理完成')
          localStorage.removeItem('cieebo-admin-user');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('cieeil');
        })
        .catch((error) => {
          console.log('清理後台 cookie 時發生錯誤：', error)
        })

      // 導回登入頁面或首頁
      router.push('/')
      window.location.reload()
    })
    .catch((error) => {
      console.log('登出時發生錯誤：', error)
    })
}
</script>

<template>
  <!-- v1.1.0 -->

  <header
    ref="headerRef"
    class="fixed top-0 z-40 w-full bg-white"
    :class="isScrollToTop ? 'header-top' : 'header-down'"
  >
    <div class="flex items-center justify-between px-4 py-3 md:px-6 xl:py-0">
      <!-- <div class="flex flex-wrap items-center justify-between py-5 xl:py-0"> -->
      <NuxtLink class="inline-block cursor-pointer" to="/">
        <img
          src="@/assets/images/logo_large.png"
          alt=""
          class="h-[40px] w-[228px] object-contain md:h-[48px] md:w-[276px]"
        />
      </NuxtLink>

      <div class="hidden flex-grow xl:block">
        <Navbar />
      </div>
      <!-- class="group flex items-center pl-6 md:justify-center xl:justify-end xl:py-3" -->
      <div v-if="showUserButton" class="group flex items-center pl-6">
        <div
          class="h-12 w-12 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
        ></div>
        <Icon name="ic:round-keyboard-arrow-down" class="icon ml-1s" />
        <ul
          class="submenuItem list-none hidden border-t-2 border-logoColor bg-white py-3 group-hover:block"
        >
          <li
            v-if="loginStore.userProfile.isAdmin"
            class="cursor-pointer whitespace-nowrap text-[#222222] hover:bg-[#222]/5"
          >
            <!-- href="" target="_blank" -->
            <a
              class="flex w-full items-center px-8 py-2 align-middle"
              @click="toDashboard()"
            >
              進入管理系統
            </a>
          </li>
          <!-- 根據 account_type 顯示不同選項 -->
          <li
            v-if="loginStore.userProfile.accountType === 1"
            class="cursor-pointer whitespace-nowrap text-[#222222] hover:bg-[#222]/5"
          >
            <div
              class="flex w-full items-center px-8 py-2 align-middle"
              @click.prevent="navigateToPresonalProfile"
            >
              更新個人會員資料
            </div>
          </li>
          <li
            v-if="loginStore.userProfile.accountType === 2"
            class="cursor-pointer whitespace-nowrap text-[#222222] hover:bg-[#222]/5"
          >
            <div
              class="flex w-full items-center px-8 py-2 align-middle"
              @click.prevent="navigateToGroupProfile"
            >
              更新團體會員資料
            </div>
          </li>
          <!-- account_type 為 3 時不顯示任何選項 -->
          <li
            class="cursor-pointer whitespace-nowrap text-[#222222] hover:bg-[#222]/5"
          >
            <button
              class="flex w-full items-center px-8 py-2 align-middle"
              @click="showResetPassword = true"
            >
              變更密碼
            </button>
          </li>
          <li
            class="cursor-pointer whitespace-nowrap text-[#222222] hover:bg-[#222]/5"
          >
            <button
              @click="logout"
              class="flex w-full items-center px-8 py-2 align-middle"
            >
              登出
            </button>
          </li>
        </ul>
      </div>

      <!-- 1200px 以下 -->
      <button
        v-if="showLoginButton"
        class="btn-link whitespace-nowrap"
        @click="showLoginDialog"
      >
        會員登入
      </button>
    </div>

    <div class="border-y border-[#EAEAEA] xl:hidden">
      <!-- :watchOptions="true" :options="{ suppressScrollY: true }" -->
      <Navbar :isClickMode="true" />
    </div>
  </header>

  <LoginComponent v-if="loginDialog" @closeMenu="loginDialog = false" />
  <!-- <button @click="showResetPassword = true">重設密碼</button> -->
  <UpdatePassword
    v-if="showResetPassword"
    @closeMenu="showResetPassword = false"
  />
</template>
<style lang="scss" scoped>
.logo {
  aspect-ratio: 276/48;
}
.header-top {
  will-change: box-shadow;
  transition: box-shadow 0.5s ease 0s;
  box-shadow: none;
}
.header-down {
  will-change: box-shadow;
  transition: box-shadow 0.5s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 4px;
}
.position-absolute {
  position: absolute;
  right: 15px;
  top: 60px;
}
.card {
  background-color: white;
}
.loginmenu {
  z-index: 2;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 保持全屏高度以便垂直居中 */
}
.btn-link {
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 12px 24px 12px 24px;
  border-color: rgb(0 0 0);
  height: 48px;
}

// .submenuItem {
//   display: none;
// }

.group:hover .submenuItem {
  display: block;
  position: absolute;
  top: 72px;
  z-index: 1;
}
@media (min-width: 768px) {
  .group:hover .submenuItem {
    display: block;
    position: absolute;
    top: 60px;
    // right: -10px;
  }
}
@media (min-width: 375px) {
  .group:hover .submenuItem {
    display: block;
    position: absolute;
    top: 60px;
    right: 20px;
  }
}

.menuItem {
  svg {
    transition: all 0.2s;

    &.icon.active {
      color: #1b2482;
      transform: rotate(180deg);
      transition: all 0.2s;
    }
  }

  &.active {
    color: #1b2482;
  }
}
.basement {
  bottom: -30px;
}
// ul {
//   list-style-type: none; /* 讓無序列表恢復圓點樣式 */
// }

// ol {
//   list-style-type: none; /* 讓有序列表恢復數字樣式 */
// }
// li {
//   list-style-type: none; /* 讓有序列表恢復數字樣式 */
// }
</style>
