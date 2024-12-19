<template>
  <div class="overlay">
    <div class="card">
      <div class="cardHeader">
        <div class="d-flex justify-end">
          <Icon
            @click="$emit('close')"
            name="mdi:close"
            class="outlinkIcon text-2xl"
          />
        </div>
      </div>
      <div class="cardBody">
        <div class="text-style mb-4">基本資料</div>
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- 中文姓名 -->
            <div>
              <label class="mb-2 block font-bold"
                ><label class="mb-2 font-bold text-red-500">*</label
                >中文姓名</label
              >
              <input
                v-model="formData.chineseName"
                type="text"
                placeholder="請輸入中文姓名"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                :rules="textFieldRule"
                @blur="validateField('chineseName', formData.chineseName)"
              />
              <p v-if="errors.chineseName" class="text-sm text-red-500">
                {{ errors.chineseName }}
              </p>
            </div>

            <!-- 英文姓名 -->
            <div>
              <label class="mb-2 block font-bold">英文姓名</label>
              <input
                v-model="formData.englishName"
                type="text"
                placeholder="請輸入英文姓名"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- 會員級別 (僅在 edit 模式顯示) -->
          <div v-if="pageAction === 'edit'">
            <label class="mb-2 block font-bold">會員級別</label>
            <input
              v-model="formData.level"
              type="text"
              placeholder="請輸入身分證字號"
              class="w-full rounded border border-gray-300 bg-gray-100 p-2"
              disabled
            />
          </div>

          <!-- 身分證字號 -->
          <div>
            <label class="mb-2 block font-bold"
              ><label class="mb-2 font-bold text-red-500">*</label
              >身分證字號</label
            >
            <input
              v-model="formData.idNumber"
              @blur="validateField('idNumber', formData.idNumber)"
              type="text"
              placeholder="請輸入身分證字號"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
            <p v-if="errors.idNumber" class="text-sm text-red-500">
              {{ errors.idNumber }}
            </p>
          </div>

          <!-- 性別 -->
          <div>
            <label class="mb-2 font-bold text-red-500">*</label
            ><label class="mb-2 font-bold">性別</label>
            <select
              v-model="formData.gender"
              @blur="validateField('gender', formData.gender)"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            >
              <option
                v-for="gender in genderList"
                :key="gender.value"
                :value="gender.value"
              >
                {{ gender.name }}
              </option>
            </select>
            <p v-if="errors.gender" class="text-sm text-red-500">
              {{ errors.gender }}
            </p>
          </div>

          <!-- 出生日期 -->
          <div>
            <label class="mb-2 font-bold text-red-500">*</label
            ><label class="mb-2 font-bold">出生日期</label>
            <datepicker
              @blur="validateField('birthDate', formData.birthDate)"
              v-model="formData.birthDate"
              :clearable="true"
              :enableTimePicker="false"
              placeholder="請選擇出生日期"
            />
            <p v-if="errors.birthDate" class="text-sm text-red-500">
              {{ errors.birthDate }}
            </p>
          </div>
        </div>

        <!-- 聯絡資料 -->
        <div class="text-style mb-4 mt-8">聯絡資料</div>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="mb-2 font-bold text-red-500">*</label
            ><label class="mb-2 font-bold">主要通訊地址</label>
            <div class="grid grid-cols-3 gap-4">
                <select
                  @blur="
                    validateField('mainAddressCity', formData.mainAddressCity)
                  "
                  v-model="formData.mainAddressCity"
                  class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                >
                  <option
                    v-for="city in cityList"
                    :key="city.locationId"
                    :value="city.locationId"
                  >
                    {{ city.name }}
                  </option>
                </select>
                

              <select
                @blur="
                  validateField(
                    'mainAddressDistrict',
                    formData.mainAddressDistrict
                  )
                "
                v-model="formData.mainAddressDistrict"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="district in districtList"
                  :key="district.locationId"
                  :value="district.locationId"
                >
                  {{ district.name }}
                </option>
              </select>
              <input
                v-model="formData.mainAddressPostal"
                type="text"
                placeholder="郵遞區號"
                class="w-full rounded border border-gray-300 bg-gray-100 p-2 focus:ring-1 focus:ring-blue-500"
                readonly
              />
            </div>
            <div class="grid grid-cols-3 gap-4">
              <p v-if="errors.mainAddressCity" class="text-sm text-red-500">
                  {{ errors.mainAddressCity }}
                </p>
                <p v-if="errors.mainAddressDistrict" class="text-sm text-red-500">
                  {{ errors.mainAddressDistrict }}
                </p>
                <p></p>
            </div>
            <div class="mt-4 grid grid-cols-1 gap-4">
              <input
                @blur="
                  validateField('mainAddressDetail', formData.mainAddressDetail)
                "
                v-model="formData.mainAddressDetail"
                type="text"
                placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
              <p v-if="errors.mainAddressDetail" class="text-sm text-red-500">
                {{ errors.mainAddressDetail }}
              </p>
            </div>
          </div>

          <!-- 主要聯絡電話 -->
          <div>
            <label class="mb-2 font-bold text-red-500">*</label
            ><label class="mb-2 font-bold">主要聯絡電話</label>
            <input
            @blur="validateField('mainPhone', formData.mainPhone)"
              v-model="formData.mainPhone"
              type="text"
              placeholder="手機範例：0900123987，市話範例：02-21113333"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
            <p v-if="errors.mainPhone" class="text-sm text-red-500">
                {{ errors.mainPhone }}
              </p>
          </div>

          <!-- 次要通訊地址 -->
          <div>
            <label class="mb-2 block font-bold">次要通訊地址</label>
            <input
              type="checkbox"
              v-model="followMainAddress"
              class="mr-2"
            />同主要通訊地址
            <div class="mt-2 grid grid-cols-3 gap-4">
              <select
                v-model="formData.secondaryAddressCity"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="city in secondaryCityList"
                  :key="city.locationId"
                  :value="city.locationId"
                >
                  {{ city.name }}
                </option>
              </select>
              <select
                v-model="formData.secondaryAddressDistrict"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="district in secondaryDistrictList"
                  :key="district.locationId"
                  :value="district.locationId"
                >
                  {{ district.name }}
                </option>
              </select>
              <input
                v-model="formData.secondaryAddressPostal"
                type="text"
                placeholder="郵遞區號"
                class="w-full rounded border border-gray-300 bg-gray-100 p-2"
                readonly
              />
            </div>
            <div class="mt-4 grid grid-cols-1 gap-4">
              <input
                v-model="formData.secondaryAddressDetail"
                type="text"
                placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- 次要聯絡電話 -->
          <div>
            <label class="mb-2 block font-bold">次要聯絡電話</label>
            <input
              type="checkbox"
              v-model="followMainPhone"
              class="mr-2"
            />同主要聯絡電話
            <input
              v-model="formData.secondaryPhone"
              type="text"
              placeholder="請輸入次要聯絡電話"
              class="mt-2 w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- 電子郵件信箱 -->
          <div>
            <label class="mb-2 block font-bold"
              ><label class="mb-2 font-bold text-red-500">*</label
              >電子郵件信箱</label
            >
            <div class="relative flex">
              <input
                v-model="formData.email"
                type="email"
                @blur="validateField('email', formData.email)"
                placeholder="請輸入電子郵件信箱"
                class="w-full rounded-l border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                :disabled="isLocked"
              />
              

              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded px-2 text-blue-800 hover:text-blue-400"
                @click="studentEmail"
              >
                取得驗證碼
              </button>
              
            </div>
            <p v-if="errors.email" class="text-sm text-red-500">
                {{ errors.email }}
              </p>
            <span
              v-if="showError && emailError"
              class="mt-1 text-sm text-red-500"
              >{{ emailError }}</span
            >
          </div>

          <div class="flex content-center gap-1">
            <input
              v-model="formData.verifyCode"
              type="text"
              placeholder="請輸入驗證碼"
              class="mt-2 w-1/2 rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              @blur="validateField('verifyCode', formData.verifyCode)"
              :disabled="verifyLocked"
            />
            <button
              class="mt-2 rounded px-4"
              :class="
                formData.verifyCode === ''
                  ? 'border border-slate-300 text-slate-300'
                  : 'border border-blue-800 text-blue-800'
              "
              :disabled="formData.verifyCode === ''"
              @click="studentVerifyEmail"
            >
              驗證
            </button>
          </div>
          <p v-if="errors.verifyCode" class="text-sm text-red-500">
                {{ errors.verifyCode }}
              </p>
        </div>
        <!-- 其他資料 -->
        <div class="text-style mb-4 mt-8">其他資料</div>
        <div class="grid grid-cols-1 gap-4">
          <!-- 最高學歷 -->
          <div class="grid grid-cols-2 gap-1">
            <input
              v-model="formData.education"
              type="text"
              placeholder="學歷"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
            <input
              v-model="formData.graduationYear"
              type="text"
              placeholder="畢業年份"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
            <input
              v-model="formData.schoolMajor"
              type="text"
              placeholder="請輸入就讀學校與科系"
              class="col-span-2 w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- 是否寄送會刊與資料 -->
          <div class="col-span-12">
            <div class="mb-2 font-bold">是否寄送會刊與資料</div>
            <div class="grid gap-2">
              <!-- 不寄送會刊 -->
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="formData.magazineSubscription"
                  class="form-checkbox h-5 w-5 text-blue-600"
                />
                <label class="ml-2 text-gray-700">不寄送會刊</label>
              </div>

              <!-- 不寄送資料 -->
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="formData.infoSubscription"
                  class="form-checkbox h-5 w-5 text-blue-600"
                />
                <label class="ml-2 text-gray-700">不寄送資料</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cardAction">
        <div class="flex justify-end space-x-2">
          <button
            class="rounded border border-zinc-800 bg-white px-6 py-2 text-zinc-800 hover:bg-slate-100"
            @click="$emit('close')"
          >
            返回
          </button>
          <!-- <button
            type="submit"
            class="rounded px-6 py-2 text-white font-normal bg-logoColor hover:bg-logoColor-dark"
            :disabled="!isFormValid"
            @click="submitMember"
          >
            確定提交
          </button> -->
          <button
            type="submit"
            class="hover:bg-logoColor-dark rounded bg-logoColor px-6 py-2 font-normal text-white"
            @click="submitMember"
          >
            確定提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import studentSrv from '@/service/studentMember.js'
import headerHelper from '@/utils/helpers/header.js'
import locationData from '@/utils/helpers/locationList.js'
import swalWithCustomStyles from '@/utils/sweetAlert'
// import LoadingComponent from '@/components/LoadingComponent.vue';


export default {
  components: {
    Datepicker
    // LoadingComponent,
  },
  emits: ['close'],
  setup() {
    const reduce = ref((option) => option)
    const tab = ref(1)
    const search = ref('')
    // const emit = defineEmits(['close'])

    const textFieldRule = [(v) => !!v || '此欄位為必填']
    const selectRule = [
      (v) => (v !== null && v !== undefined) || '此欄位為必填'
    ]
    const chineseNameRule = [
      (v) => !!v || '此欄位為必填',
      (v) => /^[\u4E00-\u9FFF]+$/.test(v) || '僅可輸入中文'
    ]
    const idNumberRule = [
      (v) => !!v || '此欄位為必填',
      (v) => /^[A-Z][1-2]\d{8}$/.test(v) || '身分證字號格式不正確'
    ]
    const phoneRule = [
      (v) => !!v || '此欄位為必填',
      (v) => /^(09\d{8}|0\d{1,2}-\d{6,8})$/.test(v) || '電話格式不正確',
      // (v) => /^0[2-9]-\d{7}$/.test(v) || '市話格式錯誤，例如：02-1234567'
    ]
    const emailRule = [
      (v) => !!v || '此欄位為必填',
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '電子郵件格式不正確'
    ]
    const verifyCodeRule = [
      (v) => !!v || '此欄位為必填',
    ]
    const errors = reactive({ chineseName: '' })

    const branchList = ref([
      { name: '台北分會', value: 1 },
      { name: '高雄分會', value: 2 }
    ])

    const cityList = ref([])
    const secondaryCityList = ref([])
    const districtList = ref([])
    const secondaryDistrictList = ref([])
    const genderList = ref([
      { name: '女', value: 0 },
      { name: '男', value: 1 }
    ])

    const formData = reactive({
      frontUserId: '',
      password: '',
      chineseName: '',
      englishName: '',
      idNumber: '',
      gender: null,
      birthDate: '',
      mainAddressCity: null,
      mainAddressDistrict: null,
      mainAddressPostal: '',
      mainAddressDetail: '',
      mainPhone: '',
      secondaryAddressCity: null,
      secondaryAddressDistrict: null,
      secondaryAddressPostal: '',
      secondaryAddressDetail: '',
      secondaryPhone: '',
      email: '',
      education: '',
      graduationYear: '',
      schoolMajor: '',
      industry: '',
      company: '',
      position: '',
      entryDate: '',
      branch: null,
      level: null,
      paymentStatus: null,
      subscriptionStatus: '正常',
      magazineSubscription: null,
      infoSubscription: null,
      verifyCode: ''
    })

    const followMainAddress = ref(false)
    const followMainPhone = ref(false)
    const pageAction = ref('add')
    const pageTitle = ref('')
    const valid = ref(false)
    const loading = ref(false)
    const isLocked = ref(false)
    const verifyLocked = ref(false)
    const showError = ref(false)

    // const isEmailValid = computed(() =>
    //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    // )
    const isEmailValid = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(formData.email)
    }
    const emailError = computed(() => {
      if (!formData.email) {
        return '請輸入電子郵件信箱'
      } else if (!isEmailValid.value) {
        return '請輸入有效的電子郵件格式'
      }
      return ''
    })

    const validateField = (field, value) => {
      const rulesMap = {
        chineseName: chineseNameRule,
        idNumber: idNumberRule,
        mainPhone: phoneRule,
        email: emailRule,
        verifyCode: verifyCodeRule, 
        // idNumber: selectRule,
        gender: selectRule,
        birthDate: textFieldRule,
        mainAddressCity: selectRule,
        mainAddressDistrict: selectRule,
        mainAddressDetail: textFieldRule
      }
      const rules = rulesMap[field] || textFieldRule
      const error = rules
        .map((rule) => rule(value))
        .find((result) => result !== true)
      errors[field] = error || null
      return !error
    }

    const validateForm = () => {
      const fieldsToValidate = [
        { field: 'chineseName', value: formData.chineseName },
        { field: 'idNumber', value: formData.idNumber },
        { field: 'mainPhone', value: formData.mainPhone },
        { field: 'email', value: formData.email },
        { field: 'verifyCode', value: formData.verifyCode },
        { field: 'gender', value: formData.gender },
        { field: 'birthDate', value: formData.birthDate },
        { field: 'mainAddressCity', value: formData.mainAddressCity },
        { field: 'mainAddressDistrict', value: formData.mainAddressDistrict },
        { field: 'mainAddressDetail', value: formData.mainAddressDetail },
        
      ]
      let isValid = true
      fieldsToValidate.forEach(({ field, value }) => {
        if (!validateField(field, value)) {
          isValid = false
        }
      })
      return isValid
    }

    // watch(followMainAddress, (val) => {
    //   if (val) {
    //     formData.secondaryAddressCity = formData.mainAddressCity
    //     formData.secondaryAddressDistrict = formData.mainAddressDistrict
    //     formData.secondaryAddressPostal = formData.mainAddressPostal
    //     formData.secondaryAddressDetail = formData.mainAddressDetail
    //   } else {
    //     formData.secondaryAddressCity = null
    //     formData.secondaryAddressDistrict = null
    //     formData.secondaryAddressPostal = ''
    //     formData.secondaryAddressDetail = ''
    //   }
    // })
    // 監聽 followMainAddress
    // watch(followMainAddress, (val) => {
    //   if (val) {
    //     formData.secondaryAddressCity = formData.mainAddressCity
    //     formData.secondaryAddressDistrict = formData.mainAddressDistrict
    //     formData.secondaryAddressPostal = formData.mainAddressPostal
    //     formData.secondaryAddressDetail = formData.mainAddressDetail
    //   } else {
    //     formData.secondaryAddressCity = null
    //     formData.secondaryAddressDistrict = null
    //     formData.secondaryAddressPostal = ''
    //     formData.secondaryAddressDetail = ''
    //   }
    // })
    watch(followMainAddress, (val) => {
  if (val) {
    formData.secondaryAddressCity = formData.mainAddressCity
    formData.secondaryAddressDistrict = '' // 強制觸發 watch
    nextTick(() => {
      formData.secondaryAddressDistrict = formData.mainAddressDistrict
      formData.secondaryAddressDetail = formData.mainAddressDetail
    })
  } else {
    formData.secondaryAddressCity = null
    formData.secondaryAddressDistrict = null
    formData.secondaryAddressPostal = ''
    formData.secondaryAddressDetail = ''
  }
})
    

    // 監聽 followMainPhone
    watch(followMainPhone, (val) => {
      formData.secondaryPhone = val ? formData.mainPhone : ''
    })

    // 監聽 mainAddressCity
    watch(
      () => formData.mainAddressCity,
      (val) => {
        const matchCity = cityList.value.find((city) => city.locationId === val)
        districtList.value = matchCity ? matchCity.children || [] : []
      }
    )

    // 監聽 mainAddressDistrict
    watch(
      () => formData.mainAddressDistrict,
      (val) => {
        const selectedDistrict = districtList.value.find(
          (district) => district.locationId === val
        )
        formData.mainAddressPostal = selectedDistrict
          ? selectedDistrict.postalCode
          : ''
      }
    )

    // 監聽 secondaryAddressCity
    watch(
      () => formData.secondaryAddressCity,
      (val) => {
        const matchCity = secondaryCityList.value.find(
          (city) => city.locationId === val
        )
        secondaryDistrictList.value = matchCity ? matchCity.children || [] : []
      }
    )

    // 監聽 secondaryAddressDistrict
    watch(
      () => formData.secondaryAddressDistrict,
      (val) => {
        const selectedDistrict = secondaryDistrictList.value.find(
          (district) => district.locationId === val
        )
        formData.secondaryAddressPostal = selectedDistrict
          ? selectedDistrict.postalCode
          : ''
      }
    )

    watch(followMainPhone, (val) => {
      if (val) {
        formData.secondaryPhone = formData.mainPhone
      } else {
        formData.secondaryPhone = ''
      }
    })

    const getLocationList = async () => {
      cityList.value = locationData
      secondaryCityList.value = locationData
    }

    onMounted(() => {
      getLocationList()
    })
    const showAlert = (message, isSuccess = true) => {
      swalWithCustomStyles.fire({
        toast: true,
        position: 'center',
        title: message,
        confirmButtonColor: '#0E2A34',
        confirmButtonText: '確認',
        background: '#F0F0F2',
        width: 400
      })
    }
    watch(isLocked, (newVal) => {
  console.log('isLocked changed to:', newVal);
});
    const studentEmail = async () => {
      if (!isEmailValid()) {
        showAlert('無效的電子郵件地址', false)
        return
      }

      try {
        const obj = { email: formData.email }
        const res = await studentSrv.studentEmail(obj)

        if (res.isSuccess) {
          if (res.data.rtnCode === '0002') {
            const result = await swalWithCustomStyles.fire({
              toast: true,
              position: 'center',
              title: `${res.data.rtnMsg}`,
              confirmButtonColor: '#0E2A34',
              confirmButtonText: '確認',
              background: '#F0F0F2',
              width: 400
            })

            if (result.isConfirmed) {
            isLocked.value = true
          }
          } else {
            showAlert(res.data.rtnMsg)
          }
        } else {
          showAlert(res.msg, false)
        }
      } catch (error) {
        console.error('Error:', error)
        showAlert('系統錯誤', false)
      }
    }
    watch(verifyLocked, (newVal) => {
  console.log('verifyLocked changed to:', newVal);
});
watch(isLocked, (newVal) => {
  console.log('isLocked changed to:', newVal);
});
    const verifyEmail = async () => {
      try {
        const obj = { email: formData.email }
        const res = await studentSrv.verifyEmail(obj)

        if (res.isSuccess) {
          if (res.data.rtnCode === '0000') {
            const result = await swalWithCustomStyles.fire({
              toast: true,
              position: 'center',
              title: `${res.data.rtnMsg}`,
              confirmButtonColor: '#0E2A34',
              confirmButtonText: '確認',
              background: '#F0F0F2',
              width: 400
            })

            if (result.isConfirmed) {
              console.log('確認按鈕已點擊');
              isLocked.value = true
            }
          } else {
            showAlert(res.data.rtnMsg)
          }
        } else {
          showAlert(res.msg, false)
        }
      } catch (error) {
        console.error('Error:', error)
        showAlert('系統錯誤', false)
      }
    }

    const studentVerifyEmail = async () => {
      try {
        const obj = { email: formData.email, verifyCode: formData.verifyCode }
        const res = await studentSrv.studentVerifyEmail(obj)

        if (res.isSuccess) {
          if (res.data.rtnCode === '0002') {
            const result = await swalWithCustomStyles.fire({
              toast: true,
              position: 'center',
              title: `${res.data.rtnMsg}`,
              confirmButtonColor: '#0E2A34',
              confirmButtonText: '確認',
              background: '#F0F0F2',
              width: 400
            })
            if (result.isConfirmed) {
              console.log('確認按鈕已點擊');
              verifyLocked.value = true
            }
          } else {
            showAlert(res.data.rtnMsg)
          }
        } else {
          showAlert(res.msg, false)
        }
      } catch (error) {
        console.error('Error:', error)
        showAlert('系統錯誤', false)
      }
    }

    const submitMember = async () => {
      if (!validateForm()) {
        showAlert('請完成表單', false)
        return;
      }
      loading.value = true

      try {
        const obj = {
          ...formData,
          gender: parseInt(formData.gender),
          birthDate: formData.birthDate,
          magazineSubscription: !formData.magazineSubscription ? 1 : 0,
          infoSubscription: !formData.infoSubscription ? 1 : 0
        }

        const res = await studentSrv.postMember(obj)

        if (res.isSuccess) {
          if (res.data.rtnCode === '0000') {
            const result = await swalWithCustomStyles.fire({
              toast: true,
              position: 'center',
              title: `${res.data.rtnMsg}`,
              confirmButtonColor: '#0E2A34',
              confirmButtonText: '確認',
              background: '#F0F0F2',
              width: 400
            })

            if (result.isConfirmed) 
            // location.reload()
            this.$emit('close');
          } else {
            showAlert(res.data.rtnMsg)
          }
        } else {
          showAlert(res.msg, false)
        }
      } catch (error) {
        console.error('Error:', error)
        showAlert(res.msg, false)
      } finally {
        loading.value = false
      }
    }

    return {
      reduce,
      tab,
      search,
      textFieldRule,
      selectRule,
      idNumberRule,
      phoneRule,
      emailRule,
      errors,
      branchList,
      cityList,
      secondaryCityList,
      districtList,
      secondaryDistrictList,
      genderList,
      formData,
      followMainAddress,
      followMainPhone,
      pageAction,
      pageTitle,
      valid,
      loading,
      isLocked,
      verifyLocked,
      showError,
      isEmailValid,
      emailError,
      validateField,
      validateForm,
      studentEmail,
      verifyEmail,
      studentVerifyEmail,
      submitMember
    }
  }
}
</script>

<style scoped>
.text-red {
  color: crimson;
  font-weight: 900;
  margin-right: 4px;
}
.bold {
  font-size: 16px;
  font-weight: 700;
}

:deep(.v-selection-control--density-default) {
  --v-selection-control-size: 30px !important;
}
:deep(.v-selection-control__input) {
  align-items: center;
  display: flex;
  flex: none;
  justify-content: flex-start;
  position: relative;
  border-radius: 50%;
  padding: 0px !important;
}
.custom-checkbox {
  height: 24px;
  line-height: 24px;
}
.end {
  justify-content: flex-end;
}

.text-style {
  font-size: 20px;
  font-weight: 600;
  color: #1b2482;
  padding: 4px;
  border-left: 8px solid #1b2482;
}

.overlay {
  background-color: rgba(34, 34, 34, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;

  .card {
    position: relative;
    background-color: white;
    width: 50%;
    height: 80vh;
    margin: 5% auto 10% auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .cardHeader {
      position: absolute;
      top: 0px;
      width: 100%;
      padding: 10px 30px;
      background-color: white;
    }
    .cardBody {
      height: 100%;
      overflow-y: scroll;
      padding: 60px 20px 150px 20px;
    }
    .cardAction {
      position: absolute;
      bottom: 0px;
      padding: 20px;
      background-color: white;
      width: 100%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
@media screen and (max-width: 768px) {
  .overlay .card {
    width: 100%; /* 調整為較窄的寬度 */
    height: 100vh; /* 調整高度 */
    margin: 0px;
    z-index: 100;
  }

  .overlay .card .cardBody {
    padding: 40px 15px 100px 15px; /* 調整內邊距 */
  }

  .overlay .card .cardAction {
    padding: 15px; /* 調整按鈕區域內邊距 */
  }
}

.d-flex {
  display: flex;
}
/* button:disabled {
  background-color: rgb(226 232 240);
  cursor: not-allowed;
} */
</style>
