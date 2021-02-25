<template>
  <router-view v-slot="{ Component, route }">
    <div v-if="route.meta.noKeepAlive" class="main-container">
      <component :is="Component" />
    </div>
    <div v-else class="main-container">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </div>
  </router-view>
</template>

<script>
export default {
  name: 'ElementKeepAlive'
}
</script>

<style scoped>

</style>
