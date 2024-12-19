<script setup>
// 第三方套件變數

// 自訂變數
const globalStore = useGlobalStore()
const headerOffsetH = computed(() => globalStore.headerOffsetH)

const activeId = ref('')
const navRef = ref(null)
const sectionRefs = ref([])

const navbars = reactive([
  {
    name: '會員組成及贊助單位',
    id: 'membership',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    data: {
      type: 'str',
      content:
        '本會會員成立初期會員主要以電信及電力界學者專家五十餘人為主，後來逐漸涵蓋電子及資訊領域，最高個人會員曾達一萬零五百餘人，團體會員九十五個單位，目前有繳交會費會員約二千五百人，會員大都是電機學術界、產業界及企業界之精英領導者。\n\n　　中國電機工程學會領域包含電力、電信、資訊及電子四大領域，主要幕後支持贊助單位為台灣電力公司、中華電信公司、工業技術研究院、資訊工業策進會、台灣大學、交通大學、清華大學及成功大學等單位。'
    }
  },
  {
    name: '會務重點',
    id: 'conference',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    data: {
      type: 'unorderlist',
      content: [
        '舉行電機相關工程學術演講。',
        '接受公私機關之委託研究並解決電機相關工程問題。',
        '獎勵傑出電機工程人員、優秀電機研究生。',
        ' 徵集工程圖書、調查國內外電機相關工程事業之最新發展以供學術界及實業界參考。',
        '草擬及審議電機相關工程名詞標準及各項物料標準規範。',
        '發行會刊、學刊及有關電機相關工程書籍。',
        '協助會員發展電機相關事業。',
        '辦理其他電機相關工程及學術事項。'
      ]
    }
  },
  {
    name: '國際合作交流',
    id: 'international',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    data: {
      type: 'orderlist',
      content: [
        '與大韓電子工學會（The Korean Institute of Electronics Engineers）、英國電機工程師學會（The Institution of Electrical Engineers）及國際電機電子工程師學會通信組（IEEE The Communications Society）締結為姊妹學會，多次派員參加國際會議、主協辦國際會議以及國內學術研討會。',
        '1997辦理第7屆IEEE個人、室內及行動無線通訊國際會議（Personal, Indoor and Mobile Radio Communications）。',
        '2000年辦理第9屆太平洋科學聯合年會資訊領域國際研討會（Wireless Networks and Knowledge Discovery）。',
        '2002年舉辦2002年全球通信大會（2002 IEEE Globecom Conference），總統親臨會場致歡迎詞。',
        '2003年舉辦2003年卡拉漢國際安全資通訊技術研討會（2003 IEEE Carnahan Conference on Security Technology），吸引全球資通訊專家學者共約1400名與會，陳水扁總統、呂秀蓮副總統都曾親臨會場。',
        '2009年辦理2009 IEEE ICASSP全球資通訊語音信號國際大會，吸引全球資通訊專家學者共約1600名與會，總統親臨會場致歡迎詞。',
        '2011年辦理第13屆APNOMS 2011亞太網路維運與管理國際會議（Asia-Pacific Network Operations and Management Symposium）。',
        '2014年辦理第16屆APNOMS 2014亞太網路維運與管理國際會議（Asia-Pacific Network Operations and Management Symposium）。',
        '2016年9月國際電機電子工程師學會（Institute of Electrical and Electronics Engineers）董事等一行來台灣經建參訪並與本會交流。',
        '2020年12月再度辦理全球通信大會（2020 IEEE Globecom Conference）。'
      ]
    }
  },
  {
    name: '兩岸學術交流',
    id: 'crossstrait',
    offsetTop: 0,
    offsetBottom: 0,
    sectionTop: 0,
    sectionBottom: 0,
    data: {
      type: 'orderlist',
      content: [
        '2005年10月組團至宜昌與大陸中國電機工程學會合辦「海峽兩岸電機電力產業論壇暨三峽大壩電廠實地參訪與座談會」。',
        '2006年組團參與福州之中國科協年會。',
        '2007年11月本會接待廣東電機工程學會30人到台灣經建參訪。',
        '2008年11月接待澳門電機工程學會容志榮理事長及林潤中監事長。',
        '2009年12月大陸中國電機工程學會陸理事長等一行來台灣經建參訪並與本會交流，雙方並簽訂海峽兩岸電機工程學會合作備忘錄。',
        '2011年11月25日本會理事長李嗣涔帶領秘書長陳昌勇及電工通訊季刊編輯委員會林宗葆總編輯赴貴州貴陽與大陸中國電機工程學會交流，本會理事長並於會中致詞並專題報告我國節能減碳。',
        '2013年11月20日至23日本會由海峽兩岸委員會費昌仁主任委員及台灣電力公司鍾炳利執行長參與大陸中國電機工程學會於四川成都舉辦之年會，發表「生態文明在台灣電力發展的現況」之專題報告。',
        '2017年11月23日至26日本會由海峽兩岸委員會籌組學術、業界代表團赴廣西南寧與大陸中國電機工程學會交流，由楊金石主任委員發表「台灣電力防災檢災技術」之專題報告。',
        '2018年11月12日至15日本會由鍾炳利理事長帶領秘書長陳昌勇等專家學者至北京市參與第一屆兩岸四地工程學會學術研討會以及大陸中國電機工程學會年會，由海峽兩岸委員會楊金石主任委員發表「台灣用電節能與需量反應措施」之專題報告。'
      ]
    }
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
    //other key
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
    // method1
    // if (nav.offsetTop > 0) {
    //   activeId.value = nav.id
    //   break
    // }
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
    <div class="[&>*:not(:last-child)]:mb-20">
      <div class="text-sub indent-8">
        “中國電機工程學會於1934年10月為配合國家政策、發展工業及繁榮經濟於上海成立，以聯絡電機工程人員，研究電機工程學術，協力發展中國電機工程事業為宗旨。”
      </div>
      <template v-for="item in navbars" :key="item.id">
        <section :ref="(el) => setSecRefs(el, item)">
          <!-- {{ item.offsetTop }},{{ item.offsetBottom }},{{ windowOffset }} -->
          <h4 class="title-underline mb-10 font-semibold">{{ item.name }}</h4>
          <template v-if="item.data.type === 'str'">
            <div class="whitespace-pre-wrap indent-8 leading-7">
              {{ item.data.content }}
            </div>
          </template>
          <template v-if="item.data.type === 'unorderlist'">
            <ul class="list-disc leading-7 list-none">
              <li v-for="data in item.data.content">
                {{ data }}
              </li>
            </ul>
          </template>
          <template v-if="item.data.type === 'orderlist'">
            <ol class="list-decimal leading-7 list-none">
              <li v-for="data in item.data.content">
                {{ data }}
              </li>
            </ol>
          </template>
        </section>
      </template>
    </div>
  </section>
</template>
<style lang="scss" scoped></style>
