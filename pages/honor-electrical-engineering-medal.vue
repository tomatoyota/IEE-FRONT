<script setup>
// 自訂變數
const menuItems = reactive([
  { key: '111', label: '111年度' },
  { key: '110', label: '110年度' },
  { key: '109', label: '109年度' },
  { key: '108', label: '108年度' },
  { key: 'last', label: '更早以前的資料' }
])

const showImagebylastTime = ref(100)

const dataList = reactive([
  {
    time: '111',
    name: '周景揚',
    type: 'research',
    roles: ['國立中央大學校長'],
    path: 'honor_eem/111_01.jpg'
  },
  {
    time: '111',
    name: '王耀庭',
    type: 'engineer',
    roles: ['台灣電力(股)公司總經理'],
    path: 'honor_eem/111_02.jpg'
  },
  {
    time: '110',
    name: '李清庭',
    type: 'research',
    roles: ['元智大學副校長', '國立成功大學講座教授'],
    path: 'honor_eem/110_01.jpg'
  },
  {
    time: '110',
    name: '林榮賜',
    type: 'engineer',
    roles: ['中華電信(股)公司執行副總經理'],
    path: 'honor_eem/110_02.jpg'
  },
  {
    time: '109',
    name: '綦振瀛',
    type: 'research',
    roles: ['國立中央大學講座教授兼台聯大系統副校長'],
    path: 'honor_eem/109_01.jpg'
  },
  {
    time: '109',
    name: '鍾炳利',
    type: 'engineer',
    roles: ['台灣電力(股)公司總經理'],
    path: 'honor_eem/109_02.jpg'
  },
  {
    time: '108',
    name: '郭斯彥',
    type: 'research',
    roles: ['國立台灣大學電機工程學系終身特聘教授'],
    path: 'honor_eem/108_01.jpg'
  },
  {
    time: '108',
    name: '闕志克',
    type: 'engineer',
    roles: ['財團法人工業技術研究院資訊與通訊研究所所長'],
    path: 'honor_eem/108_02.jpg'
  },
  {
    time: '107',
    name: '涂元光',
    type: '',
    roles: ['中華電信台灣北區電信分公司總經理'],
    path: 'honor_eem/107_01.jpg'
  },
  {
    time: '106',
    name: '郭耀煌',
    type: '',
    roles: ['國立成功大學資訊工程系特聘教授'],
    path: 'honor_eem/106_01.jpg'
  },
  {
    time: '105',
    name: '朱文成',
    type: '',
    roles: ['台灣電力(股)公司董事長'],
    path: 'honor_eem/105_01.jpg'
  },
  {
    time: '104',
    name: '吳誠文',
    type: '',
    roles: ['國立清華大學副校長'],
    path: 'honor_eem/104_01.jpg'
  },
  {
    time: '103',
    name: '林一平',
    type: '',
    roles: ['科技部政務次長', '國立交通大學終身講座教授'],
    path: 'honor_eem/103_01.jpg'
  },
  {
    time: '102',
    name: '石木標',
    type: '',
    roles: ['中華電信(股)公司總經理'],
    path: 'honor_eem/102_01.jpg'
  },
  {
    time: '101',
    name: '陳良基',
    type: '',
    roles: ['國立台灣大學講座教授'],
    path: 'honor_eem/101_01.jpg'
  },
  {
    time: '100',
    name: '徐爵民',
    type: '',
    roles: ['財團法人工業技術研究院院長'],
    path: 'honor_eem/100_01.jpg'
  },
  {
    time: '99',
    name: '呂學錦',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '98',
    name: '林寶樹',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '97',
    name: '吳重雨',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '96',
    name: '李炎松',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '95',
    name: '吳靜雄',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '94',
    name: '許文宏',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '93',
    name: '謝俊明',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '92',
    name: '祁　甡',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '91',
    name: '李嗣涔',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '90',
    name: '陳德勝',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '89',
    name: '林耕華',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '88',
    name: '彭松村',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '87',
    name: '蘇炎坤',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '86',
    name: '魏哲和',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '85',
    name: '陳錦波',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '84',
    name: '鄭瑞雨',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '83',
    name: '何存仁',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '82',
    name: '王華燕',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '81',
    name: '王金土',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '80',
    name: '李琳山',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '79',
    name: '張俊彥',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '78',
    name: '黃廣志',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '77',
    name: '黃胤年',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '76',
    name: '黃　煇',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '75',
    name: '賈玉輝',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '74',
    name: '鄭觀慶',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '73',
    name: '楊丁元',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '71',
    name: '楊永言',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '70',
    name: '(從缺)',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '69',
    name: '江德曜',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '68',
    name: '朱以澖',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '67',
    name: '胡定華',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '66',
    name: '楊自雄',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '65',
    name: '楊鍵樵',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '64',
    name: '(從缺)',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '63',
    name: '周天翔/楊金欉',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '62',
    name: '繆超鳳',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '61',
    name: '顧毓琇',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '60',
    name: '王善為',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '59',
    name: '李熙謀',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '58',
    name: '蔡瑞唐',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '57',
    name: '方賢齊',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '56',
    name: '陳　勤',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '55',
    name: '葉聖鐸',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '54',
    name: '錢其琛',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '53',
    name: '吳道一',
    type: '',
    roles: [''],
    path: ''
  },
  {
    time: '52',
    name: '陳蘭皋',
    type: '',
    roles: [''],
    path: ''
  }
])
const selectedData = computed(() => {
  if (activekey.value != 'last') {
    return dataList.filter((d) => d.time == activekey.value)
  } else {
    return dataList.filter((d) => d.time <= 107)
  }
})

const tableData = computed(() => {
  return dataList.filter((d) => d.time < showImagebylastTime.value)
})

const fileDatas = reactive([
  {
    fileName: '電機工程獎章榮譽榜.docx',
    path: '/files/榮譽榜/電機工程獎章榮譽榜.docx'
  }
])

// 自訂函式
const activekey = ref('111')
const handleActiveKeyUpdate = (key) => {
  activekey.value = key
}
// lifeCycle
</script>
<template>
  <PageHeader />
  <section
    class="section-wrapper [&>*:not(:last-child)]:mb-[60px] md:[&>*:not(:last-child)]:mb-20 xl:[&>*:not(:last-child)]:mb-[120px]"
  >
    <div class="leading-7">
      <p>
        本會設學術研究、工程事業等兩類工程獎章，於當年度會員大會各頒授一座，此項獎章為代表電機工程界之最高榮譽。
      </p>
      <ul class="list-disc">
        <li>
          學術研究類：專職我國公私立大專院校電機工程相關科系之專任教授，在電機學術上有顯著之成就重大之發明或有價值之著作者。
        </li>
        <li>
          工程事業類：電機工程上有顯著之成就重大之發明或有價值之著作者或主辦電機工程建設對國家社會有重大貢獻者。
        </li>
      </ul>
    </div>
    <div>
      <Dropdown
        :menuItems="menuItems"
        :activeKey="activekey"
        @update:activeKey="handleActiveKeyUpdate"
        class="mb-10"
      />
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <template v-for="data in selectedData">
          <div v-if="data.time >= showImagebylastTime">
            <h4
              v-if="data?.type != ''"
              class="title-underline mb-10 font-semibold"
            >
              {{ data.type === 'research' ? '學術研究類' : '工程事業類' }}
            </h4>
            <h4
              v-if="data?.type == ''"
              class="title-underline mb-10 font-semibold"
            >
              {{ data.time }}年度
            </h4>
            <HonorCard :dataInfo="data" />
          </div>
        </template>
      </div>
      <div v-if="activekey === 'last'" class="mt-20">
        <h4 class="title-underline mb-10 font-semibold">
          {{ showImagebylastTime - 1 }}年度-{{
            dataList[dataList.length - 1].time
          }}年度
        </h4>
        <div style="overflow-x: auto">
          <table>
            <colgroup>
              <col
                span="1"
                style="
                  background-color: rgba(34, 34, 34, 0.05);
                  min-width: 100px;
                "
              />
              <col
                span="1"
                style="
                  background-color: rgba(34, 34, 34, 0.05);
                  min-width: 190px;
                "
              />
              <col span="1" style="background-color: #fff; min-width: 100px" />
              <col span="1" style="background-color: #fff; min-width: 190px" />
              <col
                span="1"
                style="
                  background-color: rgba(34, 34, 34, 0.05);
                  min-width: 100px;
                "
              />
              <col
                span="1"
                style="
                  background-color: rgba(34, 34, 34, 0.05);
                  min-width: 190px;
                "
              />
            </colgroup>
            <thead>
              <tr>
                <th
                  class="px-6 py-3 md:px-8 md:py-4"
                  style="text-align: center"
                >
                  年度
                </th>
                <th class="px-6 py-3 md:px-8 md:py-4">姓名</th>
                <th
                  class="px-6 py-3 md:px-8 md:py-4"
                  style="text-align: center"
                >
                  年度
                </th>
                <th class="px-6 py-3 md:px-8 md:py-4">姓名</th>
                <th
                  class="px-6 py-3 md:px-8 md:py-4"
                  style="text-align: center"
                >
                  年度
                </th>
                <th class="px-6 py-3 md:px-8 md:py-4">姓名</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, rowIndex) in Math.ceil(tableData.length / 3)"
                :key="rowIndex"
              >
                <template v-if="tableData[data * 3 - 3]">
                  <td
                    class="px-6 py-3 md:px-8 md:py-4"
                    style="text-align: center"
                  >
                    {{ tableData[data * 3 - 3].time }}
                  </td>
                  <td class="px-6 py-3 md:px-8 md:py-4">
                    {{ tableData[data * 3 - 3].name }}
                  </td>
                </template>
                <template v-else>
                  <td
                    class="px-6 py-3 md:px-8 md:py-4"
                    style="text-align: center"
                  ></td>
                  <td class="px-6 py-3 md:px-8 md:py-4"></td>
                </template>

                <!-- Second Row -->
                <template v-if="tableData[data * 3 - 2]">
                  <td
                    class="px-6 py-3 md:px-8 md:py-4"
                    style="text-align: center"
                  >
                    {{ tableData[data * 3 - 2].time }}
                  </td>
                  <td class="px-6 py-3 md:px-8 md:py-4">
                    {{ tableData[data * 3 - 2].name }}
                  </td>
                </template>
                <template v-else>
                  <td
                    class="px-6 py-3 md:px-8 md:py-4"
                    style="text-align: center"
                  ></td>
                  <td class="px-6 py-3 md:px-8 md:py-4"></td>
                </template>

                <!-- Third Row -->
                <template v-if="tableData[data * 3 - 1]">
                  <td
                    class="px-6 py-3 md:px-8 md:py-4"
                    style="text-align: center"
                  >
                    {{ tableData[data * 3 - 1].time }}
                  </td>
                  <td class="px-6 py-3 md:px-8 md:py-4">
                    {{ tableData[data * 3 - 1].name }}
                  </td>
                </template>
                <template v-else>
                  <td
                    class="px-6 py-3 md:px-8 md:py-4"
                    style="text-align: center"
                  ></td>
                  <td class="px-6 py-3 md:px-8 md:py-4"></td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <FileDownload
        class="mt-[60px] md:mt-20 xl:mt-[120px]"
        :files="fileDatas"
      />
    </div>
  </section>
</template>
<style lang="scss" scoped>
table {
  width: 100%;
  col {
    width: auto;
  }
  th {
    text-align: left;
    font-weight: 600;
    line-height: 24px;
    color: #fff;
    background-color: #6e6e6e;
  }
  td {
    text-align: left;
    border-bottom: 1px solid #222;
  }
}
</style>
