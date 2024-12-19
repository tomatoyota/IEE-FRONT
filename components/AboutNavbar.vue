<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  activeId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['clickItem', 'updateOffsetVal'])

// 自訂變數
const globalStore = useGlobalStore()
const headerOffsetH = computed(() => globalStore.headerOffsetH)
// isHeaderTop 平板,mobile效果未修
const isHeaderTop = computed(() => navbarOffsetH.value - 24 == 0)
const navbarContainerRef = ref(null)
const navbarRef = ref(null)
const navItemRefs = ref([])
const navbarOffsetH = ref(0)
// 自訂函式
const setNavItemRefs = (el, item) => {
  if (el) {
    navItemRefs.value.push({
      id: item.id,
      el
    })
  }
}
const handleScroll = () => {
  if (navbarContainerRef.value) {
    const rect = navbarContainerRef.value.getBoundingClientRect()
    navbarOffsetH.value = rect.top - headerOffsetH.value
    emit('updateOffsetVal', navbarOffsetH.value)
  }
}

const handleItemClick = (event, id) => {
  // 滾動效果
  const menuItem = event.currentTarget
  const scrollLeft = menuItem.offsetLeft
  navbarRef.value.scrollLeft = scrollLeft
  emit('clickItem', id)
}
watchEffect(
  () => {
    // console.log('新的id:' + props.activeId)
    const item = navItemRefs.value.find((item) => item.id === props.activeId)
    if (item) {
      const scrollLeft = item.el.offsetLeft
      navbarRef.value.scrollLeft = scrollLeft
    }
  },
  {
    flush: 'post'
  }
)
// lifeCycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  const rect = navbarContainerRef.value.getBoundingClientRect()
  navbarOffsetH.value = rect.top + window.scrollY
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
defineExpose({
  navbarOffsetH
})
</script>
<template>
  <div
    class="sticky top-[132px] mb-20 flex justify-center xl:top-[96px]"
    ref="navbarContainerRef"
  >
    <ul
      class="about-navbar scroll-container flex flex-nowrap bg-white px-4 py-2 list-none"
      :class="isHeaderTop ? 'about-down' : 'about-top'"
      ref="navbarRef"
    >
      <li
        v-for="item in list"
        :ref="(el) => setNavItemRefs(el, item)"
        :key="item.id"
        class="flex-shrink-0 flex-grow-0 basis-auto cursor-pointer px-4 py-2 hover:bg-[#222222]/5 list-none"
        :class="item.id === activeId ? 'active' : ''"
        @click="handleItemClick($event, item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.scroll-container {
  overflow-x: auto;
  scroll-behavior: smooth;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.active {
  color: #1b2482;
  font-weight: 600;
}
.about-navbar {
  border-radius: 4px;
  border: 1px solid #eaeaea;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
.about-top {
  will-change: box-shadow;
  transition: box-shadow 0.5s ease 0s;
  box-shadow: none;
}
.about-down {
  will-change: box-shadow;
  transition: box-shadow 0.5s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 4px;
}
</style>
