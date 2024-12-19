<script setup>
// 第三方套件變數

// 自訂變數
const route = useRoute()
const globalStore = useGlobalStore()
const type = route.name.split('-')[0]
const name = ref('Loading...')
for (const item of globalStore.menuitems) {
  // 父層
  if (item.enName === route.name) {
    name.value = item.name
  }
  // 子層
  if (item.children) {
    for (const child of item.children) {
      if (child.link === route.path) {
        name.value = child.name
      }
    }
  }
}
onBeforeMount(() => {})

// 自訂函式

// lifeCycle
</script>
<template>
  <!-- banner -->
  <section class="px-4 pb-[30px] md:px-6 md:pb-[40px] xl:pb-[60px]">
    <div class="page-banner overflow-hidde relative flex">
      <img
        :src="`/PageBg/${type}HeaderBg.png`"
        alt=""
        class="absolute left-0 top-0 -z-10 h-full w-full object-cover"
      />
      <div
        class="wrapper flex flex-col items-center justify-center md:items-start"
      >
        <h2 class="font-semibold">{{ name }}</h2>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.page-banner {
  height: 188px;
}
</style>
