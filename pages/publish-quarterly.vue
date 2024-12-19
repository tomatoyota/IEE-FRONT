<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import associationsSrv from '@/service/associations.js'
import headerHelper from '@/utils/helpers/header.js'


const tmrDate = ref('')

const yearsItems = reactive([]) // 儲存年份選項
const seasonItems = reactive([]) // 儲存季節和ID選項
const selectedYear = ref(null) // 使用者選擇的年份
const selectedSeason = ref(null) // 使用者選擇的季節

const activeYear = ref(null)
const activeSeason = ref(null)

const quarterlyList = ref([])

const page = ref(1)
const totalPages = ref(0)

// 取得今天和明天的日期
const calculateDates = () => {
  const today = new Date()
  todayDate.value = formatDate(today)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  tmrDate.value = formatDate(tomorrow)
}

// 格式化日期為 YYYY-MM-DD
const formatDate = (date) => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}



const fileDatas = reactive([])

// 自訂函式
const Title = ref('')
const CatalogData = ref('')
const Image = ref('')

// 取得年份
const getYear = async () => {
  try {
    const res = await associationsSrv.getAssociationYears()
    if (res.isSuccess && Array.isArray(res.data)) {
      // 清空原有的年份選項
      yearsItems.splice(0, yearsItems.length)
      const validYears = res.data
        .filter((year) => year.toString().length === 4) // 只保留 4 位數的年份
        .sort((a, b) => b - a) // 按年份排序

      yearsItems.push(
        ...validYears.map((year) => ({
          key: year.toString(),
          label: `${year}年`
        }))
      )
  
      // 如果有資料，設置年分預設值
      if (yearsItems.length > 0) {
        activeYear.value = yearsItems[0].key;
        await getSeasonsByYear(activeYear.value);
      }

    } else {
      console.error('取得年份資料失敗，資料格式不正確:', res)
    }
  } catch (error) {
    console.error('取得年份資料時發生錯誤:', error)
  }
}

const getSeasonsByYear = async (year) => {
  const obj = {
    title: '',
    releaseStartAt: '',
    releaseEndAt: '',
    year: year,
    createdStartAt: '',
    createdEndAt: '',
    currentPage: 1,
    pageSize: 10,
    sortBy: 'release_date',
    sortDirection: 'DESC'
  }
  try {
    const res = await associationsSrv.getSeasonsByYear(obj)
    if (res.isSuccess && Array.isArray(res.data)) {
      // 格式化季節資料
      const seasonMapping = {
        1: '第一季',
        2: '第二季',
        3: '第三季',
        4: '第四季'
      }
      const formattedSeasons = res.data.map((item) => ({
        key: String(item.season),  
        label: seasonMapping[item.season] || '未知季度',
        associationId: item.associationId
      }))

      // 更新 seasonItems
      seasonItems.splice(0, seasonItems.length, ...formattedSeasons)
      if (seasonItems.length > 0 && !seasonItems.associationId) {
        activeSeason.value = seasonItems[0];
        getAssociations(seasonItems[0].associationId);   
      }
      
    } else {
      console.error('取得季度資料失敗，資料格式不正確:', res)
    }
  } catch (error) {
    console.error('取得季度資料時發生錯誤:', error)
  }
}
const getAssociations = async (id) => {

  try {
    const [associationsRes, ebookRes] = await Promise.all([
      associationsSrv.getAssociations(id),
      associationsSrv.getEbook(id),
    ]);

    // 處理 associations 資料
    if (associationsRes.isSuccess) {
      Title.value = associationsRes.data.title;
      CatalogData.value = associationsRes.data;
      Image.value = associationsRes.data.image[0]?.realFileName || '';
    } else {
      console.error('取得 Associations API 錯誤:', associationsRes.msg);
    }

    // 處理 ebook 資料
    if (ebookRes.isSuccess) {
      const { realFileName, originalFileName } = ebookRes.data.link;
      fileDatas.splice(0, fileDatas.length, {
        fileName: originalFileName,
        path: realFileName,
      });
    } else {
      console.error('取得 Ebook API 錯誤:', ebookRes.msg);
    }
  } catch (error) {
    console.error('同時執行 getAssociations 和 getEbook 時發生錯誤:', error);
  }
}

// 當年份選擇改變時，更新季節
const handleActiveYearKeyUpdate = (key) => {
  activeYear.value = key
  getSeasonsByYear(activeYear.value) // 重新獲取該年份的季節資料
}

// 當季節選擇改變時
const handleActiveSeasonKeyUpdate = async (key) => {
  const selectedSeason = seasonItems.find((item) => item.key === key)
  if (selectedSeason) {
    activeSeason.value = selectedSeason
    if (selectedSeason.key) {
      await getAssociations(selectedSeason.associationId) // 使用選中的 associationId 調用
    }
  }
}


  const getEbook = async (id)=> {
  try {
    const res = await associationsSrv.getEbook(id)
    if (res.isSuccess) {
      // fileDatas.value = res.data.title
      
    } else {
      console.error('API 錯誤:', res.msg)
    }
  } catch (error) {
    console.error('Error fetching associations:', error)
  }
}

onMounted(async () => {
  await getYear()
  if (activeYear.value) {
    await getSeasonsByYear(activeYear.value)
  }
  // if (activeSeason.value && activeSeason.value.associationId) {
  //   await getAssociations(activeSeason.value.associationId) // 獲取最新學刊內容
  // }
})
// watch(activeYear, (newYear) => {
//   if (newYear) {
//     getSeasonsByYear(newYear)
//   }
// })
// watch(
//   activeSeason,
//   (newSeason) => {
//     if (newSeason && newSeason.associationId) {
//       getAssociations(newSeason.associationId) // 使用 associationId 調用 API
//     }
//   },
//   { immediate: true } // 確保初始化時也執行
// )

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <Tabs class="[&>*:first-child]:mb-20">
      <TabsItem title="季刊簡介/訂閱">
        <section class="mb-20">
          <h4 class="title-underline mb-10 font-semibold">簡介</h4>
          <p class="indent-8 leading-7">
            係本會為凝聚全國電機工程人員，並提供電機、電子、資訊、通訊等相關新技術及產業狀況之刊物。每年發行四期，為中文期刊，由每期負責之編輯委員協助邀稿或撰寫相關文章，內容以綜合性、通俗性為主流，秉持著讓各個領域之人士均可了解為原則，不接受純理論之研究論文。
          </p>
        </section>
        <section>
          <h4 class="title-underline mb-10 font-semibold">訂閱資訊</h4>
          <ul class="list-disc leading-7">
            <li class="mb-7">
              實體刊物
              <ul class="list-disc">
                <li>國內訂戶每年新台幣500元</li>
                <li>國外訂戶每年US$50</li>
              </ul>
            </li>
            <li>
              電子刊物
              <ul class="list-disc">
                <li>
                  免費提供本會會員下載<NuxtLink
                    class="font-semibold text-logoColor underline underline-offset-4"
                    to="https://docs.google.com/presentation/u/1/d/1WvW-wSX8rnkE-w4mMrullRGfRhL5hnZMNUTARTm3wPU/edit"
                    >《電工通訊季刊》電子書</NuxtLink
                  >，提供會員相關會務訊息及各相關產業狀況、新技術等。
                </li>
                <li>
                  非會員可至<NuxtLink
                    class="font-semibold text-logoColor underline underline-offset-4"
                    to="https://www.airitilibrary.com/Publication/alPublicationJournal?PublicationID=P20140403004"
                    >華藝數位線上圖書館</NuxtLink
                  >付費下載電子書，或向本會訂閱實體刊物。
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </TabsItem>
      <TabsItem title="各期目錄">
        <div class="mb-10">
          <Dropdown
            :menuItems="yearsItems"
            :activeKey="activeYear"
            class="mr-4"
            @update:activeKey="handleActiveYearKeyUpdate"
          />
          <Dropdown
            :menuItems="seasonItems"
            :activeKey="activeSeason?.key"
            @update:activeKey="handleActiveSeasonKeyUpdate"
          />
          <!-- <select v-model="selectedYear" @change="handleYearChange">
      <option v-for="year in yearsItems" :key="year.key" :value="year.key">{{ year.label }}</option>
    </select>
    <ul>
      <li v-for="season in seasonItems" :key="season.associationId">
        {{ season.label }} (ID: {{ season.associationId }})
      </li>
    </ul> -->
        </div>
        <div class="flex flex-col-reverse gap-10 lg:flex-row">
          
          <div class="flex-1">
            <img
              v-if="Image.length>0"
              :src="Image"
              :alt="CatalogData.image[0].originalFileName"
              class="h-auto min-w-full"
            />
          </div>
          <div class="flex-shrink-0 lg:basis-[550px]">
            <section>
              <h4 class="title-underline mb-10 font-semibold">
                {{ Title }}
              </h4>
              <div v-html="CatalogData.catalog"></div>
            </section>
          </div>
         
        </div>
        <FileDownload
          isMemberOnly
          class="mt-[60px] md:mt-20 xl:mt-[120px]"
          :files="fileDatas"
        />
      </TabsItem>
    </Tabs>
  </section>
</template>
<style lang="scss" scoped></style>
