<template>
  <div class="setting-form-container">
    <el-form
      ref="formRef"
      label-width="180px"
      :label-position="device === 'mobile' ? 'top' : 'left'"
    >
      <el-divider content-position="left">
        <SvgIcon :icon-class="'system'" />
        {{ translate('system', '通用设置') }}
        <el-tooltip
          :content="translate('system', `这些设置由后台控制，会对全局产生影响，请谨慎操作`)"
          effect="dark"
          placement="top"
        >
          <SvgIcon :icon-class="'tips'" />
        </el-tooltip>
      </el-divider>
      <el-form-item :label="translate('system', '网站标题')">
        <el-input v-model="system.websiteTitle">
          <template #append>
            <el-button icon="el-icon-edit" @click="handleChangeSettings('websiteTitle', system.websiteTitle)"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="translate('system', '标题分隔符')">
        <el-radio-group v-model="system.titleSeparator" size="small" @change="handleChangeSettings('titleSeparator', system.titleSeparator)">
          <el-radio label=" - " border></el-radio>
          <el-radio label=" -- " border ></el-radio>
          <el-radio :label="' & '" border ></el-radio>
          <el-radio :label="' && '" border ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="translate('system', '图标')">
        <el-popover placement="bottom" trigger="click" width="300">
          <template #reference>
            <el-input v-model="system.websiteLogo">
              <template #append>
                <el-button icon="el-icon-edit" @click="handleChangeSettings('websiteLogo', system.websiteLogo)"></el-button>
              </template>
            </el-input>
          </template>
          <element-icon-selector @handle-icon="handleWebsiteLogo" />
        </el-popover>
      </el-form-item>
      <el-form-item :label="translate('system', '版权')">
        <el-input v-model="system.copyright">
          <template #append>
            <el-button icon="el-icon-edit" @click="handleChangeSettings('copyright', system.copyright)"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="translate('system', '消息提示时间')">
        <el-input v-model="messageDuration">
          <template #append>
            <el-button icon="el-icon-plus" @click="handleMessageDurationPlus()"></el-button>
            <el-button icon="el-icon-minus" @click="handleMessageDurationMinus()"></el-button>
            <el-button icon="el-icon-edit" @click="handleChangeSettings('messageDuration', messageDuration * 1000)"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="translate('system', '加载文字')">
        <el-input v-model="system.loadingText">
          <template #append>
            <el-button icon="el-icon-edit" @click="handleChangeSettings('loadingText', system.loadingText)"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="translate('system', '开放注册')">
        <el-switch v-model="system.allowRegister" @change="handleChangeSettings('allowRegister', system.allowRegister)"></el-switch>
      </el-form-item>
      <el-form-item :label="translate('system', '登录RSA加密')">
        <el-switch v-model="system.loginRSA" disabled></el-switch>
      </el-form-item>
      <el-form-item :label="translate('system', '角色控制')">
        <el-switch v-model="system.rolesControl" disabled @change="handleChangeSettings('rolesControl', system.rolesControl)"></el-switch>
      </el-form-item>
      <el-form-item :label="translate('system', '登录拦截')">
        <el-switch v-model="system.loginInterception" disabled @change="handleChangeSettings('loginInterception', system.loginInterception)"></el-switch>
      </el-form-item>
      <el-form-item :label="translate('system', '支持游客访问')">
        <el-switch v-model="system.supportVisit" disabled @change="handleChangeSettings('supportVisit', system.supportVisit)"></el-switch>
      </el-form-item>
      <el-form-item :label="translate('system', '路由记录')">
        <el-switch v-model="system.recordRoute" @change="handleChangeSettings('recordRoute', system.recordRoute)"></el-switch>
      </el-form-item>
      <el-form-item :label="translate('system', '路由白名单')">
        <el-checkbox-group v-model="routesWhiteList" @change="handleChangeSettings('routesWhiteList', routesWhiteList.join())">
          <el-checkbox label="/login" disabled></el-checkbox>
          <el-checkbox label="/403" disabled></el-checkbox>
          <el-checkbox label="/404" disabled></el-checkbox>
          <el-checkbox label="/register"></el-checkbox>
          <el-checkbox label="/callback"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <template #label>
          {{ translate('system', '标题翻转') }}
          <el-tooltip
            :content="translate('system', `如果为false: page - title 如果为true: title - page`)"
            effect="dark"
            placement="top"
          >
            <SvgIcon :icon-class="'tips'" />
          </el-tooltip>
        </template>
        <el-switch v-model="system.titleReverse" @change="handleChangeSettings('titleReverse', system.titleReverse)"></el-switch>
      </el-form-item>
      <el-divider content-position="left"><SvgIcon :icon-class="'system'" />{{ translate('system', '国际化') }}</el-divider>
      <el-form-item :label="translate('system', '选择语言')">
        <el-radio-group v-model="system.language" size="small" @change="handleChangeLanguage">
          <el-radio label="zh-cn" border>简体中文</el-radio>
          <el-radio label="en" border >English</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { translate } from '@/utils/i18n'
import { computed, getCurrentInstance, ref, onActivated, onDeactivated } from 'vue'
import getPageTitle from '@/utils/pageTitle'
import ElementIconSelector from '@/components/ElementIconSelector'
export default {
  name: 'SystemSetting',
  components: {
    ElementIconSelector
  },
  setup() {
    const { $store, $route, $router } = getCurrentInstance().appContext.config.globalProperties
    const system = computed(() => $store.state.settings.system)
    const device = computed(() => $store.state.settings.device)
    const messageDuration = ref(system.value.messageDuration / 1000)
    const routesWhiteList = ref(system.value.routesWhiteList)
    const handleChangeLanguage = (item) => {
      $store.dispatch('settings/changeLanguage', item)
    }
    const handleChangeSettings = async(settingItem, value) => {
      const item = {}
      item[settingItem] = value
      if (settingItem === 'loginInterception') {
        await $store.dispatch('settings/changeSystemSetting', item)
        await $store.dispatch('user/resetAll')
        await $store.dispatch('settings/initialSystemSettings')
        await $router.push('/login')
      } else {
        await $store.dispatch('settings/changeSystemSetting', item)
        if (settingItem === 'titleReverse' || settingItem === 'titleSeparator' || settingItem === 'websiteTitle') {
          getPageTitle($route.meta.title)
        }
      }
    }
    const handleWebsiteLogo = (item) => {
      system.value.websiteLogo = item
    }
    const handleMessageDurationPlus = () => {
      messageDuration.value++
    }
    const handleMessageDurationMinus = () => {
      messageDuration.value--
    }
    onActivated(() => {
      $store.dispatch('settings/initialSystemSettings')
    })
    onDeactivated(() => {
      $store.dispatch('settings/initialSystemSettings')
    })
    return {
      system,
      routesWhiteList,
      messageDuration,
      device,
      translate,
      handleWebsiteLogo,
      handleChangeSettings,
      handleChangeLanguage,
      handleMessageDurationPlus,
      handleMessageDurationMinus
    }
  }
}
</script>
