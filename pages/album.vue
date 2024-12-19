<script>
import newsSrv from '@/service/news.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import headerHelper from '@/utils/helpers/header.js'
import { albumStore } from '@/stores/Album'

export default {
  components: { PaginationComponent },

  data() {
    return {
      newsList: [],
      albumDatas: [],
      loading: false,
      itemsPerPage: 10, // 每頁顯示10比
      totalItems: null,
      page: 1,
      pageCount: '10',
      totalPages: null,
      loading: false,
      activeTab: 1, // 用於追蹤選中的 tab，初始值為 1（最新消息）
      maxLength: 160
    }
  },
  // created:{
  //   //拿到store的page
  // },
  computed: {
    // 根據當前頁碼計算顯示的新聞列表
    paginatedNewsList() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.newsList.slice(start, end)
    }
  },
  mounted() {
    this.getAnnouncementList()
    this.setMaxLength()
    window.addEventListener('resize', this.setMaxLength)
  },
  watch: {
    page(n) {
      this.getAnnouncementList()
    },
    activeTab(newVal) {
      this.page = 1
      this.getAnnouncementList()
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

      const obj = {
        title: '',
        publishStartDate: '',
        publishEndDate: todayDate,
        type: 4,
        createdStartAt: '',
        createdEndAt: '',
        expiredStartDate: tmrDate,
        expiredEndDate: '',
        currentPage: this.currentPage,
        pageSize: 10,
        sortBy: 'release_at', //"announcements_id","release_date","expired_date","created_at","updated_at",created_by,"updated_by"
        sortDirection: 'DESC'
      }
      const headers = headerHelper.setHeader

      newsSrv.getAnnouncementList(obj, headers).then((res) => {
        this.loading = false
        const newsList = res.data.data
        this.newsList = newsList
        this.currentPage = res.data.pagination.currentPage
        this.totalPages = res.data.pagination.totalPages

        const store = albumStore()
        const currentPage = this.currentPage
        store.updatePagination(currentPage)
      })
    },
    getNews(id, index) {
      const selectedNews = this.newsList[index]
      const albumUrl = selectedNews.albumUrl
      if (albumUrl) {
        window.open(albumUrl, '_blank') // 使用新標籤頁打開
      } else {
        console.warn('No album URL found for this item.')
      }
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
      const width = window.innerWidth
      if (width <= 768) {
        this.maxLength = 30 // 手機版
      } else if (width <= 960) {
        this.maxLength = 60 // 平板版
      } else {
        this.maxLength = 120 // 桌面版
      }
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      }
      return text
    }
    
  }
}

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <section class="mb-20">
      <table class="table">
        <template v-for="(newsItem, index) in newsList" :key="newsItem.id">
          <!-- <NuxtLink :to="newsitem.albumUrl"> -->
          <tr @click="getNews(newsItem.announcementsId, index)" class="tr">
            <td class="td">{{ formatDate(newsItem.releaseAt) }}</td>
            <td>{{ truncateText(newsItem.title, maxLength) }}</td>
          </tr>
          <!-- </NuxtLink> -->
        </template>
      </table>
    </section>

    <PaginationComponent
      :pageLength="totalPages"
      :currentPage="currentPage"
      @setPage="changePage"
      @getList="getAnnouncementList"
    />

  
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
  background-color: #f3f3f3; /* 滑鼠懸停時的背景顏色 */
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
  border-top: 1px solid #6e6e6e;
  border-left: 1px solid #6e6e6e;
  border-right: 1px solid #6e6e6e;
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
