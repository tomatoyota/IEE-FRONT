<script setup>
const props = defineProps({
  lastUpdate: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  },
  isIndentRequired: {
    type: Boolean,
    default: false
  }
})
// 自訂變數

// 自訂函式

// lifeCycle
</script>
<template>
  <div class="mb-5 text-right leading-7">
    <p>{{ props.lastUpdate }}</p>
  </div>
  <h3 class="mb-10 font-semibold">{{ props.title }}</h3>
  <template v-for="item in list">
    <div class="flex [&:not(:last-child)]:mb-6">
      <div class="rule-title">{{ item.title }}</div>
      <div class="whitespace-pre-wrap leading-7">
        <div>{{ item.text }}</div>
        <template v-if="item?.content?.type == 'str'">
          <div>{{ item.content.txt }}</div>
        </template>
        <template v-if="item?.content?.type == 'orderlist'">
            <ul :class="[isIndentRequired ? 'pl-12 -indent-12' : '', 'list-none']">
              <li v-for="data in item.content.list" :key="data.txt" :class="'list-none'">
              {{ data.txt }}
              <template v-if="data?.sublist">
                    <ul class="pl-4" :class="[isIndentRequired ? '-indent-4' : '', 'list-none']">
                      <li v-for="subdata in data.sublist" :key="subdata" :class="'list-none'">
                    {{ subdata }}</li>
                </ul>
              </template>
            </li>
          </ul>
          <template v-if="item?.content?.remark">
            <div>{{ item.content.remark }}</div>
          </template>
        </template>
      </div>
    </div>
  </template>
</template>
<style lang="scss" scoped></style>
