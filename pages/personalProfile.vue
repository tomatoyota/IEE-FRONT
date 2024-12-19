<template>
  <!-- 提醒視窗 -->
  <!-- <div class="d-lg-flex login-container model-width mx-auto my-auto rounded">
    <div class="absolute right-4 top-4">
        <Icon
          name="mi:close"
          class="outlinkIcon text-2xl"
          @click="$emit('closeMenu')"
        />
      </div>
      <div class="flex flex-col">
                <div class="sussess">
                  <Icon
                    name="mdi-check-circle-outline"
                    class="outlinkIcon mr-4 text-2xl"
                  />
                  <div class="flex-1">{{ rtnMsg }}</div>
                </div>

                <button
                  @click="changeView('login')"
                  class="mb-10 flex-1 rounded-lg bg-gray-900 px-32 py-4 font-thin text-gray-100"
                >
                  返回會員登入
                </button>
              </div>
  </div> -->

  <form>
    <div class="flex min-h-[40vh] items-start justify-center">
      <form class="w-[60%] max-w-[1200px]">
        <h1 class="mb-4 text-xl font-bold">修改個人會員</h1>
        <h3 class="text-style mb-4 flex items-center text-lg font-bold">
          基本資料
        </h3>

        <div class="flex flex-col gap-4 py-4">
          <!-- 會員證號 -->
          <!-- <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[500px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>會員證號
          </label>
          <input 
            type="text" 
            id="frontUserId" 
            name="frontUserId" 
            placeholder="請輸入證號"
            class="w-full p-4 border border-gray-300 rounded-md"
          />
        </div>
        <div class="flex-1 max-w-[500px]"></div>
      </div> -->

          <!-- Chinese and English Names -->
          <div class="flex items-center gap-4">
            <div class="max-w-[500px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>中文名稱
              </label>
              <input
                type="text"
                v-model="ModifyCondition.chineseName"
                placeholder="請輸入中文名稱"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledchineseName"
              />
            </div>
            <div class="max-w-[500px] flex-1">
              <label class="block font-bold"> 英文名稱 </label>
              <input
                type="text"
                v-model="ModifyCondition.englishName"
                placeholder="請輸入英文名稱"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledenglishName"
              />
            </div>
          </div>

          <!-- 身分證字號 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[500px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>身分證字號
              </label>
              <input
                type="text"
                v-model="ModifyCondition.idNumber"
                placeholder="請輸入身分證字號"
                class="w-full rounded-md border border-gray-300 p-4"
                :disabled="DisabledidNumber"
              />
            </div>
            <div class="max-w-[500px] flex-1"></div>
          </div>

          <!-- 性別 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[500px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>性別
              </label>
              <select
                v-model="ModifyCondition.gender"
                placeholder="請選擇性別"
                class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :disabled="Disabledgender"
              >
                <option value="" disabled selected>請選擇性別</option>
                <option value="1">男性</option>
                <option value="0">女性</option>
              </select>
            </div>
            <div class="max-w-[500px] flex-1"></div>
          </div>

          <!-- 出生日期 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[500px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>出生日期
              </label>
              <VueDatePicker
                label="出生日期"
                v-model="ModifyCondition.birthday"
                @update:modelValue="handleDateUpdate"
                :teleport="true"
                format="yyyy/MM/dd"
                placeholder="出生日期"
                :text-input="birthdayEditOption"
                :enable-time-picker="false"
                :disabled="Disabledbirthday"
              >
              </VueDatePicker>
            </div>
            <div class="max-w-[500px] flex-1"></div>
          </div>
        </div>
      </form>
    </div>

    <div class="flex min-h-[40vh] items-start justify-center">
      <form class="w-3/5 max-w-[1200px]">
        <h3 class="text-style my-4 flex items-center text-lg font-bold">
          聯絡資料
        </h3>

        <div class="flex flex-col gap-4 py-4">
          <!-- 主要通訊地址 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[330px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>主要通訊地址
              </label>
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
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>地區
              </label>
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
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>郵遞區號
              </label>
              <input
                type="text"
                v-model="ModifyCondition.mainAddressPostal"
                placeholder="請輸入郵遞區號"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <!-- 詳細地址 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>詳細地址
              </label>
              <input
                type="text"
                v-model="ModifyCondition.mainAddressDetail"
                placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <!-- 主要聯絡電話 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>主要聯絡電話
              </label>
              <input
                type="text"
                v-model="ModifyCondition.mainPhone"
                placeholder="手機範例：0900123987，市話範例：02-21113333"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <!-- 同主要通訊地址 -->
          <div class="max-w-[1025px] flex-1">
            <input
              type="checkbox"
              id="address1"
              name="address1"
              v-model="sameAddress"
            />
            <label for="sameAddress">同主要通訊地址</label>
          </div>

          <!-- 次要通訊地址 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[330px] flex-1">
              <label class="block font-bold">次要通訊地址</label>
              <select
                v-model="ModifyCondition.secondaryAddressCity"
                placeholder="請選擇縣市"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledsecondaryAddressCity"
              >
                <option value="" disabled selected>請選擇縣市</option>
                <option
                  v-for="cityitem in LocationList2"
                  :key="cityitem.locationId"
                  :value="cityitem.locationId"
                >
                  {{ cityitem.name }}
                </option>
              </select>
            </div>
            <div class="max-w-[330px] flex-1">
              <label class="block font-bold">地區</label>
              <select
                v-model="ModifyCondition.secondaryAddressDistrict"
                placeholder="請選擇區域"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledlocationCounty2"
              >
                <option value="" disabled selected>請選擇區域</option>
                <option
                  v-for="countyitem in countyList2"
                  :key="countyitem.locationId"
                  :value="countyitem.locationId"
                >
                  {{ countyitem.name }}
                </option>
              </select>
            </div>
            <div class="max-w-[330px] flex-1">
              <label class="block font-bold">郵遞區號</label>
              <input
                type="text"
                v-model="ModifyCondition.secondaryAddressPostal"
                placeholder="請輸入郵遞區號"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledsecondaryAddressPostal"
              />
            </div>
          </div>

          <!-- 次要詳細地址 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">詳細地址</label>
              <input
                type="text"
                v-model="ModifyCondition.secondaryAddressDetail"
                placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledsecondaryAddressDetail"
              />
            </div>
          </div>

          <!-- 同主要聯絡電話 -->
          <div class="max-w-[1025px] flex-1">
            <input type="checkbox" id="tel1" name="tel1" v-model="sameTel" />
            <label for="tel1">同主要聯絡電話</label>
          </div>

          <!-- 次要聯絡電話 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">次要聯絡電話</label>
              <input
                type="text"
                v-model="ModifyCondition.secondaryPhone"
                placeholder="手機範例：0900123987，市話範例：02-21113333"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="DisabledsecondaryPhone"
              />
            </div>
          </div>

          <!-- 電子郵件信箱 -->
          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">
                <span class="mr-1 text-red-500">*</span>電子郵件信箱
              </label>
              <input
                type="text"
                v-model="ModifyCondition.email"
                placeholder="請輸入電子郵件信箱"
                class="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="flex min-h-[40vh] items-start justify-center">
      <form class="w-3/5 max-w-[1200px]">
        <h3 class="text-style my-4 flex items-center text-lg font-bold">
          其他資料
        </h3>

        <!-- 最高學歷 -->
        <h5 class="m-0 flex items-center text-base font-bold">最高學歷</h5>
        <div class="flex items-center gap-4">
          <div class="max-w-[330px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.education"
              placeholder="學歷"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div class="max-w-[330px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.graduationYear"
              placeholder="畢業年份"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div class="max-w-[330px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.schoolMajor"
              placeholder="就讀學校"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <!-- 現職服務機關與職務 -->
        <h5 class="m-0 flex items-center text-base font-bold">
          現職服務機關與職務
        </h5>
        <div class="flex items-center gap-4">
          <div class="max-w-[330px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.industry"
              placeholder="行業別"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div class="max-w-[330px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.company"
              placeholder="請輸入服務機關"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div class="max-w-[330px] flex-1">
            <input
              type="text"
              v-model="ModifyCondition.position"
              placeholder="請輸入現任職務"
              class="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <div class="flex flex-col gap-4 py-4">
          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">
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
          </div>

          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">
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
          </div>

          <div class="flex items-center gap-4">
            <div class="max-w-[1025px] flex-1">
              <label class="block font-bold">通訊狀況</label>
              <select
                v-model="ModifyCondition.subscriptionStatus"
                placeholder="通訊狀況"
                class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled selected>通訊狀況</option>
                <option value="正常">正常</option>
                <option value="失聯">失聯</option>
              </select>
            </div>
          </div>

          <div class="max-w-[1025px] flex-1">
            <h5 class="m-0 flex items-center text-base font-bold">
              是否寄送會刊與資料
            </h5>
          </div>
          <div class="max-w-[1025px] flex-1">
            <input type="checkbox" id="nomail" name="nomail" v-model="noMail" />
            <label for="nomail">不寄送會刊</label>
          </div>
          <div class="max-w-[1025px] flex-1">
            <input type="checkbox" id="noinfo" name="noinfo" v-model="noInfo" />
            <label for="nomail">不寄送資料</label>
          </div>
        </div>
      </form>
    </div>

    <div class="flex min-h-[10vh] items-start justify-center">
      <form class="w-3/5 max-w-[1200px]">
        <!-- Column container -->
        <div class="max-w-[1025px] flex-1">
          <!-- Button container -->
          <div class="flex justify-end gap-4 py-4">
            <NuxtLink
              to="/"
              class="cursor-pointer rounded border border-black px-5 py-2"
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
  </form>
</template>
<script>
import { storeToRefs } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import PaginationComponent from '@/components/PaginationComponent.vue'
import swalWithCustomStyles from '@/utils/sweetAlert'
import dropSrv from '@/service/dropdown.js'

import { useRoute,useRouter } from 'vue-router'
import memberServ from '@/service/memberEditFront.js'
import { LoginStore } from '@/stores/LoginStore'
import { format } from 'date-fns' // Ensure date-fns is installed

import userHelper from '@/utils/helpers/user.js'
import { useUserStore } from '@/stores/UserStore'

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
        idNumber: '',
        gender: null,
        birthday: '',

        /**/
        level: null,
        applicationDate: '',
        approvalDate: '',
        //industry: '', //行業別

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
        secondaryAddressCity: null,
        secondaryAddressDistrict: null,
        secondaryAddressPostal: null,
        secondaryAddressDetail: null,
        preCity: null,
        preCounty: null,
        prePost: null,
        preAddress: null,
        secondaryPhone: null,
        previousePhone: null,
        email: null,
        education: null,
        graduationYear: null,
        schoolMajor: null,
        industry: null,
        company: null,
        position: null,
        entryDate: '',
        branch: null,
        subscriptionStatus: '',

        /**/
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
        industry: null,
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
        representatives: [
          {
            memberId: 1,
            name: '',
            position: '',
            phone: '',
            email: ''
          },
          {
            memberId: 2,
            name: '',
            position: '',
            phone: '',
            email: ''
          },
          {
            memberId: 3,
            name: '',
            position: '',
            phone: '',
            email: ''
          },
          {
            memberId: 4,
            name: '',
            position: '',
            phone: '',
            email: ''
          }
        ]
      },
      BranchList: [],
      LocationList: [],
      countyList: [],
      LocationList2: [],
      countyList2: [],

      /**/
      selectedlevel: '',
      groupLevelList: [],
      groupMemberData: [],
      //time
      birthdayEditOption: {
        rangeSeparator: ''
      },
      entryDateEditOption: {
        rangeSeparator: ''
      },

      storageData: [], // To hold the keys and values
      userId: '',
      previousCity: null,
      previousCity2: null,

      DisabledchineseName: false,
      DisabledenglishName: false,
      Disabledgender: false,
      Disabledbirthday: false,
      DisabledsecondaryAddressCity: false,
      DisabledsecondaryAddressDistrict: false,
      DisabledsecondaryAddressPostal: false,
      DisabledsecondaryAddressDetail: false,
      Disabledbranch: false,
      DisabledentryDate: false,

      DisabledidNumber: false,
      Disabledlevel: false,
      DisabledapplicationDate: false,
      DisabledapprovalDate: false,
      Disabledindustry: false,

      DisabledlocationCounty: false,
      DisabledlocationCounty2: false,
      noMail: false,
      noInfo: false,
      sameTel: false,
      sameAddress: false,
      DisabledsecondaryPhone: true,
      hasFetchedPersonalMember: false,
    }
  },
  created() {
    this.checkAccessPermission()
    this.getLocationList()
    this.fetchLocalStorageData()
    
  },
  watch: {
    
    sameTel: {
      handler(val) {
        if (val) {
          this.previousePhone = this.ModifyCondition.secondaryPhone
          this.ModifyCondition.secondaryPhone = this.ModifyCondition.mainPhone
          this.DisabledsecondaryPhone = true
        } else if (this.previousePhone) {
          this.ModifyCondition.secondaryPhone = this.previousePhone
          this.DisabledsecondaryPhone = false
        }
     
      },
      deep: true
    },

    sameAddress: {
      handler(val) {
        if (val) {
          // 同步主要地址到次要地址
          this.previousCity2 = this.ModifyCondition.mainAddressCity

          this.$nextTick(() => {
            this.ModifyCondition.secondaryAddressCity =
              this.ModifyCondition.mainAddressCity
            this.ModifyCondition.secondaryAddressDistrict =
              this.ModifyCondition.mainAddressDistrict
            this.ModifyCondition.secondaryAddressPostal =
              this.ModifyCondition.mainAddressPostal
            this.ModifyCondition.secondaryAddressDetail =
              this.ModifyCondition.mainAddressDetail
          })

          // 鎖定次要地址欄位
          this.DisabledsecondaryAddressCity = true
          this.DisabledlocationCounty2 = true
          this.DisabledsecondaryAddressPostal = true
          this.DisabledsecondaryAddressDetail = true

          // 更新次要地址的區域列表
          const matchCity = this.LocationList.find(
            (city) => city.locationId === this.ModifyCondition.mainAddressCity
          )
          this.countyList2 = matchCity ? matchCity.children || [] : []
        } else {
          // 清空次要地址欄位
          this.ModifyCondition.secondaryAddressCity = ''
          this.ModifyCondition.secondaryAddressDistrict = ''
          this.ModifyCondition.secondaryAddressPostal = ''
          this.ModifyCondition.secondaryAddressDetail = ''

          // 解除欄位禁用
          this.DisabledsecondaryAddressCity = false
          this.DisabledlocationCounty2 = false
          this.DisabledsecondaryAddressPostal = false
          this.DisabledsecondaryAddressDetail = false

          // 清空次要地址區域列表
          this.countyList2 = []
        }
      },
      deep: true
    },
    'ModifyCondition.entryDate': {
      handler(val) {
        this.entryDateEditOption.rangeSeparator = ''
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
    },
    'ModifyCondition.secondaryAddressCity': {
      handler(val) {
        this.ModifyCondition.secondaryAddressCity = val

        if (this.countyList2) {
          const matchCity = this.LocationList2.find(
            (city) => city.locationId === val
          )
          this.countyList2 = matchCity ? matchCity.children || [] : []
        }

        if (this.previousCity2 !== val) {
          this.ModifyCondition.secondaryAddressDistrict = ''
        }
      },
      deep: true
    },
    'ModifyCondition.secondaryAddressDistrict': {
      handler(val) {
        // 當選中次要地址的區域時，更新對應的郵遞區號
        const selectedDistrict = this.countyList2.find(
          (district) => district.locationId === val
        )
        if (selectedDistrict) {
          this.ModifyCondition.secondaryAddressPostal = selectedDistrict.postalCode
        } else {
          this.ModifyCondition.secondaryAddressPostal = ''
        }
      },
      deep: true
    }
  },
  mounted() {
    this.fetchInitialData()
    // this.getPersonalMember()
    if (!this.hasFetchedPersonalMember) {
    this.getPersonalMember();
    this.hasFetchedPersonalMember = true; // 標記為已執行
  }
    this.getGroupLevelList()
    this.getBranchList()
    this.$nextTick(() => {
    if (Array.isArray(this.LocationList) && this.LocationList.length > 0) {
      this.initializeMainAddress();
    }

    if (Array.isArray(this.LocationList2) && this.LocationList2.length > 0) {
      this.initializeSecondaryAddress();
    }
  });
    // this.checkAndReload();
    const hasChecked = sessionStorage.getItem("hasCheckedReload");
  if (!hasChecked) {
    this.checkAndReload();
    sessionStorage.setItem("hasCheckedReload", "true");
  }

  },
  computed: {},
  methods: {
    fetchLocalStorageData() {
      let data = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) // Get the key at index `i`
        const value = localStorage.getItem(key) // Get the value for the key
        if (key === 'this-user') {
          this.userId = value.replace(/"/g, '') // 移除多餘的雙引號
          // console.log(this.userId)
        }
        data[key] = value // Add key-value pair to the `data` object
      }
      this.storageData = data // Update the Vue data property
    },
    async getPersonalMember() {
      const loginStore = LoginStore()
      const userId = this.userId
      //console.log(userId)
      if (userId !== null) {
        memberServ.editPersonalProfile(userId).then((res) => {
          // console.log('response:', res.data.data.Individuals)
        })
        // this.$router.push('/groupProfile');
      } else {
        console.error(
          '無法獲取 userId，請檢查用戶是否已登入或 localStorage 設置是否正確。'
        )
      }
    },
    async fetchInitialData() {
      // this.loading = true
      try {
        const res = await memberServ.editPersonalProfile(this.userId)
        if (res.isSuccess && res.data.data.Individuals.length > 0) {
          const org = res.data.data.Individuals[0]
          

          this.ModifyCondition.chineseName = org.chineseName
          this.DisabledchineseName = true
          this.ModifyCondition.englishName = org.englishName
          this.DisabledenglishName = true
          this.ModifyCondition.gender = org.gender
          this.Disabledgender = true
          this.ModifyCondition.idNumber = org.idNumber
          this.DisabledidNumber = true

          this.ModifyCondition.birthday = org.birthday
          this.Disabledbirthday = true

          this.ModifyCondition.level = org.level
          this.Disabledlevel = true
          this.ModifyCondition.branch = org.branch
          this.Disabledbranch = true
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
          this.ModifyCondition.industry = industryId
          this.Disabledindustry = true

          // this.ModifyCondition.mainAddressCity = org.mainAddressCity
          // this.previousCity = org.mainAddressCity

          // this.ModifyCondition.mainAddressDistrict = org.mainAddressDistrict

          // this.ModifyCondition.mainAddressPostal = org.mainAddressPostal
          // this.ModifyCondition.mainAddressDetail = org.mainAddressDetail

          // 處理主要地址
          var mainAddressCity = org.mainAddressCity
          var mainAddressDistrict = org.mainAddressDistrict
          var mainAddressPostal = org.mainAddressPostal
          var mainAddressDetail = org.mainAddressDetail

          // console.log('Main Address City:', mainAddressCity)
          // console.log('Main Address District:', mainAddressDistrict)
          // console.log('Main Address Postal:', mainAddressPostal)

          this.ModifyCondition.mainAddressCity = mainAddressCity
          this.previousCity = mainAddressCity

          await this.getLocationList();

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
                // console.log(
                //   'Updated County List for Main Address:',
                //   this.countyList
                // )

                var districtExists = (this.countyList || []).some(function (
                  district
                ) {
                  return (
                    String(district.locationId) === String(mainAddressDistrict)
                  )
                })
                // console.log('Main Address District Exists:', districtExists)

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

          // this.ModifyCondition.secondaryAddressCity = org.secondaryAddressCity
          // this.previousCity2 = org.secondaryAddressCity

          // this.ModifyCondition.secondaryAddressDistrict =
          //   org.secondaryAddressDistrict
          // this.ModifyCondition.secondaryAddressPostal =
          //   org.secondaryAddressPostal
          // this.ModifyCondition.secondaryAddressDetail =
          //   org.secondaryAddressDetail

          var secondaryAddressCity = org.secondaryAddressCity
          var secondaryAddressDistrict = org.secondaryAddressDistrict
          var secondaryAddressPostal = org.secondaryAddressPostal
          var secondaryAddressDetail = org.secondaryAddressDetail

          this.ModifyCondition.secondaryAddressCity = secondaryAddressCity
          this.previousCity2 = secondaryAddressCity

          this.$nextTick(
            function () {
              var matchCity2 = (this.LocationList2 || []).find(
                function (city) {
                  return (
                    city.locationId ===
                    this.ModifyCondition.secondaryAddressCity
                  )
                }.bind(this)
              )

              if (matchCity2) {
                this.countyList2 = matchCity2.children || []
                // console.log(
                //   'Updated County List for Secondary Address:',
                //   this.countyList2
                // )

                var districtExists2 = (this.countyList2 || []).some(function (
                  district
                ) {
                  return (
                    String(district.locationId) ===
                    String(secondaryAddressDistrict)
                  )
                })
                // console.log(
                //   'Secondary Address District Exists:',
                //   districtExists2
                // )

                if (districtExists2) {
                  this.ModifyCondition.secondaryAddressDistrict =
                    secondaryAddressDistrict

                  var selectedDistrict2 = (this.countyList2 || []).find(
                    function (district) {
                      return (
                        String(district.locationId) ===
                        String(this.ModifyCondition.secondaryAddressDistrict)
                      )
                    }.bind(this)
                  )

                  if (selectedDistrict2) {
                    this.ModifyCondition.secondaryAddressPostal =
                      selectedDistrict2.postalCode || ''
                  } else {
                    console.error(
                      'Secondary Address District not found in County List2!'
                    )
                  }
                } else {
                  console.error(
                    'Secondary Address District does not exist in County List2!'
                  )
                }
              } else {
                console.error(
                  'Secondary Address City not found in Location List2!'
                )
              }
            }.bind(this)
          )

          // 同步其他次要地址資料
          this.ModifyCondition.secondaryAddressDetail = secondaryAddressDetail

          this.ModifyCondition.secondaryPhone = org.secondaryPhone
          if (
            this.ModifyCondition.mainPhone !=
            this.ModifyCondition.secondaryPhone
          ) {
            this.DisabledsecondaryPhone = false
          }
          this.ModifyCondition.email = org.email

          this.ModifyCondition.education = org.education
          this.ModifyCondition.graduationYear = org.graduationYear
          this.ModifyCondition.schoolMajor = org.schoolMajor
          this.ModifyCondition.industry = org.industry
          this.ModifyCondition.company = org.company
          this.ModifyCondition.position = org.position

          this.ModifyCondition.entryDate = org.entryDate
          //this.DisabledentryDate = true;

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

          this.ModifyCondition.subscriptionStatus = org.subscriptionStatus
          this.noMail = org.magazineSubscription
          this.noInfo = org.infoSubscription
          //console.log(res.data.data);
        }
      } catch (error) {
        console.error('初始化資料失敗：', error)
        swalWithCustomStyles
            .fire({
              toast: false,
              position: 'center',
              title: '資料初始化失敗，無法載入個人資料，請稍後重試。',
              confirmButtonColor: '#4CAF50',
              confirmButtonText: '確認',
              width: 500
            });
      } finally {
        // this.loading = false
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
  
async getLocationList() {
  try {
    const res = await dropSrv.getLocationList();
    if (res.isSuccess) {
      this.LocationList = res.data.data;
      this.LocationList2 = res.data.data;

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

initializeMainAddress() {
  if (!Array.isArray(this.LocationList) || this.LocationList.length === 0) {
    console.error("Location List not loaded!");
    return;
  }

  const matchCity = this.LocationList.find(
    (city) => city.locationId === this.ModifyCondition.mainAddressCity
  );

  if (matchCity) {
    this.countyList = matchCity.children || [];
    const selectedDistrict = this.countyList.find(
      (district) => district.locationId === this.ModifyCondition.mainAddressDistrict
    );
    this.ModifyCondition.mainAddressPostal = selectedDistrict
      ? selectedDistrict.postalCode
      : "";
  } else {
    console.error("Main Address City not found in Location List!");
  }
},

initializeSecondaryAddress() {
  if (!Array.isArray(this.LocationList2) || this.LocationList2.length === 0) {
    console.error("Location List2 not loaded!");
    return;
  }

  const matchCity = this.LocationList2.find(
    (city) => city.locationId === this.ModifyCondition.secondaryAddressCity
  );

  if (matchCity) {
    this.countyList2 = matchCity.children || [];
    const selectedDistrict = this.countyList2.find(
      (district) => district.locationId === this.ModifyCondition.secondaryAddressDistrict
    );
    this.ModifyCondition.secondaryAddressPostal = selectedDistrict
      ? selectedDistrict.postalCode
      : "";
  } else {
    console.error("Secondary Address City not found in Location List2!");
  }
},

// checkAndReload() {
//     const reloadFlag = sessionStorage.getItem("reloadFlag");

//     if (!reloadFlag) {
//       // 等待一定時間再檢查資料是否存在
//       setTimeout(() => {
//         if (this.LocationList.length === 0 || this.LocationList2.length === 0) {
//           sessionStorage.setItem("reloadFlag", "true");
//           location.reload(); // 重新加載頁面
//         }
//       }, 1000); // 延遲1秒後檢查
//     }
//   },

    handleDateUpdate(selectedDate) {
      this.ModifyCondition.birthday = format(
        new Date(selectedDate),
        'yyyy/MM/dd'
      )
    },
    
    async putMember() {
  const frontUserId = localStorage.getItem('this-user');
  const cleanUserId = JSON.parse(frontUserId);
  const router = useRouter()
  const obj = {
    frontUserId: cleanUserId,
    chineseName: this.ModifyCondition.chineseName,
    englishName: this.ModifyCondition.englishName,
    idNumber: this.ModifyCondition.idNumber,
    gender: this.ModifyCondition.gender,
    birthday: this.ModifyCondition.birthday,
    mainAddressCity: this.ModifyCondition.mainAddressCity,
    mainAddressDistrict: this.ModifyCondition.mainAddressDistrict,
    mainAddressPostal: this.ModifyCondition.mainAddressPostal,
    mainAddressDetail: this.ModifyCondition.mainAddressDetail,
    mainPhone: this.ModifyCondition.mainPhone,
    secondaryAddressCity: this.ModifyCondition.secondaryAddressCity,
    secondaryAddressDistrict: this.ModifyCondition.secondaryAddressDistrict,
    secondaryAddressPostal: this.ModifyCondition.secondaryAddressPostal,
    secondaryAddressDetail: this.ModifyCondition.secondaryAddressDetail,
    secondaryPhone: this.ModifyCondition.secondaryPhone,
    email: this.ModifyCondition.email,
    education: this.ModifyCondition.education,
    graduationYear: this.ModifyCondition.graduationYear,
    schoolMajor: this.ModifyCondition.schoolMajor,
    industry: this.ModifyCondition.industry,
    company: this.ModifyCondition.company,
    position: this.ModifyCondition.position,
    entryDate: this.ModifyCondition.entryDate,
    branch: this.ModifyCondition.branch,
    level: this.ModifyCondition.level,
    subscriptionStatus: this.ModifyCondition.subscriptionStatus,
    magazineSubscription: this.noMail,
    infoSubscription: this.noInfo
  };

  try {
    const res = await memberServ.putPersonalMember(obj);
    console.log('putPersonalMember res:', res);

    if (!res.isSuccess) {
      console.log('putPersonalMember失敗:', res);
      await swalWithCustomStyles.fire({
        toast: false,
        position: 'center',
        title: `${res.msg || '更新會員資料失敗'}`,
        confirmButtonColor: '#4CAF50',
        confirmButtonText: '確認',
        width: 500
      });
    } else {
      console.log('putPersonalMember成功res:', res);
      console.log('putPersonalMember成功data:', res.data);
      await swalWithCustomStyles.fire({
        toast: false,
        position: 'center',
        title: `${res.data.rtnMsg || '更新成功'}`,
        confirmButtonColor: '#4CAF50',
        confirmButtonText: '確認',
        width: 500
      });
    } await ((result) => {
      console.log('putPersonalMember成功alert1:', res);
        if (result.isConfirmed) {
          console.log('putPersonalMember成功alert2:', res);
          router.push('/')
          // this.$router.push('/');
        }
      })
console.log('put判斷結束:');
    // this.$router.push('/');
  } catch (error) {
    console.error('更新會員資料時出錯:', error);
    await swalWithCustomStyles
      .fire({
        toast: false,
        position: 'center',
        title: '更新會員資料失敗',
        confirmButtonColor: '#4CAF50',
        confirmButtonText: '確認',
        width: 500
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.push('/')
        }
      });
  }
},
    checkAccessPermission() {
      try {
        const userProfile = userHelper.getUserProfile()
        // 判斷使用者的 accountType 是否為 個人會員
        if (userProfile.accountType !== 1) {
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

<style scoped>
.login-container {
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 20px;
}
.text-style {
  font-size: 20px;
  font-weight: 600;
  color: #1b2482;
  padding: 4px;
  border-left: 8px solid #1b2482;
}
</style>
