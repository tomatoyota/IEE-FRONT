<script setup>
// 自訂變數
const globalStore = useGlobalStore()
const showBackToTop = ref(false)
// 自訂函式
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
// 滾動事件處理器
const handleScroll = () => {
  const scrollThreshold = 0.8 // 距離底部的閾值（例如 80%）
  // 檢查是否滾動到快底部
  const windowOffset = window.pageYOffset || document.documentElement.scrollTop
  globalStore.setScrollTop(windowOffset)
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const isNearBottom =
    windowOffset > (scrollHeight - clientHeight) * scrollThreshold
  showBackToTop.value = isNearBottom
}
// lifeCycle
onMounted(() => {
  // 監聽滾動事件
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 解除滾動事件監聽
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- header -->
  <Header />
  <!-- main -->
  <main class="content pt-[108px] md:pt-[124px] xl:pt-[72px]">
    <slot />
  </main>
  <!-- footer -->
  <Footer />
  <!-- back-to-top -->
  <div
    class="back-to-top z-20 cursor-pointer bg-[#222222]"
    :class="{ show: showBackToTop }"
    @click="scrollToTop"
  >
    <Icon name="ic:round-keyboard-arrow-up" class="text-white" />
  </div>
  <!-- mask -->
  <div
    v-show="globalStore.isOpenMenu"
    class="fixed left-0 top-0 z-30 h-full w-full bg-black/60"
  ></div>
</template>

<style scoped lang="scss">
.content {
  min-height: calc(100vh - 392px - 60px);
}
.back-to-top {
  height: 48px;
  width: 48px;
  border-radius: 100%;
  position: fixed;
  right: 16px;
  bottom: 408px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
@media (min-width: 768px) {
  .content {
    min-height: calc(100vh - 208px - 40px);
  }
  .back-to-top {
    bottom: 224px;
  }
}

@media (min-width: 1200px) {
  .content {
    min-height: calc(100vh - 208px - 60px);
  }
}
</style>
