<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div v-if="!verificationSuccess" class="sand-animation">
      <span v-if="currentIcon === 0"><Icon name="mdi-timer-sand" /></span>
      <span v-if="currentIcon === 1"
        ><Icon name="mdi-timer-sand-paused"
      /></span>
      <span v-if="currentIcon === 2"
        ><Icon name="mdi-timer-sand-complete"
      /></span>
      <span v-if="currentIcon === 3"
        ><Icon name="mdi-timer-sand-paused"
      /></span>
      <div>請稍候</div>
    </div>
    <div v-else>
      <ChangePassword />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import swalWithCustomStyles from '@/utils/sweetAlert'
import testSrv from '@/service/test.js'
import ChangePassword from '@/components/ForgotUpdatePassword.vue' // 假設修改密碼組件

export default {
  name: 'SandAnimation',
  components: { ChangePassword },
  setup() {
    const currentIcon = ref(0)
    const verificationSuccess = ref(false)
    const router = useRouter()

    const startAnimation = () => {
      setInterval(() => {
        currentIcon.value = (currentIcon.value + 1) % 4
      }, 500)
    }

    const tokenVerfy = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')
      const email = urlParams.get('email')
      console.log('urlParams.token:', token)
      console.log('urlParams.email:', email)

      if (!token || !email) {
        swalWithCustomStyles.fire({
          toast: true,
          position: 'center',
          title: '驗證連結格式不正確，請檢查後重新輸入',
          confirmButtonColor: '#0E2A34',
          confirmButtonText: '確認',
          background: '#F0F0F2',
          width: 400
        })
        router.push('/')
        window.location.reload()
        return
      }

      const obj = { email, token }

      try {
        const verifyResponse = await testSrv.sendVerificationEmail(obj)
        // console.log('verifyResponse3:', verifyResponse)
        // console.log('userAccount3:', verifyResponse.userAccount)

        if (verifyResponse.isSuccess) {
          swalWithCustomStyles
            .fire({
              toast: true,
              position: 'center',
              title: '您的信箱已成功驗證！',
              confirmButtonColor: '#0E2A34',
              confirmButtonText: '確認',
              background: '#F0F0F2',
              width: 400
            })
            .then(() => {
              const userAccount = verifyResponse.userAccount
              if (userAccount) {
                localStorage.setItem('userAccount', userAccount)
              }
              // console.log('userAccount', userAccount)
              // 驗證成功，顯示修改密碼界面
              verificationSuccess.value = true
            })
        } else {
          swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: verifyResponse.msg || '發送驗證郵件失敗',
            confirmButtonColor: '#0E2A34',
            confirmButtonText: '確認',
            background: '#F0F0F2',
            width: 400
          }).then(() => {
          router.push('/')
          window.location.reload();
          })
        }
      } catch (error) {
        swalWithCustomStyles.fire({
          toast: true,
          position: 'center',
          title: error.message || '請稍後再試',
          confirmButtonColor: '#0E2A34',
          confirmButtonText: '確認',
          background: '#F0F0F2',
          width: 400
        }).then(() => {
        router.push('/')
        // window.location.reload()
        })
      }finally{
        router.push('/')
        // console.log('finally')
      }
    }

    onMounted(() => {
      startAnimation()
      tokenVerfy()
    })

    return {
      currentIcon,
      verificationSuccess
    }
  }
}
</script>

<style scoped>
.sand-animation {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem; /* 可調整圖示大小 */
}
</style>
