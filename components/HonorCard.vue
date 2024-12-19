<script setup>
const props = defineProps({
  dataInfo: {
    type: Object,
    required: true,
    default: () => {
      return {
        name: '標題',
        roles: [],
        path: ''
      }
    }
  }
})

// 自訂變數
const path = computed(() =>
  props.dataInfo.path ? props.dataInfo.path : 'default.jpg'
)

// 自訂函式

// lifeCycle
</script>
<template>
  <div class="flex gap-4 bg-white p-4 shadow-normal md:gap-5 md:p-5">
    <div
      class="h-[108px] w-[108px] flex-shrink-0 rounded shadow-normal md:h-[132px] md:w-[132px]"
    >
      <img
        class="h-full w-full rounded object-cover object-top"
        :alt="`${props.dataInfo.name}(${path})`"
        :src="useAssets(path)"
      />
    </div>
    <div class="[&>*:not(:last-child)]:mb-1">
      <div class="text-sub font-semibold">{{ props.dataInfo.name }}</div>
      <div v-for="item in props.dataInfo.roles">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
