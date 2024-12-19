<script>
import newsSrv from '@/service/news.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import headerHelper from '@/utils/helpers/header.js'
import {announcementStore} from '@/stores/Announcement'

export default {
  components: { PaginationComponent },

  data() {
    return {
      newsList: [],
      loading: false,
      itemsPerPage: 10, // 每頁顯示10比
      totalItems: null,
      currentPage: 1,
      pageCount: '10',
      totalPages: null,
      loading: false,
      activeTab: null, 
      maxLength: 160,
    }
  },
  created() {
    const store = announcementStore();
    this.activeTab = store.currentType || 1;
    store.updateNewsType(this.activeTab);
    // 檢查是否有 `page` 參數傳入，若有則設置為當前頁數
    const currentPage = parseInt(this.$route.query.currentPage, 10);
    if (currentPage) {
      this.currentPage = currentPage;
    }
    this.getAnnouncementList(); // 根據當前頁碼取得對應的新聞列表
  },
  computed: {
    currentType() {
      const store = announcementStore();
      return store.currentType; // 從 store 讀取 currentType
    },
    // 根據當前頁碼計算顯示的新聞列表
    paginatedNewsList() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.newsList.slice(start, end)
    }
  },
  mounted() {
    this.getAnnouncementList();
    this.setMaxLength();
    window.addEventListener('resize', this.setMaxLength);
  },
    // beforeDestroy() {
    //   window.removeEventListener('resize', this.setMaxLength);
    // },
  watch: {
    '$route.query.currentPage'(newPage) {
    this.currentPage = parseInt(newPage, 10);
    this.getAnnouncementList();
  },
  currentPage(n) {
      this.getAnnouncementList()
    },
    activeTab(newVal) {
    const store = announcementStore();
    store.updateNewsType(newVal);
    this.currentPage = 1;
    this.getAnnouncementList();
  }
  },
  methods: {
    async getAnnouncementList() {
      this.loading = true
      const today = new Date()
      const yyyy = today.getFullYear()
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const dd = String(today.getDate()).padStart(2, '0')
      const todayDate = `${yyyy}-${mm}-${dd}`

      // 計算明天的日期
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      const tmrYyyy = tomorrow.getFullYear()
      const tmrMm = String(tomorrow.getMonth() + 1).padStart(2, '0')
      const tmrDd = String(tomorrow.getDate()).padStart(2, '0')
      const tmrDate = `${tmrYyyy}-${tmrMm}-${tmrDd}`

      const store = announcementStore();
      const type = store.currentType;
      
      const obj = {
        title: "",
        publishStartDate: "",
        publishEndDate: todayDate,
        type: this.activeTab, // 根據當前選中的 tab 設置 type
        createdStartAt: "",
        createdEndAt: "",
        expiredStartDate: tmrDate,
        expiredEndDate: "",
        currentPage: this.currentPage,
        pageSize: 10,
        sortBy:"release_at", //"announcements_id","release_date","expired_date","created_at","updated_at",created_by,"updated_by"
        sortDirection:"DESC",
      }
      const headers = headerHelper.setHeader
      newsSrv.getAnnouncementList(obj).then((res) => {
        this.loading = false
        const newsList = res.data.data
        this.newsList = newsList
        // console.log('News List:', this.newsList);
        this.currentPage = res.data.pagination.currentPage
        // console.log('第',this.page,'頁')
        this.totalPages = res.data.pagination.totalPages
        // console.log('共',this.totalPages,'頁')

        const store = announcementStore()
        const currentPage = this.currentPage
        const totalPages = this.totalPages
        store.updatePagination(currentPage, totalPages)
      })
    },
    getNews(id, index) {
      // console.log('當前索引:', index);
      const selectedNews = this.newsList[index];
      // console.log('Selected newsList:', selectedNews);
      // console.log("當前新聞標題:", selectedNews.title);
      this.$router.push({ 
        path: '/newsView', 
        query: { id: id, currentIndex: index } 
      });
      const store = announcementStore()
      const type = this.activeTab
      store.updateNewsType(type)

    },

    formatDate(dateStr) {
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
    },
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.currentPage = newPage
      }
    },
    setMaxLength() {
      const width = window.innerWidth;
  if (width <= 768) {
    this.maxLength = 30; // 手機版
  } else if (width <= 960) {
    this.maxLength = 60; // 平板版
  } else {
    this.maxLength = 120; // 桌面版
  }
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },
    // 格式化日期
//     formatDate(dateStr) {
//       const date = new Date(dateStr)
//     const year = date.getFullYear()
//     const month = (date.getMonth() + 1).toString().padStart(2, '0')
//     const day = date.getDate().toString().padStart(2, '0')
//     return `${year}.${month}.${day}`
//     },
    changeTab(tabType) {
  this.activeTab = tabType;
}
  }
}

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
        <div class="space-x-3 border-b border-[#6E6E6E]">
          <button @click="changeTab(1)" :class="['tab-button', activeTab === 1 ? 'active' : '']">最新消息</button>
          <button @click="changeTab(2)" :class="['tab-button', activeTab === 2 ? 'active' : '']">公告事項</button>
          <button @click="changeTab(3)" :class="['tab-button', activeTab === 3 ? 'active' : '']">季刊公告</button>
        </div>
      

        <section class="mb-20">
          <table class="table">
            <template v-for="(newsItem, index) in newsList" :key="newsItem.id">
              <tr @click="getNews(newsItem.announcementsId, index)"  class="tr">
                <td class="td">{{ formatDate(newsItem.releaseAt) }}</td>
                <td>{{ truncateText(newsItem.title, maxLength)}}</td>
              </tr>
            </template>
          </table>
        </section>


        <PaginationComponent
            :pageLength="totalPages"
            :currentPage="currentPage"
            @setPage="changePage"
            @getList="getAnnouncementList"
          />


        <!-- <p class="mb-0 mr-2" v-if="paginations.totalCount">
            共{{ paginations.totalCount }}筆
          </p> -->
  </section>
</template>
<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
}
.tr {
  height: 96px;
  padding: 24px 16px 24px 16px;
  gap: 48px;
  border-bottom: 1px dashed;
  border-color: black;
}
.tr:hover {
  background-color: #F3F3F3; /* 滑鼠懸停時的背景顏色 */
}
.td {
  width: 100px;
  padding-right: 30px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}
.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.tab-button {
  border-top: 1px solid #6E6E6E;
  border-left: 1px solid #6E6E6E;
  border-right: 1px solid #6E6E6E;
  border-radius: 0.375rem 0.375rem 0 0; /* 上方圓角 */
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: black;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.tab-button.active {
  background-color: black;
  color: white;
}
</style>
