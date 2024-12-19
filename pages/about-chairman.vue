<script setup>
// 第三方套件變數

// 自訂變數
const chairmanData = {
  name: '謝繼茂',
  work: '中華電信股份有限公司公司董事長',
  school: [
    '國立台灣大學碩士、國立交通大學學士',
    '中華電信股份有限公司公司 總經理'
  ],
  experience: [
    '中華電信股份有限公司公司 執行副總經理（業務長）',
    '中華電信股份有限公司公司 執行副總經理（行政長）',
    '中華電信股份有限公司公司 南區分公司總經理',
    '中華電信股份有限公司公司 中區分公司總經理',
    '中國電機工程學會 常務理事'
  ],
  photoTag: {
    name: '第57屆理事長',
    year: '民國112年－民國113年'
  }
}
// 自訂函式

// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <div class="flex flex-col items-center lg:flex-row lg:items-start">
      <!-- image -->
      <div
        class="z-10 w-full max-w-[400px] flex-shrink-0 lg:w-1/3 lg:min-w-[400px]"
      >
        <div class="relative">
          <img src="@/assets/images/chairman.png" alt="" />
          <span class="absolute bottom-[88px] bg-white px-4 py-2">
            {{ chairmanData.photoTag.name }}
          </span>
          <span class="absolute bottom-8 bg-white px-4 py-2">
            {{ chairmanData.photoTag.year }}
          </span>
        </div>
      </div>

      <!-- content -->
      <div class="w-full max-w-[400px] lg:w-2/3 lg:max-w-none lg:pt-10">
        <div
          class="content relative inline-block w-full overflow-hidden rounded bg-white px-10 py-8 lg:ml-[-40px] lg:px-20"
        >
          <div
            class="absolute right-[-90px] top-[20px] z-10 flex h-[60px] w-[284px] rotate-45 items-center justify-center bg-logoColor align-middle text-white"
          >
            現任理事長
          </div>
          <div class="mb-2 text-[#6e6e6e]">董事長</div>
          <h4
            class="relative mb-10 after:absolute after:bottom-[-20px] after:left-0 after:h-[1px] after:w-full after:max-w-[620px] after:bg-[#eaeaea] after:content-['']"
          >
            {{ chairmanData.name }}
          </h4>
          <div class="grid grid-cols-[auto_minmax(0,_1fr)] gap-x-8 gap-y-3">
            <div class="font-semibold">現職</div>
            <div>{{ chairmanData.work }}</div>
            <div class="font-semibold">學歷</div>
            <div class="leading-7">
              <div v-for="(item, index) in chairmanData.school" :key="index">
                {{ item }}
              </div>
            </div>
            <div class="font-semibold">經歷</div>
            <div class="leading-7">
              <div
                v-for="(item, index) in chairmanData.experience"
                :key="index"
                class="break-keep"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
img {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
.content {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  @media (min-width: 992px) {
    width: calc(100% + 40px);
  }
}
</style>
