<template>
  <div>
    <ul v-if="theme.showThemeSetting" class="element-theme-setting">
      <li @click="handleOpenTheme">
        <a>
          <SvgIcon iconClass="theme" />
          <p>{{ translate('theme', '主题配置') }}</p>
        </a>
      </li>
      <li @click="randomTheme">
        <a>
          <SvgIcon iconClass="random" />
          <p>{{ translate('theme', '随机换肤') }}</p>
        </a>
      </li>
      <li @click="removeLocalStorage">
        <a>
          <SvgIcon iconClass="clean" />
          <p>{{ translate('theme', '清理缓存') }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { translate } from '@/utils/i18n'
import { computed, getCurrentInstance } from 'vue'
export default {
  name: 'ElementThemeSetting',
  setup() {
    const { $store, $baseEventBus } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const device = computed(() => $store.state.settings.device)
    const setTheme = () => {
      document.getElementsByTagName(
        'body'
      )[0].className = `element-theme-${theme.value.themeName}`
    }
    const handleOpenTheme = () => {
      $baseEventBus.emit('openThemeDrawer')
    }
    const randomTheme = () => {
      $baseEventBus.emit('randomTheme')
    }
    const removeLocalStorage = () => {
      localStorage.clear()
      location.reload()
    }
    return {
      theme,
      device,
      setTheme,
      randomTheme,
      handleOpenTheme,
      translate,
      removeLocalStorage
    }
  }
}
</script>

<style lang="scss">
.element-theme-setting {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: $base-z-index + 1;
  padding: 10px 0 0 0;
  margin: 0;
  text-align: center;
  cursor: pointer;
  background: $base-color-white;
  border: 1px solid $base-border-color;
  border-top-left-radius: $base-border-radius + 3;
  border-bottom-left-radius: $base-border-radius + 3;
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
  transform: translateY(-50%);

  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px 10px 10px;
    margin: 0;
    list-style: none;

    &:nth-child(2) {
      [class*='ri-'] {
        animation: rotate 6s linear infinite;
      }
    }

    $colors: (
      1: #3698fd,
      2: #1bc3bb,
      3: #faa500,
      4: #b37feb,
      5: #ef4c5d,
    );

    @each $key, $color in $colors {
      &:nth-child(#{$key}) {
        a {
          color: $color;
          background: mix($base-color-white, $color, 90%);
          transition: color 0.15s ease, background-color 0.15s ease,
          border-color 0.15s ease, box-shadow 0.15s ease,
          -webkit-box-shadow 0.15s ease;

          &:hover {
            color: $base-color-white;
            background: $color;
          }
        }
      }
    }

    a {
      display: inline-block;
      width: 60px;
      height: 60px;
      padding-top: 10px;
      text-align: center;
      background: #f6f8f9;
      border-radius: $base-border-radius + 3;

      p {
        padding: 0;
        margin: 0;
        overflow: hidden;
        font-size: $base-font-size-small;
        line-height: 25px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
