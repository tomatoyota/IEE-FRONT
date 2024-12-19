<template>
  <div class="flex min-h-[50vh] items-start justify-center">
    <form class="my-8 w-3/5 max-w-[1200px]">
      <!-- <h1 class="mb-4 text-2xl font-bold">修改團體會員</h1> -->

      <!-- Basic Info Section -->
      <h3 class="text-style mb-6 flex items-center text-lg font-bold">
        基本資料
      </h3>

      <div class="flex flex-col gap-2">
        <!-- Chinese and English Names -->
        <div class="flex items-center gap-2">
          <div class="max-w-[500px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>團體中文名稱
            </label>
            <input
              type="text"
              v-model="ModifyCondition.chineseName"
              placeholder="請輸入團體中文名稱"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="DisabledchineseName"
            />
          </div>
          <div class="max-w-[500px] flex-1">
            <label class="mb-2 block font-bold"> 團體英文名稱 </label>
            <input
              type="text"
              v-model="ModifyCondition.englishName"
              placeholder="請輸入團體英文名稱"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="DisabledenglishName"
            />
          </div>
        </div>

        <!-- Membership Level -->
        <div class="flex items-center gap-2">
          <div class="max-w-[500px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>會員級別
            </label>
            <select
              v-model="ModifyCondition.level"
              placeholder="請選擇會員級別"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="Disabledlevel"
            >
              <option value="" disabled selected>請選擇會員級別</option>
              <option
                v-for="levelitem in groupLevelList"
                :key="levelitem.level"
                :value="levelitem.level"
              >
                {{ levelitem.name }}
              </option>
            </select>
          </div>
          <div class="max-w-[500px] flex-1"></div>
        </div>

        <!-- Branch -->
        <div class="flex items-center gap-2">
          <div class="max-w-[500px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>所屬分會
            </label>
            <select
              v-model="ModifyCondition.branch"
              placeholder="請選擇所屬分會"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="Disabledbranch"
            >
              <option value="" disabled selected>請選擇所屬分會</option>
              <option
                v-for="branchitem in BranchList"
                :key="branchitem.branchId"
                :value="branchitem.branchId"
              >
                {{ branchitem.level }}
              </option>
            </select>
          </div>
          <div class="max-w-[500px] flex-1"></div>
        </div>

        <!-- Dates -->
        <div class="flex items-center gap-2">
          <div class="max-w-[330px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>入會日期
            </label>
            <VueDatePicker
              label="入會日期"
              v-model="ModifyCondition.entryDate"
              :teleport="true"
              format="yyyy/MM/dd"
              placeholder="入會日期"
              :text-input="entryDateEditOption"
              :enable-time-picker="false"
              :disabled="DisabledentryDate"
            >
            </VueDatePicker>
          </div>
          <div class="max-w-[330px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>申請日期
            </label>
            <VueDatePicker
              label="申請日期"
              v-model="ModifyCondition.applicationDate"
              :teleport="true"
              format="yyyy/MM/dd"
              placeholder="申請日期"
              :text-input="applicationDateEditOption"
              :enable-time-picker="false"
              :disabled="DisabledapplicationDate"
            >
            </VueDatePicker>
          </div>
          <div class="max-w-[330px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>核准日期
            </label>
            <VueDatePicker
              label="核准日期"
              v-model="ModifyCondition.approvalDate"
              :teleport="true"
              format="yyyy/MM/dd"
              placeholder="核准日期"
              :text-input="approvalDateEditOption"
              :enable-time-picker="false"
              :disabled="DisabledapprovalDate"
            >
            </VueDatePicker>
          </div>
        </div>

        <!-- Industry -->
        <div class="flex items-center gap-2">
          <div class="max-w-[500px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>行業別
            </label>
            <input
              type="text"
              v-model="ModifyCondition.industry"
              placeholder="請輸入行業別"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="Disabledindustry"
            />
            <!-- <select
              v-model="ModifyCondition.industry"
              placeholder="請選擇行業別"
              class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="Disabledindustry"
            >
              <option value="" disabled selected>請選擇行業別</option>
              <option value="1">製造業</option>
              <option value="2">服務業</option>
              <option value="3">金融業</option>
              <option value="4">資訊業</option>
              <option value="5">其他</option>
            </select> -->
          </div>
          <div class="max-w-[500px] flex-1"></div>
        </div>
      </div>
    </form>
  </div>

  <div class="flex min-h-[40vh] items-start justify-center">
    <form class="w-[60%] max-w-[1200px]">
      <h3 class="text-style mb-6 flex items-center text-lg font-bold">
        聯絡資料
      </h3>

      <!-- 主要通訊地址 -->
      <h5 class="flex items-center text-base font-bold">
        <span class="mr-1 text-red-500">*</span>通訊地址
      </h5>
      <div class="flex items-center gap-2">
        <div class="max-w-[330px] flex-1">
          <select
            v-model="ModifyCondition.mainAddressCity"
            placeholder="請選擇縣市"
            class="w-full rounded border border-gray-300 p-2"
          >
            <option value="" disabled selected>請選擇縣市</option>
            <option
              v-for="cityitem in LocationList"
              :key="cityitem.locationId"
              :value="cityitem.locationId"
            >
              {{ cityitem.name }}
            </option>
          </select>
        </div>
        <div class="max-w-[330px] flex-1">
          <select
            v-model="ModifyCondition.mainAddressDistrict"
            placeholder="請選擇區域"
            class="w-full rounded border border-gray-300 p-2"
            :disabled="DisabledlocationCounty"
          >
            <option value="" disabled selected>請選擇區域</option>
            <option
              v-for="countyitem in countyList"
              :key="countyitem.locationId"
              :value="countyitem.locationId"
            >
              {{ countyitem.name }}
            </option>
          </select>
        </div>
        <div class="max-w-[330px] flex-1">
          <input
            type="text"
            v-model="ModifyCondition.mainAddressPostal"
            placeholder="請輸入郵遞區號"
            class="w-full rounded border border-gray-300 p-2"
            readonly
          />
        </div>
      </div>

      <!-- Form Fields -->
      <div class="flex flex-col gap-2 py-4">
        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.mainAddressDetail"
              placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <label class="mb-2 block font-bold">
              <span class="mr-1 text-red-500">*</span>聯絡電話
            </label>
            <input
              type="text"
              v-model="ModifyCondition.mainPhone"
              placeholder="手機範例：0900123987，市話範例：02-21113333"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <label class="mb-2 block font-bold"> 傳真電話 </label>
            <input
              type="text"
              v-model="ModifyCondition.fax"
              placeholder="範例：02-21113333"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <!-- 負責人 -->
        <div class="flex items-center gap-2">
          <h5 class="m-0 flex items-center text-base font-bold">
            <span class="mr-1 text-red-500">*</span>負責人
          </h5>
        </div>
        <div class="flex items-center gap-2">
          <div class="max-w-[500px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.responsiblePersonName"
              placeholder="請輸入姓名"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div class="max-w-[500px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.responsiblePersonPosition"
              placeholder="請輸入職務"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.responsiblePersonPhone"
              placeholder="請輸入電話"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.responsiblePersonEmail"
              placeholder="請輸入電子郵件信箱"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <!-- 聯絡人 -->
        <div class="flex items-center gap-2">
          <h5 class="m-0 flex items-center text-base font-bold">聯絡人</h5>
        </div>
        <div class="flex items-center gap-2">
          <div class="max-w-[500px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.contactName"
              placeholder="請輸入姓名"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div class="max-w-[500px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.contactPosition"
              placeholder="請輸入職務"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.contactPhone"
              placeholder="請輸入電話"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="max-w-[1025px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.contactEmail"
              placeholder="請輸入電子郵件信箱"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="flex min-h-[20vh] items-start justify-center">
    <form class="w-[60%] max-w-[1200px]">
      <div
        v-for="(member, index) in ModifyCondition.representatives"
        :key="index"
        class="py-6"
      >
        <h3 class="text-style m-0 flex items-center text-lg font-bold">
          會員代表 {{ index + 1 }}
        </h3>

        <div class="flex flex-col gap-2 py-4">
          <!-- 姓名 -- 職務 -->
          <div class="flex items-center gap-2">
            <div class="max-w-[500px] flex-1">
              <label class="mb-2 block font-bold"> 姓名 </label>
              <input
                type="text"
                v-model="member.name"
                placeholder="請輸入姓名"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div class="max-w-[500px] flex-1">
              <label class="mb-2 block font-bold"> 職務 </label>
              <input
                type="text"
                v-model="member.position"
                placeholder="請輸入職務"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <!-- 電話 -->
          <div class="flex items-center gap-2">
            <div class="max-w-[1025px] flex-1">
              <label class="mb-2 block font-bold"> 電話 </label>
              <input
                type="text"
                v-model="member.phone"
                placeholder="請輸入電話"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <!-- 電子郵件信箱 -->
          <div class="flex items-center gap-2">
            <div class="max-w-[1025px] flex-1">
              <label class="mb-2 block font-bold"> 電子郵件信箱 </label>
              <input
                type="email"
                v-model="member.email"
                placeholder="請輸入電子郵件信箱"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Add Member Button -->
      <div class="flex flex-col items-center py-4">
        <button
          type="button"
          class="cursor-pointer rounded bg-indigo-800 px-5 py-2 text-white"
          @click="addMember"
          :disabled="
            ModifyCondition.representations &&
            ModifyCondition.representations.length >= 4
          "
        >
          新增會員代表
        </button>
        <p v-show="showMaxLimitMessage" class="mt-4 text-red-500">
          最多四位會員代表
        </p>
      </div>
    </form>
  </div>

  <div class="flex min-h-[10vh] items-start justify-center">
    <form class="w-3/5 max-w-[1200px]">
      <!-- Column container -->
      <div class="max-w-[1025px] flex-1">
        <!-- Button container -->
        <div class="flex justify-end gap-2 py-4">
          <NuxtLink
            to="/"
            class="inline-block cursor-pointer rounded border border-gray-950 px-5 py-2 text-center"
          >
            取消
          </NuxtLink>
          <button
            @click="putMember"
            class="cursor-pointer rounded bg-indigo-800 px-5 py-2 text-white"
          >
            儲存
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { storeToRefs } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import PaginationComponent from '@/components/PaginationComponent.vue'
import swalWithCustomStyles from '@/utils/sweetAlert'
import dropSrv from '@/service/dropdown.js'
import Item from '~/components/Tabs/item.vue'

import memberServ from '@/service/memberEditFront.js'
import { LoginStore } from '@/stores/LoginStore'
import { useRoute , useRouter } from 'vue-router'

export default {
  components: {
    VueDatePicker,
    PaginationComponent
    //LoadingComponent,
  },
  data() {
    return {
      ModifyCondition: {
        chineseName: '',
        englishName: '',
        level: null,
        branch: null,
        entryDate: '',
        applicationDate: '',
        approvalDate: '',
        industry: '', //行業別

        representatives: [
          {
            name: '',
            position: '',
            phone: '',
            email: ''
          }
        ],

        locationId: this.selectedCounty || this.selectedCity,

        city: [],
        county: [],
        selectedCity: null,
        selectedCounty: null,

        mainAddressCity: null,
        mainAddressDistrict: null,
        mainAddressPostal: null,
        mainAddressDetail: null,
        mainPhone: null,
        fax: null,

        responsiblePersonName: null,
        responsiblePersonPosition: null,
        responsiblePersonPhone: null,
        responsiblePersonEmail: null,

        contactName: null,
        contactPosition: null,
        contactPhone: null,
        contactEmail: null,

        frontUserId: '',
        name: '',
        paymentStatus: null,
        sortBy: 'createdAt',
        sortDirection: 'DESC',
        currentPage: 1,
        pageSize: 10
      },
      formData: {
        chineseName: '',
        englishName: '',
        level: null,
        branch: null,
        entryDate: '',
        applicationDate: '',
        approvalDate: '',
        industry: '',
        mainAddressCity: null,
        mainAddressDistrict: null,
        mainAddressPostal: '',
        mainAddressDetail: '',
        mainPhone: '',
        fax: '',
        responsiblePersonName: '',
        responsiblePersonPosition: '',
        responsiblePersonPhone: '',
        responsiblePersonEmail: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        // contactEmail: '',
        representatives: [],
        showMaxLimitWarning: false
        // representatives: [
        //   {
        //     memberId: 1,
        //     name: '',
        //     position: '',
        //     phone: '',
        //     email: ''
        //   },
        //   {
        //     memberId: 2,
        //     name: '',
        //     position: '',
        //     phone: '',
        //     email: ''
        //   },
        //   {
        //     memberId: 3,
        //     name: '',
        //     position: '',
        //     phone: '',
        //     email: ''
        //   },
        //   {
        //     memberId: 4,
        //     name: '',
        //     position: '',
        //     phone: '',
        //     email: ''
        //   }
        // ]
      },
      selectedlevel: '',
      groupLevelList: [],
      BranchList: [],
      LocationList: [],
      countyList: [],
      groupMemberData: [],
      //time
      entryDateEditOption: {
        rangeSeparator: ''
      },
      applicationDateEditOption: {
        rangeSeparator: ''
      },
      approvalDateEditOption: {
        rangeSeparator: ''
      },

      storageData: [], // To hold the keys and values
      userId: '',
      previousCity: null,
      DisabledchineseName: false,
      DisabledenglishName: false,
      Disabledlevel: false,
      Disabledbranch: false,
      DisabledentryDate: false,
      DisabledapplicationDate: false,
      DisabledapprovalDate: false,
      Disabledindustry: false,

      DisabledlocationCounty: false,
      hasFetchedPersonalMember: false
    }
  },
  created() {
    this.checkAccessPermission()
    this.getLocationList()
    this.fetchLocalStorageData()
  },
  watch: {
    'ModifyCondition.entryDate': {
      handler(val) {
        this.entryDateEditOption.rangeSeparator = ''
      },
      deep: true
    },
    'ModifyCondition.applicationDate': {
      handler(val) {
        this.applicationDateEditOption.rangeSeparator = ''
      },
      deep: true
    },
    'ModifyCondition.approvalDate': {
      handler(val) {
        this.approvalDateEditOption.rangeSeparator = ''
      },
      deep: true
    },
    
    'ModifyCondition.mainAddressCity': {
      handler(val) {
        this.ModifyCondition.mainAddressCity = val

        if (this.LocationList) {
          const matchCity = this.LocationList.find(
            (city) => city.locationId === val
          )
          this.countyList = matchCity ? matchCity.children || [] : []
        }

        if (this.previousCity !== val) {
          this.ModifyCondition.mainAddressDistrict = ''
        }
      },
      deep: true
    },
    'ModifyCondition.mainAddressDistrict': {
      handler(val) {
        // 當選中主要地址的區域時，更新對應的郵遞區號
        const selectedDistrict = this.countyList.find(
          (district) => district.locationId === val
        )
        if (selectedDistrict) {
          this.ModifyCondition.mainAddressPostal = selectedDistrict.postalCode
        } else {
          this.ModifyCondition.mainAddressPostal = ''
        }
      },
      deep: true
    }
  },
  mounted() {
    this.fetchInitialData()
    if (!this.hasFetchedPersonalMember) {
      this.getGroupMember()
      this.hasFetchedPersonalMember = true // 標記為已執行
    }
    // this.getGroupMember()
    this.getGroupLevelList()
    this.getBranchList()
    //   if (Array.isArray(this.LocationList) && this.LocationList.length > 0) {
    //   this.initializeMainAddress();
    // }
    this.$nextTick(() => {
      if (Array.isArray(this.LocationList) && this.LocationList.length > 0) {
        this.initializeMainAddress()
      }
    })
    const hasChecked = sessionStorage.getItem('hasCheckedReload')
    if (!hasChecked) {
      this.checkAndReload()
      sessionStorage.setItem('hasCheckedReload', 'true')
    }
  },
  computed: {
    showMaxLimitMessage() {
      return (
        this.ModifyCondition.representatives &&
        this.ModifyCondition.representatives.length >= 4
      )
    }
  },
  methods: {
    fetchLocalStorageData() {
      let data = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) // Get the key at index `i`
        const value = localStorage.getItem(key) // Get the value for the key
        if (key === 'this-user') {
          this.userId = value.replace(/"/g, '')
          //console.log(this.userId)
        }
        data[key] = value // Add key-value pair to the `data` object
      }
      this.storageData = data // Update the Vue data property
      // console.log('localStorage data:', this.storageData)
    },
    async getGroupMember() {
      const loginStore = LoginStore()
      const userId = this.userId // 移除多餘的雙引號
      //console.log(userId)
      if (userId !== null) {
        memberServ.editGroupProfile(userId).then((res) => {
          // console.log('response:', res.data.data.Organizations)
        })
        // this.$router.push('/groupProfile');
      } else {
        console.error(
          '無法獲取 userId，請檢查用戶是否已登入或 localStorage 設置是否正確。'
        )
      }
    },
    async fetchInitialData() {
      this.loading = true
      try {
        const res = await memberServ.editGroupProfile(this.userId)
        if (res.isSuccess && res.data.data.Organizations.length > 0) {
          const org = res.data.data.Organizations[0]
          // console.log('org',org);
          // console.log('會員代表',org.RepresentativeMembers);
          // await this.ensureLocationListReady()
          // this.initializeMainAddress()

          this.ModifyCondition.chineseName = org.chineseName
          this.DisabledchineseName = true
          this.ModifyCondition.englishName = org.englishName
          this.DisabledenglishName = true
          this.ModifyCondition.level = org.level
          this.Disabledlevel = true
          this.ModifyCondition.branch = org.branch
          this.Disabledbranch = true
          this.ModifyCondition.entryDate = org.entryDate
          this.DisabledentryDate = true
          this.ModifyCondition.applicationDate = org.applicationDate
          this.DisabledapplicationDate = true
          this.ModifyCondition.approvalDate = org.approvalDate
          this.DisabledapprovalDate = true
          var industryId = null
          switch (org.industry) {
            case '製造業':
              industryId = 1
              break
            case '服務業':
              industryId = 2
              break
            case '金融業':
              industryId = 3
              break
            case '資訊業':
              industryId = 4
              break
            case '其他':
              industryId = 5
              break
          }
          // this.ModifyCondition.industry = industryId;
          this.ModifyCondition.industry = org.industry
          this.Disabledindustry = true
          // console.log('org.mainAddressCity', org.mainAddressCity)
          // console.log('org.mainAddressDistrict', org.mainAddressDistrict)
          // console.log('org.mainAddressPostal', org.mainAddressPostal)
          // 處理主要地址
          var mainAddressCity = org.mainAddressCity
          var mainAddressDistrict = org.mainAddressDistrict
          var mainAddressPostal = org.mainAddressPostal
          var mainAddressDetail = org.mainAddressDetail
          this.ModifyCondition.mainAddressCity = mainAddressCity
          this.previousCity = mainAddressCity
      

          // await this.initializeMainAddress()

          await this.getLocationList()

          this.$nextTick(
            function () {
              // console.log('Location List:', this.LocationList)
              
              var matchCity = (this.LocationList || []).find(
                function (city) {
                  return (
                    city.locationId === this.ModifyCondition.mainAddressCity
                  )
                }.bind(this)
              )

              if (matchCity) {

                this.countyList = matchCity.children || []

                var districtExists = (this.countyList || []).some(function (
                  district
                ) {
                  return (
                    String(district.locationId) === String(mainAddressDistrict)
                  )
                })

                if (districtExists) {
                  this.ModifyCondition.mainAddressDistrict = mainAddressDistrict

                  var selectedDistrict = (this.countyList || []).find(
                    function (district) {
                      return (
                        String(district.locationId) ===
                        String(this.ModifyCondition.mainAddressDistrict)
                      )
                    }.bind(this)
                  )

                  if (selectedDistrict) {
                    this.ModifyCondition.mainAddressPostal =
                      selectedDistrict.postalCode || ''
                  } else {
                    console.error(
                      'Main Address District not found in County List!'
                    )
                  }
                } else {
                  console.error(
                    'Main Address District does not exist in County List!'
                  )
                }
              } else {
                console.error('Main Address City not found in Location List!')
              }
            }.bind(this)
          )

          this.ModifyCondition.mainAddressDetail = mainAddressDetail

          this.ModifyCondition.mainPhone = org.mainPhone
          this.ModifyCondition.fax = org.fax

          this.ModifyCondition.responsiblePersonName = org.responsiblePersonName
          this.ModifyCondition.responsiblePersonPosition =
            org.responsiblePersonPosition
          this.ModifyCondition.responsiblePersonPhone =
            org.responsiblePersonPhone
          this.ModifyCondition.responsiblePersonEmail =
            org.responsiblePersonEmail

          this.ModifyCondition.contactName = org.contactName
          this.ModifyCondition.contactPosition = org.contactPosition
          this.ModifyCondition.contactPhone = org.contactPhone
          this.ModifyCondition.contactEmail = org.contactEmail

          this.ModifyCondition.representatives = org.RepresentativeMembers
          //console.log(res.data.data);
        }
      } catch (error) {
        console.error('初始化資料失敗：', error)
      } finally {
        this.loading = false
      }
    },
   
    async getLocationList() {
      try {
        const res = await dropSrv.getLocationList()
        if (res.isSuccess) {
          this.LocationList = res.data.data

          // 返回 Promise 以供調用方等待資料加載完成
          return Promise.resolve(this.LocationList)
        } else {
          return Promise.reject('Failed to load LocationList')
        }
      } catch (error) {
        console.error('Error loading LocationList:', error)
        swalWithCustomStyles.fire({
          toast: false,
          position: 'center',
          title: '無法載入地區清單，請稍後重試。',
          confirmButtonColor: '#4CAF50',
          confirmButtonText: '確認',
          width: 500
        })
        return Promise.reject(error)
      }
    },

    initializeMainAddress() {
      if (!Array.isArray(this.LocationList) || this.LocationList.length === 0) {
        console.error('Location List not loaded!')
        return
      }

      const matchCity = this.LocationList.find(
        (city) => city.locationId === this.ModifyCondition.mainAddressCity
      )

      if (matchCity) {
        this.countyList = matchCity.children || []
        const selectedDistrict = this.countyList.find(
          (district) =>
            district.locationId === this.ModifyCondition.mainAddressDistrict
        )
        this.ModifyCondition.mainAddressPostal = selectedDistrict
          ? selectedDistrict.postalCode
          : ''
      } else {
        console.error('Main Address City not found in Location List!')
      }
    },

    getGroupLevelList() {
      dropSrv
        .getGroupLevelList()
        .then((res) => {
          if (res.isSuccess) {
            this.groupLevelList = res.data.data
            //console.log(this.groupLevelList);
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    getBranchList() {
      dropSrv
        .getBranchList()
        .then((res) => {
          if (res.isSuccess) {
            this.BranchList = res.data.data
            //console.log(this.BranchList);
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    // getLocationList() {
    //   dropSrv
    //     .getLocationList()
    //     .then((res) => {
    //       if (res.isSuccess) {
    //         // this.LocationList = res.data.data
    //         this.LocationList = res.data.data || []
    //         if (this.LocationList.length > 0) {
    //           this.initializeMainAddress()
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error)
    //       this.LocationList = []
    //     })
    // },
    async getLocationList() {
  try {
    const res = await dropSrv.getLocationList();
    if (res.isSuccess) {
      this.LocationList = res.data.data;

      // 返回 Promise 以供調用方等待資料加載完成
      return Promise.resolve(this.LocationList);
    } else {
      return Promise.reject('Failed to load LocationList');
    }
  } catch (error) {
    console.error('Error loading LocationList:', error);
    swalWithCustomStyles
            .fire({
              toast: false,
              position: 'center',
              title: '無法載入地區清單，請稍後重試。',
              confirmButtonColor: '#4CAF50',
              confirmButtonText: '確認',
              width: 500
            });
    return Promise.reject(error);
  }
},
    addMember() {
      if (this.ModifyCondition.representatives.length < 4) {
        this.ModifyCondition.representatives.push({
          name: '',
          position: '',
          phone: '',
          email: ''
        })
      }
    },
    async putMember() {
      if (!Array.isArray(this.ModifyCondition.representatives)) {
        this.ModifyCondition.representatives = []
      }

      // 過濾代表資料
      const filteredRepresentatives =
        this.ModifyCondition.representatives.filter((rep) => {
          const hasRequiredFields =
            rep.name || rep.position || rep.phone || rep.email
          const isCompleteForEdit = rep.memberId || hasRequiredFields

          // 若代表的四個主要屬性中至少有一個不為空，則保留
          return isCompleteForEdit && hasRequiredFields
        })

      const frontUserId = localStorage.getItem('this-user')
      const cleanUserId = JSON.parse(frontUserId)
      const router = useRouter()

      const obj = {
        frontUserId: cleanUserId,
        chineseName: this.ModifyCondition.chineseName,
        englishName: this.ModifyCondition.englishName,
        level: this.ModifyCondition.level,
        branch: this.ModifyCondition.branch,
        entryDate: this.ModifyCondition.entryDate,
        applicationDate: this.ModifyCondition.applicationDate,
        approvalDate: this.ModifyCondition.approvalDate,
        industry: this.ModifyCondition.industry,
        mainAddressCity: this.ModifyCondition.mainAddressCity,
        mainAddressDistrict: this.ModifyCondition.mainAddressDistrict,
        mainAddressPostal: this.ModifyCondition.mainAddressPostal,
        mainAddressDetail: this.ModifyCondition.mainAddressDetail,
        mainPhone: this.ModifyCondition.mainPhone,
        fax: this.ModifyCondition.fax,
        responsiblePersonName: this.ModifyCondition.responsiblePersonName,
        responsiblePersonPosition:
          this.ModifyCondition.responsiblePersonPosition,
        responsiblePersonPhone: this.ModifyCondition.responsiblePersonPhone,
        responsiblePersonEmail: this.ModifyCondition.responsiblePersonEmail,
        contactName: this.ModifyCondition.contactName,
        contactPosition: this.ModifyCondition.contactPosition,
        contactPhone: this.ModifyCondition.contactPhone,
        ...(filteredRepresentatives.length > 0
          ? { representatives: filteredRepresentatives }
          : {})
      }

      try {
        const res = await memberServ.putGroupMember(obj)
        console.log('putGroupMember res:', res)
        console.log('putGroupMember data:', res.data)

        const title = res.isSuccess
          ? res.data.rtnMsg || '更新成功'
          : res.msg || '更新失敗'

        await swalWithCustomStyles.fire({
          toast: false,
          position: 'center',
          title: title,
          // confirmButtonColor: '#4CAF50',
          confirmButtonText: '確認',
          width: 500
        })

        if (res.isSuccess) {
          console.log('put成功:', res.data)
          router.push('/')
        } else {
          console.error('put失敗:', res)
        }
      } catch (error) {
        console.error('更新資料時發生錯誤:', error)

        await swalWithCustomStyles.fire({
          toast: false,
          position: 'center',
          title: '更新資料時發生錯誤',
          confirmButtonColor: '#4CAF50',
          confirmButtonText: '確認',
          width: 500
        })
        router.push('/')
      }
    },


    checkAccessPermission() {
      const router = useRouter()
      try {
        const userProfile = userHelper.getUserProfile()
        // 判斷使用者的 accountType 是否為 個人會員
        if (userProfile.accountType !== 2) {
          // 如果條件不符，跳轉至首頁
          router.push('/')
        }
      } catch (error) {
        console.error('無法檢查使用者權限：', error)
        router.push('/')
      }
    }
  }
}
</script>

<style>
.text-style {
  font-size: 20px;
  font-weight: 600;
  color: #1b2482;
  padding: 4px;
  border-left: 8px solid #1b2482;
}
</style>
