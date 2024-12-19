<script setup>
const props = defineProps({
  tableStyle: {
    type: Object,
    default: () => ({})
  },
  columns: {
    type: Array,
    required: true
  },
  dataSource: {
    type: Array,
    required: true
  }
})
// 第三方套件變數

// 自訂變數

// 自訂函式

// lifeCycle
</script>
<template>
  <div class="overflow-x-auto">
    <table :style="tableStyle">
      <colgroup>
        <col
          v-for="(header, index) in columns"
          :key="index"
          :style="{
            width: header?.width ? `${header.width}` : 'auto',
            maxWidth: header?.maxWidth ? `${header.maxWidth}px` : 'auto',
            minWidth: header?.minWidth ? `${header.minWidth}px` : 'auto'
          }"
        />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="(header, index) in columns"
            :key="index"
            class="px-6 py-3 md:px-8 md:py-4"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in dataSource" :key="rowIndex">
          <td
            v-for="(column, columnIndex) in row"
            :key="columnIndex"
            class="px-6 py-3 text-justify md:px-8 md:py-4"
          >
            {{ column }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
table {
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
