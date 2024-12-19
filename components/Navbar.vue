<script setup>
import { useGlobalStore } from '@/stores/Global'
import { useAuthStore } from '@/stores/auth'; 

// 第三方套件變數

// props
const props = defineProps({
  //   menuitems: {
  //     type: Array,
  //     required: true,
  //     default: () => []
  //   }
  isClickMode: {
    type: Boolean,
    default: false
  }
})
// 自訂變數
const globalStore = useGlobalStore()
const authStore = useAuthStore();
const activeItem = ref(null)
const menuScrollRef = ref(null)
const subMenuRef = ref(null)

// 自訂函式
const handleResize = () => {}
const handleScroll = (event) => {
  // activeItem.value = null
}
const handleItemClick = (event, item) => {
  // 滾動效果
  const menuItem = event.currentTarget
  const menuItemWidth = menuItem.offsetWidth
  const containerWidth = menuScrollRef.value.offsetWidth
  const scrollLeft =
    menuItem.offsetLeft - containerWidth / 2 + menuItemWidth / 2
  menuScrollRef.value.scrollLeft = scrollLeft
  // set value
  activeItem.value = activeItem.value === item.enName ? null : item.enName
  if (['contact', 'apply'].indexOf(item.enName) < 0) {
    globalStore.setOepnMenu(!!activeItem.value)
  } else {
    if (globalStore.isOpenMenu) globalStore.setOepnMenu(false)
  }
}

const handleMenuClickOutside = (event) => {
  if (
    !menuScrollRef.value.contains(event.target) &&
    !subMenuRef.value.contains(event.target)
  ) {
    activeItem.value = null
    globalStore.setOepnMenu(false)
  }
}

const activeIndex = computed(() =>
  globalStore.menuitems.findIndex((item) => item.enName === activeItem.value)
)

// lifeCycle
onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('scroll', handleScroll, { passive: true })
  watchEffect(() => {
    if (activeItem.value) {
      document.addEventListener('click', handleMenuClickOutside)
    } else {
      document.removeEventListener('click', handleMenuClickOutside)
    }
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})


</script>
<template>
  <!-- class="navbar mx-auto" -->

  <nav class="" v-if="!isClickMode">
    <ul class="flex list-none md:justify-center xl:justify-end">
      <li
        v-for="item in globalStore.menuitems"
        class="menuItem relative"
        :key="item.enName"
      >
        <a
          v-if="item?.children"
          class="flex cursor-pointer items-center px-4 py-2 md:p-6"
        >
          <div class="whitespace-nowrap">{{ item.name }}</div>
          <Icon name="ic:round-keyboard-arrow-down" class="icon ml-1s" />
        </a>
        <NuxtLink
          v-else
          class="flex cursor-pointer items-center px-4 py-2 md:p-6"
          :to="item.link"
        >
          <div class="whitespace-nowrap">{{ item.name }}</div>
        </NuxtLink>
        <ul
          v-if="item?.children"
          class="submenuItem absolute left-1/2 hidden -translate-x-1/2 transform border-t-2 border-logoColor bg-white py-3 list-none"
        >
          <li
            v-for="subItem in item.children"
            :key="subItem.link"
            class="cursor-pointer whitespace-nowrap text-[#222222] hover:bg-[#222]/5"
          >
            <!-- 高雄分會特別處理 -->
            <NuxtLink
              v-if="subItem.link == 'about-branch'"
              class="flex w-full items-center align-middle md:px-8 md:py-2"
              to="https://sites.google.com/view/ciee-kh/%E9%A6%96%E9%A0%81"
              target="_blank"
              external
            >
              {{ subItem.name }}
              <Icon name="ic:round-arrow-outward" class="outlinkIcon ml-1" />
            </NuxtLink>
            <!-- 一般狀況 -->
            <NuxtLink
              v-else
              class="flex w-full items-center align-middle md:px-8 md:py-2"
              :to="`${subItem.link}`"
            >
              {{ subItem.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <!-- 1200px 以下 -->
  <nav v-else>
    <div class="scroll-container" ref="menuScrollRef">
      <ul class="flex list-none flex-nowrap">
        <li
          v-for="(item, index) in globalStore.menuitems"
          class="menuItem flex-shrink-0 flex-grow-0 basis-auto first:ml-auto last:mr-auto"
          :class="{
            active:
              item.enName === activeItem &&
              ['contact', 'apply'].indexOf(item.enName) < 0
          }"
          :key="item.enName"
        >
          <a
            v-if="item?.children"
            class="flex cursor-pointer items-center px-4 py-2 md:px-6 md:py-3 xl:py-8"
            @click="handleItemClick($event, item)"
          >
            <div class="">{{ item.name }}</div>
            <Icon
              name="ic:round-keyboard-arrow-down"
              class="icon ml-1"
              :class="{
                active:
                  item.enName === activeItem &&
                  ['contact', 'apply'].indexOf(item.enName) < 0
              }"
            />
          </a>
          <NuxtLink
            v-else
            :to="item.link"
            class="flex cursor-pointer items-center px-4 py-2 md:px-6 md:py-3 xl:py-8"
            @click="handleItemClick($event, item)"
          >
            <div class="">{{ item.name }}</div>
          </NuxtLink>
        </li>
        
      </ul>
    </div>
    <div
      v-show="['contact', 'apply'].indexOf(activeItem) < 0 && !!activeItem"
      class="border-t border-[#EAEAEA]"
    ></div>
    <ul
      v-show="['contact', 'apply'].indexOf(activeItem) < 0 && !!activeItem"
      class="mobileSubMenu flex flex-col justify-between py-2 list-none"
      ref="subMenuRef"
      @click="handleMenuClickOutside"
    >
      <li
        v-for="subItem in globalStore.menuitems[activeIndex]?.children"
        :key="subItem.link"
        class="animate-none cursor-pointer text-start lg:hover:text-logoColor"
      >
        <!-- 關於我們特別處理 -->
        <NuxtLink
          v-if="subItem.link == 'about-branch'"
          class="flex w-full items-center px-5 py-3"
          @click="activeItem = null"
          to="https://sites.google.com/view/ciee-kh/%E9%A6%96%E9%A0%81"
          target="_blank"
          external
        >
          {{ subItem.name }}
          <Icon name="ic:round-arrow-outward" class="outlinkIcon ml-1" />
        </NuxtLink>
        <!-- 一般情況 -->
        <NuxtLink
          v-else
          class="flex w-full items-center px-5 py-3"
          :to="subItem.link"
          @click="activeItem = null"
        >
          {{ subItem.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
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

.btn-link{
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-color: rgb(0 0 0);
}

.menuItem {
  svg {
    transition: all 0.2s;

    &.icon.active {
      color: #1b2482;
      transform: rotate(180deg);
      transition: all 0.2s;
    }
  }

  &.active {
    color: #1b2482;
  }
}

@media (min-width: 1200px) {
  .menuItem {
    .outlinkIcon {
      color: #222222 !important;
      transform: rotate(0deg) !important;
    }

    &:hover {
      color: #1b2482;

      svg {
        &.icon {
          color: #1b2482;
        }

        transform: rotate(180deg);
        transition: all 0.2s;
      }

      .submenuItem {
        display: block;
      }
    }
  }
}
</style>
