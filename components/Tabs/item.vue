<script setup>
const props = defineProps({
  title: String
})

const selectedTitle = inject('selectedTitle')
</script>

<template>
  <div class="flex flex-auto flex-col" v-show="selectedTitle === title">
    <slot />
  </div>
</template>
