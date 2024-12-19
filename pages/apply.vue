<script setup>
import StudentApplyComponent from '/components/StudentApply.vue';

// 自訂變數
const fileDatas = reactive([
  {
    fileName: '個人會員入會申請書.docx',
    path: '/files/入會申請/個人會員入會申請書.docx'
  },
  {
    fileName: '團體會員入會申請書.docx',
    path: '/files/入會申請/團體會員入會申請書.docx'
  },
  {
    fileName: '升格會員申請書-永久.docx',
    path: '/files/入會申請/升格會員申請書-永久.docx'
  }
])
const data = reactive([
  {
    title: '入會資格'
  },
  { title: '入會申請流程' },
  { title: '會費說明' },
  { title: '會員權利、義務' }
])
const personTable = reactive({
  columns: [
    { name: '級別', minWidth: 190 },
    { name: '入會費', minWidth: 190 },
    { name: '常年會費', minWidth: 190 },
    { name: '合計(入會時繳納)', minWidth: 190 }
  ],
  dataSource: [
    ['永久會員', '-', '-', '一次繳納5,000元'],
    ['正會員', '200元', '500元', '700元'],
    ['初級會員', '200元', '200元', '400元']
  ]
})
const groupTable = reactive({
  columns: [
    { name: '級別', minWidth: 190 },
    { name: '入會費', minWidth: 190 },
    { name: '常年會費', minWidth: 190 }
  ],
  dataSource: [
    ['電級', '免', '30,000元'],
    ['機級', '免', '15,000元'],
    ['工級', '免', '10,000元'],
    ['程級', '免', '5,000元']
  ]
})
// 自訂函式

const applyDialog = ref(false)
const showApplyDialog = () => {
  applyDialog.value = true;
  document.body.style.overflow = 'hidden'; // 鎖定滾動
  document.documentElement.style.overflow = 'hidden';
};

const hideApplyDialog = () => {
  applyDialog.value = false;
  document.body.style.overflow = ''; // 恢復滾動
  document.documentElement.style.overflow = '';
};

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <section class="mb-[60px] md:mb-[80px] xl:mb-[120px]">
      <FileDownload class="mb-10" :files="fileDatas" title="入會申請書下載" />
      <!-- <ButtonLink @click="showApplyDialog()" color="secondary">學生會員線上申請</ButtonLink> -->
       <div class="dialogButton" @click="showApplyDialog()">學生會員線上申請</div>
    </section>
    <section v-for="item in data" class="leading-7 [&:not(:last-child)]:mb-20">
      <h4 class="title-underline mb-10 font-semibold">{{ item.title }}</h4>
      <div v-if="item.title === '入會資格'">
        <ul class="list-disc">
          <li class="mb-7">
            個人會員
            <ol class="list-decimal">
              <li>
                初級會員，係指在國內外大專院校或高級職業學校電機相關系科就讀之學生提出申請，經理事會審核通過者。初級會員畢業後，符合正會員資格者，即自動升級為正會員。
              </li>
              <li>
                正會員，係指在國內外大專院校電機相關系科畢業，曾從事電機相關工程事業或研究工作二年以上，或高級職業學校電機相關科畢業，曾從事電機相關工程事業或研究工作五年以上，由永久會員或正會員一人介紹，經理事會審核通過者。
              </li>
              <li>
                永久會員，係指正會員連續繳納十五年常年會費者即自動升級為永久會員，或符合正會員入會資格經理事會審核通過一次繳納永久會費者。
              </li>
              <li>
                凡非本系科畢業而在電機相關領域服務者，得比照前一、二、三款入會資格規定，惟經歷另加兩年辦理申請入會。
              </li>
            </ol>
          </li>
          <li>
            團體會員
            <p class="">
              係指與電機相關工程有關之機關（構）、學校或其他學術團體，提出入會申請，提報理事會審核通過者。團體會員區分為電、機、工、程四級。電級會員得推派代表4人，機級會員得推派代表3人，工級會員得推派代表2人，程級會員得推派代表1人，行使會員權利。
            </p>
          </li>
        </ul>
      </div>
      <div v-else-if="item.title === '入會申請流程'">
        <ol class="list-decimal">
          <li>
            下載入會申請書
            <!--  -->
            <span class="font-semibold text-logoColor">(</span>
            <span
              class="font-semibold text-logoColor underline underline-offset-4"
              @click="showApplyDialog()"
              >學生會員採線上申請</span
            >
            <span class="font-semibold text-logoColor">)</span>
            。
          </li>
          <li>填寫入會資料。</li>
          <li>
            入會申請書紙本寄送「10656台北市大安區復興南路一段390號7樓之2」或將電子檔email至：ciee@ms35.hint.net，送件時需繳交入會費及常年會費(或永久會費)。
          </li>
          <li>
            本會收到申請書後，先由秘書處檢查所填各項資料是否完備，再送至會員委員會審查，並於理事會中追認。如審查為不合格者亦由本學會通知，同時退還預繳之會費及申請書。
          </li>
        </ol>
      </div>
      <div v-else-if="item.title === '會費說明'">
        會費請擇一方式繳納：
        <ol class="mb-6 list-decimal list-none">
          <li>現金</li>
          <li>
            郵政劃撥，收款戶名：中國電機工程學會謝繼茂，收款帳號：00133442
          </li>
        </ol>
        <ul class="list-disc list-none">
          <li>
            個人會員
            <Table
              class="mb-6 mt-3"
              :tableStyle="{ 'table-layout': 'fixed', width: '100%' }"
              :columns="personTable.columns"
              :dataSource="personTable.dataSource"
            />
          </li>
          <li>
            團體會員
            <Table
              class="mt-3"
              :tableStyle="{ 'table-layout': 'fixed', width: '100%' }"
              :columns="groupTable.columns"
              :dataSource="groupTable.dataSource"
            />
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="list-disc list-none">
          <li class="mb-7">
            權利
            <ol class="list-decimal list-none">
              <li>永久會員、正會員均有發言權、表決權、選舉權、被選舉權。</li>
              <li>初級會員有發言權，無表決權、選舉權、被選舉權。</li>
              <li>
                團體會員得派一定人數之代表，參加本會會員大會及各種活動，享有發言權、表決權、選舉權、被選舉權。團體會員代表人數：電級四人、機級三人、工級二人、程級一人。
              </li>
              <li>
                本會免費提供每年4期《電工通訊季刊》，本刊物內容包含本會相關會務訊息及電機、電子、資訊、通訊等相關新技術及產業狀況。
              </li>
              <li>
                會員可參加本會每年舉辦之獎項徵選活動，獲獎者於每年會員大會公開頒獎表揚。
              </li>
              <li>
                會員得享有參與本會所舉辦之各種活動，及請求本會業務範圍內可能之協助。
              </li>
            </ol>
          </li>
          <li>
            義務
            <ol class="list-decimal list-none">
              <li>
                遵守本會章程、信條，及會員（會員代表）大會、理事會議之議決案。
              </li>
              <li>擔任本會所推定之職務或指派之任務。</li>
              <li>繳納入會費及常年會費。</li>
            </ol>
          </li>
        </ul>
      </div>
    </section>
  </section>

  <StudentApplyComponent v-if="applyDialog === true" @close="hideApplyDialog"></StudentApplyComponent>

</template>
<style lang="scss" scoped>
.dialogButton{
  border: 1px solid #6e6e6e;
  padding: 12px 24px;
  border-radius: 4px;
  color: #222222;
  display: inline-block;
  cursor: pointer;
}

.lockScroll{
  overflow: hidden;
}

</style>
