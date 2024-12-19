<template>
  <div class="rounded bg-black flex flex-row px-6 py-3">
    <div class="text-white font-normal text-base flex-none">檔案下載失敗，請再試一次</div>
    <div class="flex justify-end">
          <Icon
            name="mi:close"
            class="outlinkIcon text-2xl text-white"
            @click="closeMenu"
          />
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  background-color: white;
}
</style>