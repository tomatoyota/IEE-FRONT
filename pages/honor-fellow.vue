<script setup>
// 自訂變數
const menuItems = reactive([
  { key: '112', label: '112年度' },
  { key: '111', label: '111年度' },
  { key: '110', label: '110年度' },
  { key: '109', label: '109年度' },
  { key: '108', label: '108年度' }
  // { key: 'last', label: '更早以前的資料' }
])
const fileDatas = reactive([
  { fileName: '會士榮譽榜.docx', path: '/files/榮譽榜/會士榮譽榜.docx' }
])

const dataList = reactive([
{
    time: '112',
    list: [
      {
        name: '洪瑞華',
        roles: ['國立陽明交通大學電子研究所講座教授'],
        path: 'honor_fellow/112_01.png'
      },
      {
        name: '陳銘憲',
        roles: ['國立臺灣大學電機工程學系講座教授'],
        path: 'honor_fellow/112_02.png'
      },
      {
        name: '劉柏村',
        roles: ['國立陽明交通大學光電工程學系講座教授兼校區研發長'],
        path: 'honor_fellow/112_03.png'
      },
      {
        name: '謝孫源',
        roles: ['國立成功大學資訊工程學系講座教授', '財團法人成大研發 基金會執行長'],
        path: 'honor_fellow/112_04.png'
      },
      {
        name: '簡志誠',
        roles: ['中華電信股份有限公司執行副總經理'],
        path: 'honor_fellow/112_05.png'
      }
    ]
  },
  {
    time: '111',
    list: [
      {
        name: '王文俊',
        roles: ['國立中央大學電機工程學系講座教授兼教務長'],
        path: 'honor_fellow/111_01.jpg'
      },
      {
        name: '李琳山',
        roles: ['中央研究院院士', '國立台灣大學電機工程學系講座教授'],
        path: 'honor_fellow/111_02.jpg'
      },
      {
        name: '林法正',
        roles: ['國家實驗研究院院長', '國立中央大學電機工程學系講座教授'],
        path: 'honor_fellow/111_03.jpg'
      },
      {
        name: '柯明道',
        roles: ['國立陽明交通大學電子研究所講座教授兼前瞻', '半導體研究所所長'],
        path: 'honor_fellow/111_04.jpg'
      },
      {
        name: '郭大維',
        roles: ['國立台灣大學資訊工程學系特聘教授'],
        path: 'honor_fellow/111_05.jpg'
      }
    ]
  },
  {
    time: '110',
    list: [
      {
        name: '吳瑞北',
        roles: ['國立台灣大學電機工程學系特聘教授'],
        path: 'honor_fellow/110_01.jpg'
      },
      {
        name: '李祖添',
        roles: ['教育部國家終身講座', '國立陽明交通大學終身講座教授'],
        path: 'honor_fellow/110_02.jpg'
      },
      {
        name: '貝蘇章',
        roles: ['國立台灣大學電機資訊學院名譽教授'],
        path: 'honor_fellow/110_03.jpg'
      },
      {
        name: '周景揚',
        roles: ['國立中央大學校長'],
        path: 'honor_fellow/110_04.jpg'
      },
      {
        name: '林一平',
        roles: ['國立陽明交通大學資訊工程學系終身講座教授'],
        path: 'honor_fellow/110_05.jpg'
      },
      {
        name: '林昭陽',
        roles: ['中華電信數據通信分公司總經理', '中華電信研究院院長'],
        path: 'honor_fellow/110_06.jpg'
      },
      {
        name: '涂元光',
        roles: [
          '中華立鼎光電股份有限公司董事長',
          '前中華電信北區電信分公司總經理'
        ],
        path: 'honor_fellow/110_07.jpg'
      },
      {
        name: '許健平',
        roles: ['國立清華大學資訊工程學系講座教授'],
        path: 'honor_fellow/110_08.jpg'
      },
      {
        name: '盧志遠',
        roles: ['欣銓科技(股)公司董事長', '旺宏電子(股)公司總經理'],
        path: 'honor_fellow/110_09.jpg'
      },
      {
        name: '蕭勝任',
        roles: ['台灣電力(股)公司副總經理'],
        path: 'honor_fellow/110_10.jpg'
      }
    ]
  },
  {
    time: '109',
    list: [
      {
        name: '史欽泰',
        roles: ['國立清華大學張忠謀講座教授兼科管院院務顧問'],
        path: 'honor_fellow/109_01.jpg'
      },
      {
        name: '吳靜雄',
        roles: ['國立台灣大學電機工程學系名譽教授'],
        path: 'honor_fellow/109_02.jpg'
      },
      {
        name: '吳麗秀',
        roles: ['中華電信企業客戶分公司總經理'],
        path: 'honor_fellow/109_03.jpg'
      },
      {
        name: '陳良基',
        roles: ['國立台灣大學電機工程學系特聘教授'],
        path: 'honor_fellow/109_04.jpg'
      },
      {
        name: '陳謨星',
        roles: ['美國德州大學阿靈頓校區電機系榮譽教授'],
        path: 'honor_fellow/109_05.jpg'
      },
      {
        name: '黃廣志',
        roles: ['國立高雄科技大學名譽教授'],
        path: 'honor_fellow/109_06.jpg'
      },
      {
        name: '劉兆漢',
        roles: ['國立中央大學名譽校長'],
        path: 'honor_fellow/109_07.jpg'
      },
      {
        name: '魏哲和',
        roles: ['大同大學講座教授'],
        path: 'honor_fellow/109_08.jpg'
      },
      {
        name: '蘇炎坤',
        roles: ['崑山科技大學電機工程學系講座教授'],
        path: 'honor_fellow/109_09.jpg'
      }
    ]
  },
  {
    time: '108',
    list: [
      {
        name: '吳重雨',
        roles: ['國立交通大學電子工程學系終身講座教授'],
        path: 'honor_fellow/108_01.jpg'
      },
      {
        name: '呂學錦',
        roles: ['國立交通大學榮譽教授'],
        path: 'honor_fellow/108_02.jpg'
      },
      {
        name: '李炎松',
        roles: ['前智邦科技股份有限公司董事長'],
        path: 'honor_fellow/108_03.jpg'
      },
      {
        name: '李家同',
        roles: ['國立清華大學孫運璿榮譽講座教授'],
        path: 'honor_fellow/108_04.jpg'
      },
      {
        name: '李嗣涔',
        roles: ['國立台灣大學電機工程學系名譽教授'],
        path: 'honor_fellow/108_05.jpg'
      },
      {
        name: '林本堅',
        roles: ['國立清華大學侯金堆特聘研究講座教授'],
        path: 'honor_fellow/108_06.jpg'
      },
      {
        name: '林寶樹',
        roles: ['國立交通大學終身講座教授'],
        path: 'honor_fellow/108_07.jpg'
      },
      {
        name: '徐爵民',
        roles: ['國立清華大學榮譽教授'],
        path: 'honor_fellow/108_08.jpg'
      },
      {
        name: '陳文村',
        roles: ['國立清華大學孫運璿講座教授'],
        path: 'honor_fellow/108_09.jpg'
      },
      {
        name: '陳金蓮',
        roles: ['前聖約翰科技大學校長'],
        path: 'honor_fellow/108_10.jpg'
      },
      {
        name: '劉炯朗',
        roles: ['國立清華大學蒙民偉榮譽講座教授'],
        path: 'honor_fellow/108_11.jpg'
      },
      {
        name: '謝繼茂',
        roles: ['中華電信(股)公司董事長'],
        path: 'honor_fellow/108_12.jpg'
      },
      {
        name: '鍾炳利',
        roles: ['台灣電力(股)公司總經理'],
        path: 'honor_fellow/108_13.jpg'
      }
    ]
  }
])
const selectedData = computed(() => {
  return dataList.filter((d) => d.time === activekey.value)[0]
})
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
    <p class="leading-7">
      本會為表彰本會會員在電力、電信、電子、資訊等電機相關領域之傑出貢獻，於106年第54屆第3次理監事聯席會議決議設置「中國電機工程學會會士遴選委員會」，負責辦理會士之遴選作業。<br /><br />
      本會會員為國內外傑出之學者、研究人員、工程師及管理階層，對電力、電信、電子、資訊等電機相關領域之發展不遺餘力，且對國家社會、工程技術或本會會務有重大貢獻者，經本會遴選產生之終身榮銜；曾擔任本會理事長或獲選為本會獎章得獎人並經遴選辦法第三條所列之方式被推薦者，為本會當然會士。<br /><br />
      每年當選之會士於當年度會員大會中公開表揚，並頒發會士當選證書。
    </p>
    <div>
      <Dropdown
        :menuItems="menuItems"
        :activeKey="activekey"
        @update:activeKey="handleActiveKeyUpdate"
        class="mb-10"
      />
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <template v-for="data in selectedData.list">
          <HonorCard :dataInfo="data" />
        </template>
      </div>
    </div>
    <FileDownload class="mt-[60px] md:mt-20 xl:mt-[120px]" :files="fileDatas" />
  </section>
</template>
<style lang="scss" scoped></style>
