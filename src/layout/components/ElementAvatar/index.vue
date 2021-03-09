<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar :src="userInfo.avatar" class="user-avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ userInfo.name }}</span>
        <SvgIcon
          class="element-dropdown"
          :icon-class ="'triangle-open'"
          :class-name ="active? 'open' : ''"
        />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personalCenter">
          <SvgIcon :icon-class="'user'" />
          {{ translate('layout', '个人中心') }}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <SvgIcon :icon-class="'logout'" />
          {{ translate('layout', '退出登录') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { translate } from '@/utils/i18n'
import { ref, computed, getCurrentInstance } from 'vue'
import { toLoginRoute } from '@/utils/routes'
export default {
  name: 'ElementAvatar',
  setup() {
    const { $store, $route, $router } = getCurrentInstance().appContext.config.globalProperties
    const active = ref(false)
    const userInfo = computed(() => $store.state.user.userInfo)
    const handleCommand = (command) => {
      switch (command) {
          case 'logout':
            logout()
            break
          case 'personalCenter':
            $router.push({ name: 'PersonalCenter' })
            break
      }
    }
    const handleVisibleChange = (val) => {
      active.value = val
    }
    const logout = async() => {
      await $store.dispatch('user/logout')
      await $router.push(toLoginRoute($route.path))
    }
    return {
      active,
      userInfo,
      handleCommand,
      translate,
      handleVisibleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.open {
  transform: rotate(180deg);
}
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .user-avatar {
    width: 40px;
    height: 40px;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 40px;
    margin-left: 6px;
    line-height: 40px;
    cursor: pointer;

    [class*='ri-'] {
      margin-left: 0 !important;
    }
  }
}
</style>
