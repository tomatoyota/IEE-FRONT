<script setup>
const data = reactive({
  lastUpdate: '109.05.20本會第55屆第5次理監事暨各委員會聯席會議修正通過',
  title: '中國電機工程學會青年論文獎辦法',
  list: [
    {
      title: '（一）',
      text: '宗旨：',
      content: {
        type: 'str',
        txt: '中國電機工程學會論文委員會為鼓勵國內碩士班研究生研究風氣，提升論文水準，特設置本辦法。'
      }
    },
    {
      title: '（二）',
      text: '內容：',
      content: {
        type: 'str',
        txt: '論文內容須為與電機工程有關之理論性或應用性學術研究成果。'
      }
    },
    {
      title: '（三）',
      text: '申請資格：',
      content: {
        type: 'str',
        txt: '國內各公私立大學、學院，於申請截止日前當學年度畢業或前一學年度畢業之碩士研究生，限申請一次。'
      }
    },
    {
      title: '（四）',
      text: '評審：',
      content: {
        type: 'str',
        txt: '由青年論文獎審查會議決議評選前三名。'
      }
    },
    {
      title: '（五）',
      text: '獎勵：',
      content: {
        type: 'orderlist',
        list: [
          {
            txt: '（１）第一名三篇：每篇獎金20,000元，獎狀乙紙'
          },
          {
            txt: '（２）第二名三篇：每篇獎金10,000元，獎狀乙紙'
          },
          {
            txt: '（３）第三名九篇：每篇獎金5,000元，獎狀乙紙'
          },
          {
            txt: '（４）佳作若干篇：每篇獎金2,000元，獎狀乙紙'
          }
        ],
        remark:
          '獲獎後須申請入會為本會會員，並將得獎論文投稿至本會”電機工程學刊”。'
      }
    },
    {
      title: '（六）',
      text: '申請日期及資料：',
      content: {
        type: 'str',
        txt: '每年7月底前申請並繳交資料，屆時依公告辦理。'
      }
    },
    {
      title: '（七）',
      text: '本辦法經本會理事會通過後施行，修正時亦同。'
    }
  ]
})
const fileDatas = reactive([
  {
    fileName: '青年論文獎辦法.pdf',
    path: '/files/獎項評選/青年論文獎辦法.pdf'
  }
])
// 自訂函式
// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <SelectionRules
      :is-indent-required="true"
      :last-update="data.lastUpdate"
      :title="data.title"
      :list="data.list"
    />
    <FileDownload class="mt-[60px] md:mt-20 xl:mt-[120px]" :files="fileDatas" />
  </section>
</template>
<style lang="scss" scoped></style>
