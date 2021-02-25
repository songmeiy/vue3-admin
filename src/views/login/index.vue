<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ system.websiteTitle }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          :placeholder="translate('login', '用户名')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="translate('login', '密码')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="tips">
        <router-link to="/register">{{ translate('login', '注册账号') }}</router-link>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ translate('login', '登录') }}</el-button>
      <div class="language">
        <element-language />
      </div>
    </el-form>
  </div>
</template>

<script>

import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { translate } from '@/utils/i18n'

export default {
  name: 'Login',
  setup() {
    const { $router, $store } = getCurrentInstance().appContext.config.globalProperties
    const system = computed(() => $store.state.settings.system)
    const $route = useRoute()
    const passwordType = ref('password')
    const capsTooltip = ref(false)
    const loading = ref(false)
    const redirect = ref(undefined)
    const otherQuery = ref({})
    const usernameRef = ref(null)
    const passwordRef = ref(null)
    const loginFormRef = ref(null)
    const loginForm = reactive({
      username: 'admin',
      password: '111111'
    })
    const loginRules = reactive({
      username: [{ required: true, message: translate('login', '用户名不能为空'), trigger: 'blur' }],
      password: [{ required: true, message: translate('login', '密码不能为空'), trigger: 'blur' }]
    })
    const checkCapslock = (e) => {
      const { key } = e
      capsTooltip.value = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    }
    const showPwd = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      passwordRef.value.focus()
    }
    const handleLogin = () => {
      loginFormRef.value.validate(async(valid) => {
        if (!valid) return
        loading.value = true
        await $store.dispatch('user/login', loginForm)
        $router.push({ path: redirect.value || '/', query: otherQuery.value })
        loading.value = false
      })
    }
    const getOtherQuery = (query) => {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    onMounted(() => {
      if (loginForm.username === '') {
        usernameRef.value.focus()
      } else if (loginForm.password === '') {
        passwordRef.value.focus()
      }
    })
    watch(() => $route.path, () => {
      const query = $route.query
      if (query) {
        redirect.value = query.redirect
        otherQuery.value = getOtherQuery(query)
      }
    })

    return {
      system,
      loading,
      loginForm,
      passwordType,
      loginRules,
      usernameRef,
      passwordRef,
      capsTooltip,
      loginFormRef,
      checkCapslock,
      showPwd,
      handleLogin,
      translate
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .language{
    color: white;
    position: relative;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    width: 320px;
    max-width: 320px;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    text-align: right;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
