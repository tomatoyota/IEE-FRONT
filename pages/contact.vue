<script setup>
// 第三方套件變數

// 自訂變數
const data = reactive([
  {
    title: '總會',
    address: '106470台北市復興南路一段390號7樓之2',
    tel: '(02)2707-5885',
    service: '週一至週五，上午9點至下午6點',
    fax: '(02)2325-5088',
    contact: '游捷涵小姐',
    email: 'ciee@ms35.hinet.net',
    goolemap:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0083988251367!2d121.54071177593363!3d25.033789038299005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd379a5ec97%3A0x19e21d39c31ba341!2z5Lit5ZyL6Zu75qmf5bel56iL5a245pyD!5e0!3m2!1szh-TW!2stw!4v1689662237004!5m2!1szh-TW!2stw'
  },
  {
    title: '高雄分會',
    address: '824005高雄市燕巢區大學路1號(國立高雄科技大學電機與資訊學院)',
    tel: '(07)381-4526 #32602',
    fax: '(07)601-1113',
    contact: '黃詩晴小姐',
    email: 'tfbzzy0818@nkust.edu.tw'
  }
])
// 自訂函式

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <section v-for="(item, index) in data" :key="index">
      <h4 class="title-underline mb-10 font-semibold">{{ item.title }}</h4>
      <div class="leading-7">
        <div v-if="item?.address">地址：{{ item.address }}</div>
        <div v-if="item?.tel">電話：{{ item.tel }}</div>
        <div v-if="item?.service">服務時間：{{ item.service }}</div>
        <div v-if="item?.fax">傳真：{{ item.fax }}</div>
        <div v-if="item?.contact">聯絡人：{{ item.contact }}</div>
        <div v-if="item?.email">
          E-mail：<a
            :href="`mailto:${item.email}`"
            class="text-logoColor underline"
            >{{ item.email }}</a
          >
        </div>
        <div v-if="item?.goolemap" class="mb-20 mt-10">
          <iframe
            :src="`${item.goolemap}`"
            width="100%"
            height="300"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </section>
</template>
<style lang="scss" scoped></style>
