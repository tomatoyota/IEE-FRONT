<script setup>
const props = defineProps({
  // buttonText: {
  //   type: String,
  //   default: 'dropdown'
  // },
  menuItems: {
    type: Array,
    required: true,
    default: () => []
  },
  activeKey: {
    type: String,
    default: ''
  }
  // mmenuItem ex. [{key:'',lable:''}]
})
const emit = defineEmits(['update:activeKey'])

// 自訂變數
const dropdownMenuRef = ref(null)
const isOpen = ref(false)
const activeLabel = computed(() => {
  let index = props.menuItems.findIndex((d) => d.key === props.activeKey)
  return index >= 0 ? props.menuItems[index].label : 'undefined'
})
// 自訂函式
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const handleSelect = (key) => {
  emit('update:activeKey', key)
  isOpen.value = !isOpen.value
}
const handleClickOutside = (event) => {
  if (isOpen.value && !dropdownMenuRef.value.contains(event.target)) {
    isOpen.value = false
  }
}
// lifeCycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<template>
  <div
    class="relative inline-block"
    ref="dropdownMenuRef"
    :class="isOpen ? 'bg-[#222]/5' : ''"
  >
    <button
      @click="toggleDropdown"
      class="flex items-center justify-center rounded border border-[#6E6E6E] px-4 py-2 md:px-6 md:py-3"
    >
      <span>{{ activeLabel }}</span>
      <Icon
        name="ic:round-arrow-drop-down"
        class="dropmenu-icon ml-1"
        :class="{ active: isOpen }"
      />
    </button>
    <ul
      class="list-none round absolute top-[42px] inline-block min-w-full whitespace-nowrap bg-white py-3 shadow-normal md:top-[50px]"
      :class="isOpen ? 'block' : 'hidden'"
    >
      <li
        v-for="item in menuItems"
        :key="item?.key"
        class="dropmenu-item relative flex cursor-pointer items-center px-8 py-2 hover:bg-[#222]/5 list-none"
        :class="{ active: props.activeKey === item.key }"
        @click="handleSelect(item.key)"
      >
        <Icon
          v-if="props.activeKey === item.key"
          name="ic:round-check"
          class="absolute left-[6px] text-logoColor"
        />
        {{ item?.label }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.dropmenu-icon {
  transition: all 0.2s;
  font-size: 24px;
  &.active {
    transition: all 0.2s;
    transform: rotate(180deg);
  }
}
.dropmenu-item.active {
  background: rgba(27, 36, 130, 0.05);
  color: #1b2482;
}
</style>
