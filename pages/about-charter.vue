<script setup>
// 自訂變數
const globalStore = useGlobalStore()
const activeId = ref('')
const headerOffsetH = computed(() => globalStore.headerOffsetH)
const sectionRefs = ref([])
const navbars = reactive([
  {
    name: '第一章 總則',
    id: 'general',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'str',
        title: '第一條',
        txt: '本會定名為中國電機工程學會（以下簡稱本會）。'
      },
      {
        type: 'str',
        title: '第二條',
        txt: '本會以聯絡電機工程人員，研究電機工程學術，協力發展中國電機工程事業為宗旨。'
      },
      {
        type: 'str',
        title: '第三條',
        txt: '本會設總會於中華民國中央政府所在地，並得在各省縣市設立分會，其章程另定之。'
      }
    ]
  },
  {
    name: '第二章 會務',
    id: 'conference',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'orderlist',
        title: '第四條',
        txt: '本會會務如下：',
        list: [
          '舉行電機相關工程學術演講。',
          '接受公私機關之委託研究並解決電機相關工程問題。',
          '徵集工程圖書，調查國內外電機相關工程事業之最新發展，以供學術界及實業界參考。',
          '草擬及審議電機相關工程名詞標準，及各項物料標準規範。',
          '刊發會誌會報學刊，及有關電機相關工程書籍。',
          '協助會員發展電機相關事業。',
          '辦理其他電機相關工程學術事項。'
        ]
      }
    ]
  },
  {
    name: '第三章 會員',
    id: 'member',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'str',
        title: '第五條',
        txt: '本會會員分為個人會員、團體會員、贊助會員、名譽會員、會士五種。申請入會者應填具入會申請書。'
      },
      {
        type: 'orderlist',
        title: '第六條',
        txt: '個人會員包括初級會員、正會員、永久會員三種。',
        list: [
          '初級會員，係指在國內外大專院校或高級職業學校電機相關系科就讀之學生提出申請，經理事會審核通過者。初級會員畢業後，符合正會員資格者，即自動升級為正會員。',
          '正式會員，係指在國內外大專院校電機相關系科畢業，曾從事電機相關工程事業或研究工作二年以上，或高級職業學校電機相關科畢業，曾從事電機相關工程事業或研究工作五年以上，由團體會員或永久會員、正會員一人介紹，經理事會審核通過者。',
          '永久會員，係指正會員連續繳納十五年常年會費者即自動升級為永久會員，或符合正會員入會資格經理事會審核通過一次繳納永久會費者。',
          '凡非本系科畢業而在電機相關領域服務者，得比照前一、二、三款入會資格規定，惟經歷另加兩年辦理申請入會。',
          '凡對電機事業有貢獻者，經正會員（含永久會員）一人以上之推薦，得申請為永久會員或正會員。',
          '凡非本國國籍而欲申請入會者，得比照前一、二、三款入會資格規定，惟離境後將以電子郵件寄送本會電子版季刊。'
        ]
      },
      {
        type: 'str',
        title: '第七條',
        txt: '團體會員，係指與電機相關工程有關之機關（構）、學校或其他學術團體，提出入會申請，提報理事會審核通過者。團體會員區分為電、機、工、程四級。'
      },
      {
        type: 'str',
        title: '第八條',
        txt: '贊助會員，係指熱心贊助本會會務活動，由本會理監事或名譽會員推薦，並詳列其贊助事蹟，提報理事會審核通過者。'
      },
      {
        type: 'str',
        title: '第九條',
        txt: '名譽會員，係指對電機相關工程事業或學術有特殊貢獻，由名譽會員三人或正會員（含永久會員）十人以上之推薦，提報理事會審核通過者。'
      },
      {
        type: 'str',
        title: '第十條',
        txt: '會士，係指本會會員為國內外傑出之學者、研究人員、工程師及管理階層者，對電力、電信、電子、資訊等電機相關領域之發展不遺餘力，且對國家社會、工程技術或本會會務有重大貢獻者，經本會遴選產生之終身榮銜；其遴選辦法另訂之。會士之權利義務與永久會員相同，並經理事會審核通過者。'
      },
      {
        type: 'orderlist',
        title: '第十一條',
        txt: '本會會員權利如下：',
        list: [
          '永久會員及正會員均有發言權、表決權、選舉權、被選舉權與罷免權。',
          '初級會員有發言權，無表決權、選舉權、被選舉權與罷免權。',
          '團體會員得派一定人數之代表，參加本會會員大會及各種活動，享有發言權、表決權、選舉權、被選舉權與罷免權。團體會員代表人數：電級四人、機級三人、工級二人、程級一人。',
          '贊助會員得派代表一人，參加本會會員大會及各種活動，具有發言權，但無表決權、選舉權、被選舉權與罷免權。',
          '名譽會員有發言權、表決權、選舉權、被選舉權與罷免權。',
          '本會會員得享有參與本會所舉辦之各種活動，及請求本會業務範圍內可能之協助。',
          '外籍會員可參加本會會員大會及各種活動，具有發言權，但無表決權、選舉權及被選舉權。'
        ]
      },
      {
        type: 'orderlist',
        title: '第十二條',
        txt: '本會會員義務如下：',
        list: [
          '遵守本會章程、信條，及會員（會員代表）大會、理事會議之議決案。',
          '擔任本會所推定之職務或指派之任務。',
          '繳納入會費及常年會費。'
        ]
      },
      {
        type: 'str',
        title: '第十三條',
        txt: '凡本會會員，有違反本會章程之行為者，或其言行有損及本會名譽者，經會員十人以上連署檢舉，經監事會查明屬實者，得由理事會予以警告或停權，其情節重大者，得提會員（會員代表）大會予以除名。'
      },
      {
        type: 'str',
        title: '第十四條',
        txt: '凡本會會員有自願退會者，應具函申述理由，並經理事會認可，方得退會。'
      }
    ]
  },
  {
    name: '第四章 組織',
    id: 'organize',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'str',
        title: '第十五條',
        txt: '本會以會員大會為最高權力機構；會員大會閉會期間由理事會代行其職權。會員人數超過三百人以上時，得依分區會員比例選出會員代表九十一人，再召開會員代表大會，行使會員大會之職權。會員代表任期二年，連選得連任。會員代表大會代表選舉辦法另訂之。'
      },
      {
        type: 'str',
        title: '第十六條',
        txt: '本會置理事二十一人，監事五人，候補理事五人，候補監事一人，由會員（會員代表）票選之，分別成立理事會及監事會。理事會置常務理事五人，由理事互選之，並由理事就常務理事中選舉一人為理事長。另置名譽理事長一人，由上屆卸任理事長擔任之。監事會置常務監事一人，由監事互選之。'
      },
      {
        type: 'orderlist',
        title: '第十七條',
        txt: `本會會員代表大會代表及理監事每屆選舉由理事會授權司選委員會辦理有關選務工作。司選委員會通過提名之候選人，提交理事會議決。本會司選委員會由應屆理事長就最近幾屆理事長、常務理事、常務監事以及以電機相關科系為專長之大學校長、或部會次長以上之首長中，聘請八人成立，並以應屆理事長為召集人，於下屆會員（會員代表）大會開會前四個月內，以電信、電力、電子、資訊等專長領域依適當比例提出候選人名單。所提候選人至少需具備正會員一年以上之資歷。\n理事、監事候選人名單，由下列方式構成：`,
        list: [
          '司選委員會所提候選人，為應選名額同額以上。',
          '永久會員或正會員所提候選人。永久會員或正會員十人以上連署，得提名一位候選人，於會員（會員代表）大會前四個月寄交司選委員會始有效，但連署人不得重複。',
          '團體會員推薦之候選人。',
          '預留部分候選人欄位，供會員（會員代表）投票時填選。',
          '選舉方式，以集會或通訊為之，於會員（會員代表）大會時辦理完畢並公布之。惟通訊選舉不得連續辦理。',
          '會員代表大會代表其選舉辦法由司選委員會訂定，提理事會通過，報主管機關核備後辦理。'
        ]
      },
      {
        type: 'str',
        title: '第十八條',
        txt: '本會理事長、名譽理事長任期為二年，連選、連聘以一次為限。理事、監事任期為二年，連選得連任。遇理事、監事出缺時，由候補理事、監事順序遞補，以補足所遞補人員之任期為限。'
      },
      {
        type: 'str',
        title: '第十九條',
        txt: '本會得設顧問及各種委員會。委員會主任委員，由理事長提名，經理事會通過後聘任，任期二年，連聘得連任；委員則由主任委員遴選，提報本會聘任。各委員會組織簡則另訂之。'
      },
      {
        type: 'str',
        title: '第二十條',
        txt: '本會置秘書長一人，會計、總務、會員、服務、講學等五組，每組置組長一人，秘書若干人，並得置副秘書長一人，由理事長提報理監事會議通過聘任之，其辦事細則另訂之。'
      },
      {
        type: 'str',
        title: '第廿一條',
        txt: '本會新舊職員之交接，應於會員（會員代表）大會閉會後一個月內，辦理完畢。'
      }
    ]
  },
  {
    name: '第五章 職權',
    id: 'authority',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'orderlist',
        title: '第廿二條',
        txt: '會員（會員代表）大會之職權如下：',
        list: [
          '訂定或修定本會章程。',
          '選舉及罷免理事、監事。',
          '會務重要計畫與預算、決算之審核。',
          '議決會員（會員代表）之除名。',
          '議決財產之處分。',
          '議決本會之解散。',
          '議決與會員權利義務有關之其他重大事項。'
        ]
      },
      {
        type: 'orderlist',
        title: '第廿三條',
        txt: '理事會之職權如下：',
        list: [
          '議決召開會員（會員代表）大會或臨時會員（會員代表）大會。',
          '執行會員（會員代表）大會決議。',
          '擬定會務方針，年度工作計畫及重要事項。',
          '審核會員入會及退會。',
          '選舉或罷免常務理事、理事長。',
          '議決理事、常務理事或理事長之辭職。',
          '聘免會務工作人員。',
          '擬定經費預算、決算。',
          '決定電機工程獎章及各類獎章受獎事項。',
          '其他有關本會應執行之重大事項。'
        ]
      },
      {
        type: 'orderlist',
        title: '第廿四條',
        txt: '監事會之職權如下：',
        list: [
          '監察理事會工作之執行。',
          '審核本會預算、決算。',
          '保管本會基金。',
          '選舉或罷免常務監事。',
          '議決監事或常務監事之辭職。',
          '調查處理有關紀律事項。',
          '其他有關本會應監察之重大事項。'
        ]
      },
      {
        type: 'str',
        title: '第廿五條',
        txt: '理事長對外代表本會，對內負責綜理會務，並擔任會員（會員代表）大會、理事會主席，執行會員（會員代表）大會、理事會之決議。常務理事協助理事長處理會務，理事長不能執行會務時，由常務理事互推一人代理之。'
      }
    ]
  },
  {
    name: '第六章 會議',
    id: 'meeting',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'str',
        title: '第廿六條',
        txt: '會員（會員代表）大會每年舉行一次，如遇特殊事項，經理事會之議決，得延期舉行或臨時召集之。會員（會員代表）不能親自出席會員（會員代表）大會時，得以書面委託其他會員（會員代表）代理，每一會員（會員代表）以代理一人為限。'
      },
      {
        type: 'str',
        title: '第廿七條',
        txt: '理事、監事會議每三個月召開一次，必要時得召開聯席會議或臨時會議，由理事長決定之，每年至少須舉行四次。會議以全體理事、監事過半數出席始得開會，以出席人數過半數始得決議。前任理事長及常務理監事及各組會負責職員，均得列席理監事會，並得參加討論有關事項。'
      }
    ]
  },
  {
    name: '第七章 經費',
    id: 'funding',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'table',
        title: '第廿八條',
        txt: '本會入會費及常年會費訂定如下表：',
        tableData: {
          columns: [
            { name: '會員別', minWidth: 190 },
            { name: '入會費（暫以新台幣）', minWidth: 190 },
            { name: '常年會費（暫以新台幣）', minWidth: 190 },
            { name: '備註', minWidth: 190 }
          ],
          dataSource: [
            [
              '永久會員',
              '一次繳伍仟元',
              '-',
              '（正會員連續繳納十 五年常年會費）'
            ],
            ['正會員', '二00元', '五00元', '-'],
            ['初級會員', '二00元', '二00元', '僅限學生'],
            [
              '團體會員',
              '免',
              '伍仟元以上，參萬元以下',
              '訂「電」「機」「工」 「程」四級，「電」級 參萬元，「機」級壹萬 伍仟元，「工」級壹萬 元，「程」級伍仟元'
            ],
            ['贊助會員', '壹萬元以上', '免', '-'],
            ['名譽會員', '免', '免', '-']
          ]
        }
      },
      {
        type: 'str',
        title: '第廿九條',
        txt: '各項會費除由總會收取者外，得由各分會出具正式收據收取。分會所收入會費之全數及常年會費、永久會費之半數，於每月月終解繳總會，其餘常年會費及永久會費之半數，留存各該分會應用（該地無分會者直接繳總會）。'
      },
      {
        type: 'str',
        title: '第三十條',
        txt: '各種會員常年會費應於每年六月底前繳齊之。'
      },
      {
        type: 'str',
        title: '第卅一條',
        txt: '凡所屬會員未按規定繳付會費，逾一年以上者，得停止其權利，並報請理事會核備，但補繳所欠會費後，仍得恢復其權利。'
      },
      {
        type: 'str',
        title: '第卅二條',
        txt: '本會經理監事聯席會之決議，得接受特別捐款，其用途由理事會決定。'
      }
    ]
  },
  {
    name: '第八章 附則',
    id: 'appendix',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    contents: [
      {
        type: 'str',
        title: '第卅三條',
        txt: '本會如因故解散，所有賸餘財產悉數捐贈中央政府，不得以任何方式歸屬任何個人或私人企業。'
      },
      {
        type: 'str',
        title: '第卅四條',
        txt: '本章程修正事宜，得經永久會員或正會員十人以上之簽署，交由理監事聯席會審核，再提會員（會員代表）大會決議；或由理監事聯席會提出，交由會員（會員代表）大會議決，經出席會員（會員代表）三分之二以上通過後修正之。'
      },
      {
        type: 'str',
        title: '第卅五條',
        txt: '本章程未規定事項，悉依有關法令規定辦理。'
      },
      {
        type: 'str',
        title: '第卅六條',
        txt: '本章程由會員（會員代表）大會通過後，呈報主管官署核備施行，修正時亦同。'
      }
    ]
  }
])
// 自訂函式
const setSecRefs = (el, item) => {
  if (el) {
    sectionRefs.value.push({
      id: item.id,
      el
    })
  }
}
const calcSectionOffsetH = () => {
  sectionRefs.value.forEach((sec) => {
    const rect = sec.el.getBoundingClientRect()
    const index = navbars.findIndex((nav) => nav.id === sec.id)
    const offsetHeight = sec.el.offsetHeight
    navbars[index].offsetTop = rect.top - headerOffsetH.value
    navbars[index].offsetBottom = rect.bottom - headerOffsetH.value
    navbars[index].sectionTop = sec.el.offsetTop - headerOffsetH.value
    navbars[index].sectionBottom = rect.top - headerOffsetH.value + offsetHeight
  })

  //設定activeId
  for (let index = 0; index < navbars.length; index++) {
    const nav = navbars[index]
    //method 2
    if (nav.offsetTop - 120 <= 0 && nav.offsetBottom > 40) {
      activeId.value = nav.id
      break
    }
    activeId.value = null //以上條件都不符合
  }
}
const handleScroll = () => calcSectionOffsetH()
const onClickItem = (id) => {
  activeId.value = id
  let item = navbars.find((nav) => nav.id === activeId.value)
  window.scrollTo({
    top: item.sectionTop - 120,
    behavior: 'smooth'
  })
}
// lifeCycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  calcSectionOffsetH() // init offsetHeight
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <AboutNavbar
      ref="navRef"
      :list="navbars"
      @click-item="onClickItem"
      :activeId="activeId"
    />
    <div class="mb-5 text-right leading-7">
      <p>中華民國一Ο九年十二月十八日會員大會修正通過並報准內政部</p>
      <p>台內社字第1100003860號函同意備查第二十次修正</p>
    </div>
    <h3 class="mb-10 font-semibold">中國電機工程學會章程</h3>
    <template v-for="nav in navbars" :key="nav.id">
      <section :ref="(el) => setSecRefs(el, nav)">
        <h4 class="title-underline mb-10 font-semibold">{{ nav.name }}</h4>
        <div class="mb-20">
          <template v-for="item in nav.contents" :key="item.title">
            <template v-if="item.type == 'str'">
              <div class="flex [&:not(:last-child)]:mb-6">
                <div class="rule-title">{{ item.title }}</div>
                <div class="leading-7">
                  {{ item.txt }}
                </div>
              </div>
            </template>
            <template v-else-if="item.type == 'orderlist'">
              <div class="flex [&:not(:last-child)]:mb-6">
                <div class="rule-title">{{ item.title }}</div>
                <div class="leading-7">
                  <div class="whitespace-pre-wrap">{{ item.txt }}</div>
                  <ol class="list-ideographic">
                    <li v-for="data in item.list">
                      {{ data }}
                    </li>
                  </ol>
                </div>
              </div>
            </template>
            <template v-else-if="item.type == 'table'">
              <div class="[&:not(:last-child)]:mb-6">
                <div class="flex">
                  <div class="rule-title">{{ item.title }}</div>
                  <div class="whitespace-pre-wrap leading-7">
                    {{ item.txt }}
                  </div>
                </div>
                <Table
                  :tableStyle="{ 'table-layout': 'fixed', width: '100%' }"
                  class="mt-3"
                  :columns="item.tableData.columns"
                  :dataSource="item.tableData.dataSource"
                />
              </div>
            </template>
          </template>
        </div>
      </section>
    </template>
  </section>
</template>
<style lang="scss" scoped></style>
