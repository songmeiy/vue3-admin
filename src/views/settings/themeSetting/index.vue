<template>
  <el-form ref="formRef" class="setting-form" :model="theme" label-width="280px">
    <el-divider content-position="left">
      <SvgIcon :iconClass="'theme'" />
      {{ translate('theme', '常用设置') }}
    </el-divider>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '右侧悬浮窗') }}
        </label>
      </template>
      <el-switch v-model="theme.showThemeSetting"/>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '布局') }}
          <el-tooltip
            :content="translate('theme', '布局配置仅在电脑视窗下生效，手机视窗时将默认锁定为纵向布局')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-select v-model="theme.layout" :disabled="device === 'mobile'">
        <el-option
          key="column"
          :label="translate('theme', '分栏')"
          value="column"
        />
        <el-option
          key="comprehensive"
          :label="translate('theme', '综合')"
          value="comprehensive"
        />
        <el-option
          key="vertical"
          :label="translate('theme', '纵向')"
          value="vertical"
        />
        <el-option
          key="horizontal"
          :label="translate('theme', '横向')"
          value="horizontal"
        />
        <el-option
          key="common"
          :label="translate('theme', '常规')"
          value="common"
        />
        <el-option
          key="hide"
          :label="translate('theme', '隐藏')"
          value="hide"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '分栏风格') }}
          <el-tooltip
            :content="translate('theme', '分栏布局时生效')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-select
        v-model="theme.columnStyle"
        :disabled="theme.layout !== 'column'"
      >
        <el-option
          key="vertical"
          :label="translate('theme', '纵向')"
          value="vertical"
        />
        <el-option
          key="horizontal"
          :label="translate('theme', '横向')"
          value="horizontal"
        />
        <el-option
          key="card"
          :label="translate('theme', '卡片')"
          value="card"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '主题') }}
        </label>
      </template>
      <el-select v-model="theme.themeName" @change="setTheme">
        <el-option
          key="default"
          :label="translate('theme', '默认')"
          value="default"
        />
        <el-option
          key="green"
          :label="translate('theme', '绿荫草场')"
          value="green"
        />
        <el-option
          key="white"
          :label="translate('theme', '碰触纯白')"
          value="white"
        />
        <el-option
          key="red"
          :label="translate('theme', '中国红')"
          value="red"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '展开唯一子菜单') }}
          <el-tooltip
            :content="translate('theme', '横向布局下失效')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-switch v-model="theme.uniqueOpened" :disabled="theme.layout === 'horizontal'"/>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '自动打开二级菜单') }}
          <el-tooltip
            :content="translate('theme', '分栏布局、综合布局、隐藏布局时生效')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-switch
        v-model="theme.openFirstMenu"
        :disabled="theme.layout !== 'column' && theme.layout !== 'comprehensive' && theme.layout !== 'hide'"/>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '标签') }}
        </label>
      </template>
      <el-switch v-model="theme.showTabs"/>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '标签图标') }}
          <el-tooltip
            :content="translate('theme', '标签开启时生效')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-switch
        v-model="theme.showTabsBarIcon"
        :disabled="!theme.showTabs"
      />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '标签风格') }}
          <el-tooltip
            :content="translate('theme', '标签开启时生效')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-select v-model="theme.tabsBarStyle" :disabled="!theme.showTabs">
        <el-option
          key="card"
          :label="translate('theme', '卡片')"
          value="card"
        />
        <el-option
          key="smart"
          :label="translate('theme', '灵动')"
          value="smart"
        />
        <el-option
          key="smooth"
          :label="translate('theme', '圆滑')"
          value="smooth"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '页脚') }}
        </label>
      </template>
      <el-switch v-model="theme.showFooter"/>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '面包屑导航') }}
        </label>
      </template>
      <el-switch v-model="theme.showBreadcrumb" :disabled="theme.layout === 'common'"/>
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '导航图标') }}
          <el-tooltip
            :content="translate('theme', '面包屑导航开启时生效')"
            effect="dark"
            placement="top"
          >
            <SvgIcon :iconClass="'tips'" />
          </el-tooltip>
        </label>
      </template>
      <el-switch
        v-model="theme.showBreadcrumbIcon"
        :disabled="theme.layout === 'common' || !theme.showBreadcrumb"
      />
    </el-form-item>
    <el-divider content-position="left" style="margin-top: 20px">
      <SvgIcon :iconClass="'theme'" />
      {{ translate('theme', '其它设置') }}
    </el-divider>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '头部固定') }}
        </label>
      </template>
      <el-switch
        v-model="theme.fixedHeader"
        :disabled="theme.layout === 'common'"
      />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '国际化') }}
        </label>
      </template>
      <el-switch v-model="theme.showLanguage" />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '进度条') }}
        </label>
      </template>
      <el-switch v-model="theme.showProgressBar" />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '刷新') }}
        </label>
      </template>
      <el-switch v-model="theme.showRefresh" />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '搜索') }}
        </label>
      </template>
      <el-switch v-model="theme.showSearch" onchange="" />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '通知') }}
        </label>
      </template>
      <el-switch v-model="theme.showNotice" />
    </el-form-item>
    <el-form-item>
      <template #label>
        <label class="el-form-item__label">
          {{ translate('theme', '全屏') }}
        </label>
      </template>
      <el-switch v-model="theme.showFullScreen" />
    </el-form-item>
    <el-divider content-position="left" style="margin-top: 20px">
      <SvgIcon :iconClass="'theme'" />
      {{ translate('theme', '操作') }}
    </el-divider>
    <el-button type="primary" @click="handleSaveTheme">
      {{ translate('theme', '保存') }}
    </el-button>
    <el-button @click="setDefaultTheme">
      {{ translate('theme', '恢复默认') }}
    </el-button>
    <el-button @click="randomTheme">
      {{ translate('theme', '随机换肤') }}
    </el-button>
  </el-form>
</template>

<script>
import { computed, getCurrentInstance, ref } from 'vue'
import { translate } from '@/utils/i18n'
export default {
  name: 'ThemeSetting',
  setup() {
    const { $store, $baseEventBus } = getCurrentInstance().appContext.config.globalProperties
    const formRef = ref(null)
    const theme = computed(() => $store.state.settings.theme)
    const device = computed(() => $store.state.settings.device)
    const setTheme = () => {
      document.getElementsByTagName(
        'body'
      )[0].className = `element-theme-${theme.value.themeName}`
    }
    const handleSaveTheme = async() => {
      await $store.dispatch('settings/saveTheme')
    }
    const setDefaultTheme = async() => {
      await $store.dispatch('settings/resetTheme')
    }
    const randomTheme = () => {
      $baseEventBus.emit('randomTheme')
    }
    return {
      theme,
      device,
      formRef,
      setTheme,
      translate,
      randomTheme,
      handleSaveTheme,
      setDefaultTheme
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-form{
  padding: 30px;
  .el-form-item {
    text-align: left;
  }
}
</style>
