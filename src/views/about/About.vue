<template>
  <div class="about">
    <div id="nav">
      <router-link to="/">
        {{ translate('About', 'home') }}
      </router-link> |
      <router-link to="/about">
        {{ translate('About', 'about') }}
      </router-link>
    </div>
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { translate } from '@/utils/i18n'

export default {
  name: 'About',
  components: {
    HelloWorld
  },
  setup() {
    return {
      translate
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
