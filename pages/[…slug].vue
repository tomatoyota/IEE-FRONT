<template>
 <div class="flex items-center justify-center min-h-screen px-4">
  <div class="flex max-w-[1140px] flex-col gap-10 lg:flex-row lg:items-center w-full">
    <!-- 文字區域 -->
    <div class="flex-1">
      <h3 class="mb-6 font-bold">很抱歉，找不到此頁面</h3>
      <div class="mb-6 text-base">
        您輸入的網址可能有誤或此頁面已經不存在。請檢查您的網址是否正確或嘗試
        <NuxtLink
          class="font-semibold text-logoColor underline underline-offset-4"
          to="/"
          >返回首頁</NuxtLink
        >
        繼續瀏覽。
      </div>
      <div class="mb-6 text-base">
        若需要進一步的協助或有任何疑問，請隨時
        <NuxtLink
          class="font-semibold text-logoColor underline underline-offset-4"
          to="/contact"
          >聯絡我們</NuxtLink
        >
      </div>
    </div>

    <!-- 響應式圖片區域 -->
    <div class="flex-1 flex justify-center lg:justify-end">
      <picture>
        <!-- 大螢幕 (max size) -->
        <source srcset="@/assets/images/404_max.png" media="(min-width: 1024px)" />
        <!-- 中等螢幕 (md size) -->
        <source srcset="@/assets/images/404_md.png" media="(min-width: 768px)" />
        <!-- 小螢幕 (手機) -->
        <img
          src="@/assets/images/404_sm.png"
          alt="404 Not Found"
          class="max-w-full h-auto"
        />
      </picture>
    </div>
  </div>
</div>

  <!-- <p>{{ error.statusMessage || '未知錯誤' }}</p> -->
</template>

<script>
// import { useError } from '#imports';

// const error = useError();
// const error = useError(); 
</script>

<style></style>
