<template>
 <!-- <HeaderComponent></HeaderComponent>
  <a href="javascript:;" id="main" accesskey="C" tabindex="0" class="position-absolute accessKeyU text-white" title="跳到中間區域">:::</a>
  <section class="news bg-yellow">
    <div class="container mx-auto p-4">
      <div class="sectionTitle" tabindex="0" aria-label="最新消息列表">
        {{$t('News')}}
      </div>
      <div class="grid grid-cols-1">
        <div cols="col-span-12">
          <ul class="list-unstyled">
            <template v-for="(newsItem, index) in newsList">
              <li tabindex="0" :aria-label="`最新消息 ${index + 1} ${newsItem.title}`" class="d-flex justify-space-between px-4 border-all shadow-yellow" @click="getNews(newsItem.newsId)">
                <span class="font-kai">{{ newsItem.title }}</span>
                <span class="date">{{ formatDate(newsItem.publishDate) }}</span>
              </li>
            </template>
            
          </ul>
        </div>
      </div>
      <v-pagination
      class="mt-4"
      v-model="page"
      :length="totalPages"
      ></v-pagination>
    </div> -->
    <!-- <LoadingComponent :loading="loading"/> -->
  <!-- </section> -->
  <!-- <Footer></Footer>  -->
</template>

<script>
// import HeaderComponent from '@/components/HeaderComponent.vue';
// import Footer from '@/components/Footer.vue';
// import { VDataTable } from 'vuetify/labs/VDataTable';
import newsSrv from '@/service/news.js';
// import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
  components:{
    // HeaderComponent,
    // Footer,
    // VDataTable,
    // LoadingComponent
},
  
  data() {
    return {
      newsList:[],
      itemsPerPage: 10,
      loading: false,
      totalItems: null,
      soundDisplay: 'hanyu',
      page: 1,
      pageCount: '10',
      totalPages: null,
      loading: false,
    };
  },
  mounted(){
    this.getAnnouncementList()
  },
  watch:{
    page(n){
      this.getAnnouncementList()
    }
  },
  methods:{
    async getAnnouncementList(){
      this.loading = true
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayDate = `${yyyy}-${mm}-${dd}`;

      // 計算明天的日期
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tmrYyyy = tomorrow.getFullYear();
      const tmrMm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const tmrDd = String(tomorrow.getDate()).padStart(2, '0');
      const tmrDate = `${tmrYyyy}-${tmrMm}-${tmrDd}`;
      const obj = {
          title: '',
          publishStartDate: '',
          publishEndDate: todayDate,
          department: '',
          createdStartAt: '',
          createdEndAt: '',
          expiredStartDate: tmrDate,
          expiredEndDate: '',
          page: this.page,
          pageSize: 10,
          sortBy: "publish_date",
          sortDirection: "DESC"
      };
      newsSrv.getAnnouncementList(obj).then((res) => {
        this.loading = false
        const newsList = res.data.data
        this.newsList = newsList
        this.page = res.data.pagination.currentPage
        this.totalPages = res.data.pagination.totalPages
      });
    },
    getNews(id){
      newsSrv.getAnnouncement(id).then((res) => {
        if(res.data.rtnCode === '0000'){
          const newsData = JSON.stringify(res.data.data);
          localStorage.setItem('newsData', newsData)
          this.$router.push('/newsView')
        }
      });
    },
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const isUtc = !dateStr.includes('Z') && !dateStr.includes('+') && !dateStr.includes('-');
        if (isUtc) {
            date.setHours(date.getHours() + 8);
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedDateTime = `${year}/${month}/${day}`;
        return formattedDateTime;
    },
  }
}
</script>

<style lang="scss" scoped>
.news{
    min-height: calc(100vh - 320px);
    padding: 30px 0;
    // background-image: url('@/assets/img/bg04.svg');
    background-size: 100%;

    .resultTitle{
      .query{
        display: inline-block;
        position: relative;
        font-size: 1.125rem;
        padding: 0 12px;
        color: #E76F51;
      }
    }
  }
  th{
    &:not(label){
      color: rgba($color: #000000, $alpha: .6);
    }
  }
  :deep(.v-label){
    font-size: 0.875rem;
  }
  .sectionTitle{
    position: relative;
    font-size: 1.5rem;
    text-align: center;
    font-weight: 900;
    margin-bottom: 60px;
  }
  ul{
      li{
        padding: 10px 0;
        cursor: pointer;
        background-color: white;
        border-radius: 4px;
        align-items: center;
        transition: .2s;
        
        &:not(:last-child){
          margin-bottom: 15px;
        }
        span{
          font-size: 1.125rem;
          font-weight: 900;
          &.date{
            color: #a1a1a1;
            font-size: 0.875rem;
            font-weight: 400;
          }
        }
        
        &:hover{
          background-color: var(--secondary);
          .date{
            color: #58471C;
          }
        }
      }
    }
</style>