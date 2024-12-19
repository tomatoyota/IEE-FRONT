<script setup>
// 自訂變數
const props = defineProps({
  to: {
    type: String,
    default: '/'
  },

  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary' // secondary , backstage
  }
})

// 自訂函式
const colorClass = computed(() => {
  return {
    'bg-[#222222] text-white hover:bg-[#6E6E6E]': props.color === 'primary',
    'bg-transparent hover:bg-hoverColor border border-[#6e6e6e]':
      props.color === 'secondary',
    'bg-logoColor text-white hover:bg-[#5860B0]': props.color === 'backstage'
  }
})
const disabledClass = computed(() => {
  return {
    'cursor-not-allowed text-white bg-[#C0C0C0]':
      props.disabled && props.color === 'primary',
    'cursor-not-allowed text-[#C0C0C0] border border-[#C0C0C0]':
      props.disabled && props.color === 'secondary'
  }
})
// lifeCycle
</script>
<template>
  <NuxtLink
    v-if="!props.disabled"
    :to="to"
    class="box-border inline-block h-10 whitespace-nowrap rounded px-4 py-2 transition-colors md:h-12 md:px-6 md:py-3"
    :class="colorClass"
  >
    <span class="inline-block">
      <slot />
    </span>
  </NuxtLink>
  <NuxtLink
    v-else
    class="box-border inline-block h-10 whitespace-nowrap rounded px-4 py-2 transition-colors md:h-12 md:px-6 md:py-3"
    :class="disabledClass"
  >
    <slot />
  </NuxtLink>
</template>
<style lang="scss" scoped></style>
