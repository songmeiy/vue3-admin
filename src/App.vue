<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="route.meta.noKeepAlive" />
    <keep-alive v-else >
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script>
import { getCurrentInstance, onBeforeMount } from 'vue'
export default {
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    onBeforeMount(() => {
      $store.dispatch('settings/initialSystemSettings')
    })
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
</style>
