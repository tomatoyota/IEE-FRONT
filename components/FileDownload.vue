<script setup>
import { computed } from 'vue';
// import { useAuthStore } from '@/stores/auth';
import { LoginStore } from '@/stores/LoginStore'

const props = defineProps({
  files: {
    type: Array,
    default: () => []
  },
  isMemberOnly: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '檔案下載'
  }
})

// 自訂變數
const userLogin = LoginStore()
const isLoggedIn = computed(() =>userLogin.userIsLogin);

// const authStore = useAuthStore();
// const isLoggedIn = computed(() => authStore.isLoggedIn);
const canDownload = computed(() => !props.isMemberOnly || isLoggedIn.value);
// 自訂函式

// lifeCycle
</script>
<template>
  <div>
    <div class="mb-10 flex items-center">
      <h3 class="font-semibold">{{ title }}</h3>
      <div
        v-if="isMemberOnly"
        class="ml-4 rounded-[18px] bg-logoColor px-4 py-2 text-sm text-white"
      >
        <!-- 會員限定 -->
         登入下載
      </div>
    </div>

    <div class="[&>*:not(:last-child)]:mb-5">
      <div
        v-if="files.length > 0"
        v-for="(data, index) in files"
        :key="index"
        class="flex flex-col items-start gap-4 rounded bg-[#eaeaea] p-6 md:flex-row md:items-center md:gap-20 md:px-8 md:py-4"
      >
        <div class="multiline-ellipsis flex-grow">
          {{ data.fileName }}
        </div>
        <!-- <div class="md:basis-[126px]">9999999MB</div> -->
        <a
        v-if="canDownload"
          :href="data.path"
          download=""
          target="_blank"
          class="box-border flex h-12 w-full items-center justify-center whitespace-nowrap rounded border border-[#6e6e6e] px-4 py-2 hover:bg-hoverColor md:w-auto md:px-6 md:py-3"
          >下載
        </a>
      </div>
      <div v-else>無相關檔案</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
