<template>
  <div class="error-container">
    <div class="error-content">
      <el-row :gutter="20">
        <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
          <div class="pic-error">
            <el-image
              :src="require('@/assets/error_images/403.png')"
              class="pic-error-parent"
            />
            <el-image
              :src="require('@/assets/error_images/cloud.png')"
              class="pic-error-child left"
            />
          </div>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
          <div class="bullshit">
            <div class="bullshit-oops">{{ oops }}</div>
            <div class="bullshit-headline">{{ headline }}</div>
            <div class="bullshit-info">{{ info }}</div>
            <el-button type="primary" round @click="goBack">{{ jumpTime }}s {{ btn }}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import { translate } from '@/utils/i18n'
export default {
  name: '404',
  setup() {
    const { $store, $route, $router } = getCurrentInstance().appContext.config.globalProperties
    const jumpTime = ref(5)
    const oops = translate('error', '抱歉!')
    const headline = translate('error', '您没有操作权限...')
    const info = translate('error', '当前帐号没有操作权限,请联系管理员。')
    const btn = translate('error', '返回')
    const timer = ref(0)
    const flag = ref(false)
    const timeChange = () => {
      timer.value = setInterval(() => {
        if (jumpTime.value) {
          if (flag.value) jumpTime.value--
        } else {
          goBack()
        }
      }, 1000)
    }
    const goBack = () => {
      $store.dispatch('tabs/delVisitedRoute', $route.path)
      $router.push('/')
      clearInterval(timer.value)
    }
    onBeforeUnmount(() => {
      flag.value = false
    })
    onMounted(() => {
      timeChange()
    })
    return {
      jumpTime,
      headline,
      oops,
      info,
      btn,
      goBack
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  position: relative;
  min-height: 100vh;

  .error-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40vw;
    transform: translate(-50%, -50%);

    .pic-error {
      position: relative;
      float: left;
      width: 100%;
      overflow: hidden;

      &-parent {
        width: 100%;
      }

      &-child {
        position: absolute;

        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }

          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }

          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }

          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
      }
    }

    .bullshit {
      position: relative;
      float: left;
      width: 100%;
      padding: 0;
      overflow: hidden;

      &-oops {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: $base-color-blue;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }

      &-headline {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        color: #222;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }

      &-info {
        margin-bottom: 30px;
        font-size: 13px;
        line-height: 21px;
        color: $base-color-gray;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }

      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
