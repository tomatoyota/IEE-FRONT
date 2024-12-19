<template>

<div class="flex min-h-screen items-center justify-center px-4">
    <div
      class="flex w-full max-w-[1140px] flex-col gap-10 lg:flex-row lg:items-center"
    >
      <!-- 文字區域 -->
      <div class="flex-1">
        <h3 class="mb-6 font-bold">糟糕出了一些問題</h3>
        <div class="mb-6 text-base">
          很抱歉，我們遇到了一些問題。請稍後再試，或
          <NuxtLink
            class="font-semibold text-logoColor underline underline-offset-4"
            to="/"
            >返回首頁</NuxtLink
          >
          繼續瀏覽。如果問題持續存在，請<NuxtLink
            class="font-semibold text-logoColor underline underline-offset-4"
            to="/contact"
            >聯絡我們</NuxtLink
          >
        </div>
      </div>

      <!-- 響應式圖片區域 -->
      <div class="flex flex-1 justify-center lg:justify-end">
        <picture>
          <!-- 大螢幕 (max size) -->
          <source
            srcset="@/assets/images/error_max.png"
            media="(min-width: 1024px)"
          />
          <!-- 中等螢幕 (md size) -->
          <source
            srcset="@/assets/images/error_md.png"
            media="(min-width: 768px)"
          />
          <!-- 小螢幕 (手機) -->
          <img
            src="@/assets/images/error_sm.png"
            alt="404 Not Found"
            class="h-auto max-w-full"
          />
        </picture>
      </div>
    </div>
  </div>

  <!-- <p>{{ error.statusMessage || '未知錯誤' }}</p> -->
</template>

<script>
// defineProps({
//   error: Object
// })

// const handleError = () => clearError({ redirect: '/' })
</script>

<style></style>
