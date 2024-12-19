<script setup>
// 第三方套件變數

// 自訂變數
const slots = useSlots()
const tabTitles = ref(slots.default().map((tab) => tab.props.title))
const selectedTitle = ref(tabTitles.value[0])
provide('selectedTitle', selectedTitle)
// 自訂函式

// lifeCycle
</script>
<template>
  <div class="tabs flex-auto">
    <ul class="flex gap-4 border-b border-[#6E6E6E] list-none">
      <li
        v-for="title in tabTitles"
        :key="title"
        class="cursor-pointer rounded-t border-l border-r border-t border-[#6E6E6E] px-4 py-2 hover:bg-hoverColor md:px-6 md:py-3"
        :class="{ selected: selectedTitle === title }"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.tabs {
  .selected {
    background: #222222;
    color: #ffffff;
    border: #222;
  }
}
</style>
