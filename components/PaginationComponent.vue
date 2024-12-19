<template>
  <div class="pagination-container">
    <ul class="pagination-list list-none">
      <li
        v-for="pageNum in pageLength"
        :key="pageNum"
        :class="{ active: pageNum === page }"
        @click.prevent="changePage(pageNum)"
        class="pagination-item"
      >
        {{ pageNum }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const page = ref(1);  // 當前頁面

const props = defineProps({
  pageLength: Number,  // 總頁數
  currentPage: Number  // 當前頁面來自父組件
});

const emits = defineEmits(['getList', 'setPage']);

// 改變頁面並觸發相應事件
const changePage = (pageNum) => {
  page.value = pageNum;
  emits('setPage', pageNum);
  emits('getList', pageNum);
};

// 監聽當前頁面的變化
watch(
  () => props.currentPage,
  (newPage) => {
    page.value = newPage;
  }
);
</script>

<!-- :deep(.v-pagination__item--is-active) {
    background-color: #265667;
    color: #fff;
    border-radius: 8px;
}
:deep(.v-pagination__list){
    margin-bottom: 0px;
} -->

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-start;
}

.pagination-list {
  display: flex;
  list-style: none;
  padding: 0;
}

.pagination-item {
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.pagination-item.active {
  background-color: #111;
  color: #fff;
}
</style>