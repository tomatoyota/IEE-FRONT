<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import academicsSrv from "@/service/academics.js";
import headerHelper from "@/utils/helpers/header.js";

const loading = ref(false);
// const todayDate = ref("");
// const tmrDate = ref("");

const volumeItems = reactive([]); // 儲存卷選項
const issueItems = reactive([]); // 儲存期和ID選項

const activeVolume = ref(null);//儲存卷數dropdownList
const activePeriod = ref(null);//儲存期數dropdownList

//學刊資料
const academicsData = [];
const Title = ref("");
const Image = ref("");
// const catalogTitle = computed(() => {
//   let rollLabel = rollItems.find((y) => y.key === activeVolume.value).label
//   let PeriodLabel = PeriodItems.find((p) => p.key === activePeriod.value).label
//   return `${rollLabel}${PeriodLabel}`
// })
let isVolumeLoaded = false;
onMounted(async () => {
  if (!isVolumeLoaded) {
    isVolumeLoaded = true;
    await getVolume();
    if (activeVolume.value) {
      await getIssueByVolume(activeVolume.value);
    }
    
  }
  // await getVolume();
  // if (activeVolume.value) {
  //   await getIssueByVolume(activeVolume.value);
  // }
  // if (activePeriod.value && activePeriod.value.academicId) {
  //   await getAcademics(activePeriod.value.academicId); // 獲取最新學刊內容

  // }
});
//取得卷數
const getVolume = async () => {
  try {
    const res = await academicsSrv.getAcademicsVolume();
    if (res.isSuccess && Array.isArray(res.data)) {
      // 清空原有的選項
      volumeItems.splice(0, volumeItems.length);
      // 排序
      const validVolume = res.data.sort((a, b) => b - a);
      //
      volumeItems.push(
        ...validVolume.map((volume) => ({
          key: volume.toString(),
          label: `第${volume}卷`,
        }))
      );
      // 如果有資料，設置卷數預設值
      if (volumeItems.length > 0) {
        activeVolume.value = volumeItems[0].key;
        await getIssueByVolume(activeVolume.value);
      }
    } else {
      console.error("取得卷數資料失敗，資料格式不正確:", res);
    }
  } catch (error) {
    console.error("取得卷數資料時發生錯誤:", error);
  }
};
//取得期數
const getIssueByVolume = async (volume) => {
  const queryParams = {
    title: "",
    releaseStartAt: "",
    releaseEndAt: "",
    volume: volume, //帶入卷數去搜尋
    createdStartAt: "",
    createdEndAt: "",
    currentPage: 1,
    pageSize: 1,
    sortBy: "release_date",
    sortDirection: "DESC",
  };
  try {
    const res = await academicsSrv.postIssueByVolume(queryParams);
    //console.log("postIssueByVolume資料:", res);
    if (res.isSuccess && Array.isArray(res.data)) {
      // 格式化期數資料
      const issueMapping = {
        1: "第一期",
        2: "第二期",
        3: "第三期",
        4: "第四期",
      };
      const formattedIssue = res.data.map((item) => ({
        key: String(item.issue),
        label: issueMapping[item.issue] || "未知期",
        academicId: item.academicId,
      }));

      // 更新 issueItems
      issueItems.splice(0, issueItems.length, ...formattedIssue);
      if (issueItems.length > 0 && !issueItems.label) {
        activePeriod.value = issueItems[0];
        //console.log("更新期數", activePeriod.value.label);
        if (issueItems[0].academicId) {
          await getAcademics(issueItems[0].academicId);
        }
      }
    } else {
      console.error("取得期資料失敗，資料格式不正確:", res);
    }
  } catch (error) {
    console.error("取得期資料時發生錯誤:", error);
  }
};
//取得學刊內容
const getAcademics = async (id) => {
  try {
    const res = await academicsSrv.getAcademics(id);
    if (res.isSuccess) {
      academicsData.value = res.data
      // console.log('取得的學刊:', academicsData.value)
      Title.value = res.data.title;
      Image.value = res.data.image[0];
      // console.log("取得的學刊:", Title.value, Image.value.realFileName);
    } else {
      console.error("API 錯誤:", res.msg);
    }
  } catch (error) {
    console.error("Error fetching academics:", error);
  }
};
//當卷數改變，更新期刊列表
const handleActiveVolumeKeyUpdate = (key) => {
  activeVolume.value = key;
  getIssueByVolume(key);
};
//當期數改變
const handleActivePeriodKeyUpdate = async (key) => {
  const selectedIssue = issueItems.find((item) => item.key === key);
  if (selectedIssue) {
    activePeriod.value = selectedIssue;
    //console.log("期數改變", selectedIssue);
    if (selectedIssue.key) {
      await getAcademics(selectedIssue.academicId); // 使用選中的 academicId 調用
    }
  }
};

//因為<DropDown>有監聽@update所以不用watch
// watch(activeVolume, (newYear) => {
//   if (newYear) {
//     getIssueByVolume(newYear);
//   }
// });
// watch(
//   activePeriod,
//   (newPeriod) => {
//     if (newPeriod && newPeriod.academicId) {
//       //console.log("最新學刊",newPeriod.academicId)
//       getAcademics(newPeriod.academicId); // 使用 academicId 調用 API
//     }
//   },
//   //{ immediate: true } // 確保初始化時也執行
// );
// lifeCycle
</script>
<template>
  <PageHeader />
  <section class="section-wrapper">
    <Tabs class="[&>*:first-child]:mb-20">
      <TabsItem title="學刊簡介">
        <section class="mb-20">
          <h4 class="title-underline mb-10 font-semibold">簡介Intro</h4>
          <p class="mb-7 indent-8 leading-7">
            電機工程學刊是中國電機工程學會出版的刊物，歷史悠久，於1994年首次發行，每年4期(當時國際標準期刊號為1023-4432)；自2004年起，發行次數提高至每年6期(國際標準期刊號改為1812-3031)。本學刊關注電力、通信、控制系統、資訊工程等電機資訊工程相關領域。已被EI
            Compendex、INSPEC等國際資料庫所收錄。
          </p>
          <p class="indent-8 leading-7">
            International Journal of Electrical Engineering (IJEE) has a long history. It
            was published first issue in 1994(ISSN: 1023-4462) with 4 issue per year. IJEE
            has been expanded into 6 issue per year since 2004 (ISSN: 1812-3031) by the
            Chinese Institute of Electrical Engineering (CIEE). It focuses on many aspects
            in the fields of electrical and computer engineering such as power systems,
            communications, control systems and information engineering, etc. IJEE is
            indexed in EI Compendex and INSPEC.
          </p>
        </section>
        <section class="mb-20">
          <h4 class="title-underline mb-10 font-semibold">編輯委員會Editorial Board</h4>
          <ul class="list-disc leading-7">
            <li class="mb-7">
              總編輯Editor-in-Chief
              <p>
                國立台灣大學 蘇炫榮教授<br />Hsuan-Jung Su, Professor, National Taiwan
                University, Taiwan<br />
                <a
                  href="mailto: hjs@ntu.edu.tw"
                  class="font-semibold text-logoColor underline underline-offset-4"
                  >hjs@ntu.edu.tw</a
                >
              </p>
            </li>
            <li>
              <NuxtLink
                class="font-semibold text-logoColor underline underline-offset-4"
                to="https://ijee.ntu.edu.tw/ijee/info/EDITORIAL_BOARD.htm"
                target="_blank"
                >編輯委員會Editorial Board</NuxtLink
              >
            </li>
          </ul>
        </section>
        <section class="mb-20">
          <h4 class="title-underline mb-10 font-semibold">聯絡資訊Contact us</h4>
          <ul class="list-disc leading-7">
            <li class="mb-7">
              編輯助理 Editorial Assistant
              <p>
                黃綉茹小姐 Ms. Angel Huang<br />
                <a
                  href="mailto: ijee2015@ntu.edu.tw"
                  class="font-semibold text-logoColor underline underline-offset-4"
                  >ijee2015@ntu.edu.tw</a
                ><br />
                02-3366-3700#532 <br />
                106台北市羅斯福路4段1號 電機二館532室 <br />
                Room 532, EE2 Bldg., No. 1, Sec 4, Roosevelt Road, Taipei 106, Taiwan
              </p>
            </li>
            <li>
              出版助理 Publishing Assistant
              <p>
                游捷涵小姐 Ms. Lola Yu<br />
                <a
                  href="mailto: cieejurl@ms46.hinet.net"
                  class="font-semibold text-logoColor underline underline-offset-4"
                  >cieejurl@ms46.hinet.net</a
                ><br />106台北市復興南路1段390號7樓之2 中國電機工程學會<br />
                Chinese Institute of Electrical Engineering (CIEE) 7F-2, No. 390, Fu-Hsing
                South Rd., Sec. 1, Taipei 106, Taiwan
              </p>
            </li>
          </ul>
        </section>
      </TabsItem>
      <TabsItem title="投稿與訂閱">
        <div class="flex flex-col-reverse gap-10 lg:flex-row">
          <div class="flex-1">
            <img
              src="@/assets/images/journalImage.png"
              alt=""
              class="h-auto min-w-full"
            />
          </div>
          <div class="flex-shrink-0 lg:basis-[550px]">
            <section class="mb-20">
              <h4 class="title-underline mb-10 font-semibold">投稿資訊HOW to Submit</h4>
              <p class="leading-7">
                投稿請至
                <NuxtLink
                  class="font-semibold text-logoColor underline underline-offset-4"
                  to="http://ijee.ntu.edu.tw/ijee/"
                  target="_blank"
                  >http://ijee.ntu.edu.tw/ijee/</NuxtLink
                >
              </p>
              <p>
                Please go to the website
                <NuxtLink
                  class="font-semibold text-logoColor underline underline-offset-4"
                  to="http://ijee.ntu.edu.tw/ijee/"
                  target="_blank"
                  >http://ijee.ntu.edu.tw/ijee/</NuxtLink
                >
                to submit your paper.
              </p>
            </section>
            <section>
              <h4 class="title-underline mb-10 font-semibold">
                訂閱費用Subscription Rate
              </h4>
              <ul class="list-disc leading-7">
                <li>
                  國內訂戶Domestic subscription：
                  <ul class="list-disc">
                    <li>本會個人會員CIEE members：每年新台幣1,200元(annual NT$1,200)</li>
                    <li>個人訂戶non-members：每年新台幣2,400元(annual NT$2,400)</li>
                    <li>
                      團體機構訂戶Institutional subscription：每年新台幣3,000元(annual
                      NT$3,000)
                    </li>
                  </ul>
                </li>
                <li>
                  國外訂戶International subscription：每年(annual)
                  US$200(含陸海運郵資surface mail postage included)。
                </li>
                <li>
                  電子書(e-book)請至<NuxtLink
                    class="font-semibold text-logoColor underline underline-offset-4"
                    to="https://www.airitilibrary.com/Publication/alPublicationJournal?PublicationID=P20140403004"
                    >華藝數位線上圖書館</NuxtLink
                  >付費下載(download for a fee)。
                </li>
              </ul>
            </section>
          </div>
        </div>
      </TabsItem>
      <TabsItem title="各期目錄">
        <!-- @update:activeKey="handleActiveVolumeKeyUpdate" -->
        <div class="mb-10">
          <Dropdown
            :menuItems="volumeItems"
            :activeKey="activeVolume"
            class="mr-4"
            @update:activeKey="handleActiveVolumeKeyUpdate"
          />
          <Dropdown
            :menuItems="issueItems"
            :activeKey="activePeriod?.key"
            @update:activeKey="handleActivePeriodKeyUpdate"
          />
        </div>
        <div class="flex flex-col-reverse gap-10 lg:flex-row">
          <div class="flex-1">
            <img
              v-if="Image.realFileName"
              :src="Image.realFileName"
              :alt="Image.originalFileName"
              class="h-auto min-w-full"
            />
            
          </div>
          <div class="flex-shrink-0 lg:basis-[550px]">
            <section>
              <h4 class="title-underline mb-10 font-semibold">
                {{ Title }}
              </h4>
              
              <ul class="list-disc leading-7">
                <li>
                  電子書(e-book)請至<NuxtLink
                    class="font-semibold text-logoColor underline underline-offset-4"
                    to="https://www.airitilibrary.com/Publication/alPublicationJournal?PublicationID=P20140403004"
                    >華藝數位線上圖書館</NuxtLink
                  >付費下載(download for a fee)。
                </li>
              </ul>
            </section>
          </div>
        </div>
      </TabsItem>
    </Tabs>
  </section>
</template>
<style lang="scss" scoped></style>
