<script setup>
// 第三方套件變數

// 自訂變數
const timelineData = reactive([
  { time: '1982.09', text: '成立台中分會' },
  { time: '1954.08', text: '在台復會改組為中國電機工程學會' },
  { time: '1953.11', text: '成立高雄分會' },
  { time: '1950.07', text: '改名台灣省電機工程學會' },
  { time: '1947.04', text: '光復後成立台灣分會' },
  { time: '1934.10', text: '上海成立中國電機工程學會' }
])
// 自訂函式

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <ul class="content mx-auto divide-y divide-dashed divide-[#6E6E6E] list-none">
      <li
        v-for="item in timelineData"
        :key="item.time"
        class="flex flex-col justify-start py-[52px] pl-10 md:flex-row md:items-center md:pl-0"
      >
        <div
          class="mb-5 max-w-[108px] rounded-3xl bg-logoColor px-6 py-3 text-center text-white md:mb-0 md:ml-[-54px] md:min-w-[108px]"
        >
          {{ item.time }}
        </div>
        <div class="md:ml-20">{{ item.text }}</div>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.content {
  max-width: 515px;
  border-left: 1px solid #222222;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -6px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background-color: #222222;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -6px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background-color: #222222;
  }
}
</style>
