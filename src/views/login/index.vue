<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="14" :md="11" :sm="24" :xl="14" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="9" :md="12" :sm="24" :xl="9" :xs="24">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <div class="title">hello !</div>
          <div class="title-tips">
            {{ translate('login', '欢迎来到') }}{{ title }}！
          </div>
          <el-form-item prop="username" style="margin-top: 40px">
            <el-input
              v-model="loginForm.username"
              :placeholder="translate('login', '请输入用户名')"
              tabindex="1"
              type="text"
            >
              <template #prefix><SvgIcon :iconClass="'user'" /></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="passwordRef"
              v-model="loginForm.password"
              :placeholder="translate('login', '请输入密码')"
              :type="passwordType"
              tabindex="2"
            >
              <template #prefix>
                <SvgIcon :iconClass="'lock'" />
              </template>
              <template v-if="passwordType === 'password'" #suffix>
                <SvgIcon
                  class="show-password"
                  :iconClass="'eye-off'"
                  @click="handlePassword"
                />
              </template>
              <template v-else #suffix>
                <SvgIcon
                  class="show-password"
                  :iconClass="'eye'"
                  @click="handlePassword"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
          >
            {{ translate('login', '登录') }}
          </el-button>
          <router-link to="/login">
            <div style="margin-top: 20px">{{ translate('login', '注册') }}</div>
          </router-link>
        </el-form>
      </el-col>
      <el-col :lg="1" :md="1" :sm="24" :xl="1" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { translate } from '@/utils/i18n'
import { reactive, ref, computed, getCurrentInstance } from 'vue'
export default {
  name: 'Login',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const loading = ref(false)
    const passwordType = ref('password')
    const title = computed(() => $store.state.settings.title)
    const loginFormRef = ref(null)
    const passwordRef = ref(null)
    const loginForm = reactive({
      username: 'admin',
      password: '1999.331'
    })
    const rules = reactive({
      username: [
        {
          required: true,
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          trigger: 'blur'
        }
      ]
    })
    const handlePassword = () => {
      passwordType.value === 'password' ? (passwordType.value = '') : (passwordType.value = 'password')
      passwordRef.value.focus()
    }
    const handleLogin = () => {
      loginFormRef.value.validate(async(valid) => {
        if (valid) {
          try {
            loading.value = true
            await $store.dispatch('user/login', loginForm)
          } finally {
            loading.value = false
          }
        } else {
          return false
        }
      })
    }
    return {
      rules,
      title,
      loading,
      loginFormRef,
      passwordRef,
      loginForm,
      passwordType,
      handleLogin,
      translate,
      handlePassword
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url('~@/assets/login_images/background.jpg') center center fixed
  no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  max-width: 100%;
  padding: 4.5vh;
  margin: calc((100vh - 475px) / 2) 5vw 5vw;
  overflow: hidden;
  background: url('~@/assets/login_images/login_form.png');
  background-size: 100% 100%;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: $base-color-white;
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: $base-color-white;
  }

  .login-btn {
    display: inherit;
    width: 100%;
    height: 50px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }

    .forget-passwordword {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-password {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  i {
    position: absolute;
    top: 8px;
    left: 5px;
    z-index: $base-z-index;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    right: 25px;
    left: -35px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 48px;
        padding-left: 35px;
        font-size: $base-font-size-default;
        line-height: 58px;
        background: #f6f4fc;
        border: 0;
      }
    }
  }
}
</style>
