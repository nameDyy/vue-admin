<template>
  <div>
      {{ this.$route.path }}
      <span>这是系统二的布局样式</span>
      <router-link :to="'/sys2/table'">转到sys2-table</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
