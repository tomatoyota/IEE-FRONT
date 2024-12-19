<script setup>
// 第三方套件變數

// 自訂變數

// 自訂函式

// lifeCycle
</script>
<template>
  <footer class="mt-[30px] md:mt-[40px] xl:mt-[60px]">
    <div class="bg-logoColor">
      <div class="wrapper">
        <div
          class="flex flex-col gap-6 py-4 text-sm text-white md:flex-row md:gap-8 md:py-6 md:text-base"
        >
          <div>
            <div class="mb-1 text-white/[0.6]">服務資訊</div>
            <div class="mb-1">郵政劃撥帳號：00133442</div>
            <div>戶名：中國電機工程學會謝繼茂</div>
          </div>
          <div>
            <div class="mb-1 text-white/[0.6]">學會會址</div>
            <div class="mb-1">週一至週五9:00-18:00</div>
            <div>106台北市復興南路一段390號7樓之二</div>
          </div>
          <div>
            <div class="mb-1 text-white/[0.6]">聯絡我們</div>
            <div class="mb-1">電話：02-27075885</div>
            <div>傳真：02-23255088</div>
            <div>信箱：ciee@ms35.hinet.net</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div
        class="flex flex-col py-3 md:flex-row md:items-center md:justify-between md:py-2"
      >
        <NuxtLink class="mb-2 inline-block cursor-pointer md:mb-0" to="/">
          <img
            src="@/assets/images/logo_large.png"
            alt=""
            class="h-[40px] w-[228px]"
          />
        </NuxtLink>
        <div class="text-xs text-lightDark md:text-sm">
          Copyright © 2023 中國電機工程學會 All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped></style>
