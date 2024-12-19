<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import newsSrv from '@/service/news'
import headerHelper from '@/utils/helpers/header.js'
import { announcementStore } from '@/stores/Announcement'
import axios from 'axios';
import defaultimg from '@/assets/images/default.jpg'


const router = useRouter()
const newsDatas = ref([])
const activeType = ref(1)
const page = ref(1)
const itemsPerPage = ref(5)
const albumDatas = ref([])
const defaultpic = ref(defaultimg)

const fetchNewsData = async (type) => {
  try {
    const response = await newsSrv.getAnnouncementList({
      page: page.value,
      pageSize: itemsPerPage.value,
      sortBy: 'release_at',
      sortDirection: 'DESC',
      type: type
    });



    const formattedData = response.data.data.map((item) => {
      if (item && item.announcementsId) { // 確保 item 存在且有 announcementsId
        return {
          announcementsId: item.announcementsId,
          date: new Date(item.releaseAt)
            .toLocaleDateString('zh-TW')
            .replace(/\//g, '.'),
          title: item.title
        };
      } else {
        console.warn('Item is undefined or does not have announcementsId:', item);
        return null; 
      }
    }).filter(item => item !== null); 

    // console.log('Formatted data:', formattedData); 
    newsDatas.value = formattedData; // 將格式化後的資料賦值給 newsDatas
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
}

const changeType = (type) => {
  activeType.value = type
  const store = announcementStore()
  store.updateNewsType(type);
  fetchNewsData(type) // 根據選擇的類型重新加載資料
}
// 從相簿 URL 中提取相簿 ID
const extractAlbumId= (albumUrl) => {
        const match = albumUrl.match(/\/albums\/(\d+)/);
        return match ? match[1] : null;
    }

const fetchAlbum = async () => {
  try {
    const response = await newsSrv.getAnnouncementList({
      page: page.value,
      // pageSize: itemsPerPage.value,
      sortBy: 'release_at',
      sortDirection: 'DESC',
      type: 4,
    });

    const formattedData = await Promise.all(
      response.data.data.map(async (item) => {
        if (item && item.announcementsId) {
          const albumId = extractAlbumId(item.albumUrl);
          const path = albumId ? await newsSrv.getFlickrAlbumCover(albumId) : defaultpic.value;

          return {
            announcementsId: item.announcementsId,
            date: new Date(item.releaseAt).toLocaleDateString('zh-TW').replace(/\//g, '.'),
            title: item.title,
            albumUrl: item.albumUrl,
            path,
          };
        } else {
          console.warn('Album Item is undefined or does not have announcementsId:', item);
          return null;
        }
      })
    );

    albumDatas.value = formattedData.filter((item) => item !== null);
    // console.log(albumDatas.value)
  } catch (error) {
    console.error('Error fetching album data:', error);
  }
};


const getNews = (id, index) => {
  // console.log('點擊的項目 ID:', id)  // 確認是否正確抓到 ID
  // console.log('當前索引:', index)
  const selectedNews = newsDatas.value[index]
  // console.log('Selected news:', selectedNews)
  // console.log('當前新聞標題:', selectedNews.title)
  router.push({
    path: '/newsView',
    query: { id: id, currentIndex: index }
  })
  const store = announcementStore()
  const page = this.page
  store.updatePagination(page.value)
  // store.updateNewsType(activeTab.value)
}
const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      const isUtc =
        !dateStr.includes('Z') &&
        !dateStr.includes('+') &&
        !dateStr.includes('-')
      if (isUtc) {
        date.setHours(date.getHours() + 8)
      }
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const formattedDateTime = `${year}/${month}/${day}`
      return formattedDateTime
    }
const paginatedNewsList = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return newsList.value.slice(start, end)
})



// 在組件掛載時調用 fetchNewsData
onMounted(() => {
  
  fetchNewsData(activeType.value);
  fetchAlbum();
  
})

definePageMeta({
  layout: 'default'
})
useHead({
  bodyAttrs: {
    class: 'homepage'
  }
})
const activeSwiperEl = ref(null)

const textArray = ['電機', '電子', '電信', '資訊']
const currentIndex = ref(0)
const currentText = ref(textArray[currentIndex.value])
const switchInterval = 3000 // 調整切換文字的時間間隔（毫秒）
let timer


const startSwitching = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % textArray.length
    currentText.value = textArray[currentIndex.value]
  }, switchInterval)
}

onMounted(() => {
  startSwitching()
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <!-- banner -->

  <section>
    <div class="banner relative flex flex-col lg:flex-row lg:overflow-hidden">
      <img
        src="@/assets/images/max_banner.png "
        alt=""
        class="left-0 top-0 -z-10 hidden h-full w-full object-cover lg:absolute xl:block"
      />
      <img
        src="@/assets/images/max_circle.png "
        alt=""
        class="left-0 top-0 -z-[8] hidden h-full w-full animate-[circleFloatUpDown_3s_ease-in-out_infinite] object-cover will-change-transform lg:absolute xl:block"
      />
      <img
        src="@/assets/images/max_shadow.png "
        alt=""
        class="left-0 top-0 -z-10 hidden h-full w-full animate-[shadowFloatUpDown_3s_ease-in-out_infinite] object-cover will-change-transform lg:absolute xl:block"
      />
      <img
        src="@/assets/images/max_overflow.png "
        alt=""
        class="left-0 top-0 -z-[9] hidden h-full w-full object-cover will-change-transform lg:absolute xl:block"
      />
      <img
        src="@/assets/images/banner.png "
        alt=""
        class="left-0 top-0 -z-10 block h-full w-full object-cover lg:absolute xl:hidden"
      />

      <div class="wrapper flex flex-col justify-center">
        <div class="text-sub font-semibold">本會致力於在</div>
        <h1 class="my-3 font-semibold md:my-4">
          <transition name="fade" mode="out-in">
            <span class="text-logoColor" :key="currentText">{{
              currentText
            }}</span> </transition
          >相關領域

          <!-- <span
            class="relative mx-1 after:absolute after:top-1/2 after:inline-block after:h-[40px] after:w-1 after:-translate-y-1/2 after:transform after:animate-[typingCursor_1s_infinite] after:content-[''] md:h-[56px]"
          ></span> -->
        </h1>
        <div class="text-sub w-full lg:max-w-[546px]">
          促進與各級學校間之建教合作、培育產業所需專業人才並聯合產、官、學界舉辦訓練班及研討會
        </div>
      </div>
    </div>
  </section>
  <!-- section2 -->
  <section>
    <div class="section-wrapper grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div class="flex flex-col rounded-2xl bg-[#EBEBE6] p-8 md:p-12">
        <div class="mb-3 text-lightDark lg:mb-4">影片由總統府提供</div>
        <h4 class="mb-4 flex-grow font-semibold lg:mb-0">
          總統出席「電機工程學會 107 年會員暨會員代表大會」暨訪視台灣電力公司
        </h4>
        <div class="videobox">
          <iframe
            class="rounded-lg"
            src="https://www.youtube.com/embed/CpyNxqDgYOA"
            title="電機工程學會 107 年會員暨會員代表大會"
            frameborder="0"
            allow="accelerometer"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div class="flex h-full flex-col">
        <div class="flex gap-4 border-b border-[#6E6E6E]">
          <button
            @click="changeType(1)"
            :class="[
              'cursor-pointer rounded-t border-l border-r border-t border-[#6E6E6E] px-4 py-2 hover:bg-hoverColor md:px-6 md:py-3',
              { selected: activeType === 1 }
            ]"
          >
            最新消息
          </button>
          <button
            @click="changeType(2)"
            :class="[
              'cursor-pointer rounded-t border-l border-r border-t border-[#6E6E6E] px-4 py-2 hover:bg-hoverColor md:px-6 md:py-3',
              { selected: activeType === 2 }
            ]"
          >
            公告事項
          </button>
          <button
            @click="changeType(3)"
            :class="[
              'cursor-pointer rounded-t border-l border-r border-t border-[#6E6E6E] px-4 py-2 hover:bg-hoverColor md:px-6 md:py-3',
              { selected: activeType === 3 }
            ]"
          >
            季刊公告
          </button>
        </div>
        <table
          class="flex flex-auto flex-col divide-y divide-dashed divide-lightDark"
        >
          <template v-for="(newsItem, index) in newsDatas" :key="newsItem.id">
            <tr
              @click="getNews(newsItem.announcementsId, index)"
              class="flex cursor-pointer flex-col border-dashed px-3 py-5 hover:bg-[#F3F3F3] md:h-24 md:flex-row md:items-center md:px-4 md:py-6"
            >
              <td class="mb-1 min-w-[100px] text-lightDark md:mb-0 md:mr-3">
                {{ newsItem.date }}
              </td>
              <td class="multiline-ellipsis font-semibold">{{ newsItem.title }}</td>
            </tr>
          </template>
        </table>
        
        <NuxtLink
          class="group mt-8 flex cursor-pointer items-center self-end font-semibold text-logoColor"
          to="/news"
        >
          閱讀更多
          <Icon
            name="ic:round-arrow-forward"
            class="ml-1 text-logoColor group-hover:animate-[moveRight_1s_ease-in-out_infinite]"
          />
        </NuxtLink>
      </div>
    </div>


  </section>
  <!-- section3 -->
  <section>
    <div class="section-wrapper">
      <header class="flex items-center justify-between">
        <h3 class="font-semibold">活動剪影</h3>
        <NuxtLink
          class="group relative flex cursor-pointer items-center font-semibold text-logoColor"
          to="/album"
        >
          查看更多
          <Icon
            name="ic:round-arrow-forward"
            class="ml-1 text-logoColor group-hover:animate-[moveRight_1s_ease-in-out_infinite]"
          />
        </NuxtLink>
      </header>
      <div class="mt-10">
        <div class="relative">
          <Swiper
            :modules="[SwiperNavigation]"
            ref="activeSwiperEl"
            :slidesPerView="1.5"
            :slidesPerGroup="1"
            :spaceBetween="16"
            :navigation="{
              prevEl: '.active-prev-button',
              nextEl: '.active-next-button'
            }"
            :breakpoints="{
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                slidesOffsetBefore: 0
              },
              992: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                slidesOffsetBefore: 0
              },
              1140: {
                slidesPerView: 5,
                slidesPerGroup: 1,
                slidesOffsetBefore: 0
              }
            }"
          >
           
              <SwiperSlide v-for="(item, index) in albumDatas" :key="index">
                <div class="py-1 pr-4">
                  <NuxtLink
                    class="swiper-activeItem cursor-pointer"
                    :to="item.albumUrl"
                    target="_blank"
                  >
                    <div class="active-img">
                      <img
                        class="rounded-lg"
                        :src="
                          
                            item.path ? item.path : defaultpic
                          
                        "
                        :alt="item.title"
                      />
                    </div>
                    <div class="active-text bg-white px-5 py-4">
                      <div class="mt-1 text-lightDark">{{ item.date }}</div>
                      <div class="multiline-ellipsis">{{ item.title }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </SwiperSlide>
          </Swiper>
          
          <!-- 上一頁按鈕 -->
          <button class="active-prev-button">
            <Icon name="ic:round-keyboard-arrow-left" />
          </button>
          <!-- 下一頁按鈕 -->
          <button class="active-next-button">
            <Icon name="ic:round-keyboard-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.banner {
  aspect-ratio: 1920/468;
}
.videobox {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.videobox iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// swiper
.swiper-activeItem {
  .active-img {
    overflow: hidden;
    position: relative;
    padding-bottom: calc(70%);
    border-radius: 4px;
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      display: block;
      width: 100%;
      height: auto;
      transition: transform 0.3s ease-in-out 0s;
    }
  }
  .active-text {
    min-height: 108px;
    box-shadow: rgb(0 0 0 / 4%) 0px 0px 2px 0px,
      rgb(0 0 0 / 8%) 0px 4px 10px 0px;
    margin-top: -16px;
    padding: 16px;
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    transform: translate(8px, 0px);
    transition: transform 0.3s ease-in-out 0s;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
    .active-text {
      transform: translate(8px, -8px);
    }
  }
}
.active-prev-button {
  display: none;
  position: absolute;
  top: 50%;
  left: -22px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;
  box-shadow: rgb(0 0 0 / 4%) 0px 0px 2px 0px, rgb(0 0 0 / 8%) 0px 4px 10px 0px;
  transform: translateY(-50%);
  transition: transform 0.3s ease-in-out 0s;
  &.swiper-button-disabled {
    opacity: 0.5; // 將按鈕變淡，表示不可點擊
    pointer-events: none; // 禁止點擊
    .icon {
      color: rgb(196, 199, 197);
    }
  }
  @media (min-width: 768px) {
    display: flex;
    width: 48px;
    height: 48px;
  }

  @media (min-width: 1300px) {
    left: -64px;
  }
}
.active-next-button {
  display: none;
  position: absolute;
  top: 50%;
  right: -22px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;

  box-shadow: rgb(0 0 0 / 4%) 0px 0px 2px 0px, rgb(0 0 0 / 8%) 0px 4px 10px 0px;
  transform: translateY(-50%);
  transition: transform 0.3s ease-in-out 0s;

  &.swiper-button-disabled {
    opacity: 0.5; // 將按鈕變淡，表示不可點擊
    pointer-events: none; // 禁止點擊
    .icon {
      color: rgb(196, 199, 197);
    }
  }
  @media (min-width: 768px) {
    display: flex;
    width: 48px;
    height: 48px;
  }

  @media (min-width: 1300px) {
    right: -64px;
  }
}
.selected {
  background: #222222; /* 背景顏色 */
  color: #ffffff; /* 字體顏色 */
  border: 1px solid #222; /* 邊框顏色 */
}
</style>
