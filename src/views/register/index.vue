<template>
  <div class="register-container">
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">
      <div class="language">
        <element-language />
      </div>
      <div class="title-container">
        <h3 class="title">{{ system.websiteTitle }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container"><svg-icon icon-class="user" /></span>
        <el-input v-model="registerForm.username" :placeholder="translate('register', '用户名')" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="passwordOne">
        <span class="svg-container"><svg-icon icon-class="lock" /></span>
        <el-input v-model="registerForm.passwordOne" :placeholder="translate('register', '密码')" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="passwordTwo">
        <span class="svg-container"><svg-icon icon-class="lock" /></span>
        <el-input v-model="registerForm.passwordTwo" :placeholder="translate('register', '确认密码')" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container"><svg-icon icon-class="email" /></span>
        <el-input v-model="registerForm.email" :placeholder="translate('register', '邮箱')" type="text" autocomplete="off" />
      </el-form-item>
      <div class="tips">
        <router-link to="/login">{{ translate('register', '已有账号，登录') }}</router-link>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">{{ translate('register', '注册') }}</el-button>
    </el-form>
  </div>
</template>

<script>

import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { translate } from '@/utils/i18n'
import { isUsername, isPassword, isEmail } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
import { register } from '@/api/user'

export default {
  name: 'Register',
  setup() {
    const { $store, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const system = computed(() => $store.state.settings.system)
    const loading = ref(false)
    const { t } = useI18n()
    const registerFormRef = ref(null)
    const registerForm = reactive({
      username: '',
      password: '',
      passwordOne: '',
      passwordTwo: '',
      email: ''
    })
    const registerRules = reactive({
      username: [
        { required: true, message: translate('register', '用户名不能为空'), trigger: 'blur' },
        {
          validator: (_rule, value) => {
            if (isUsername(value)) return Promise.resolve()
            else return Promise.reject(t('message.register.用户名长度不能小于六位'))
          },
          trigger: 'change'
        }
      ],
      passwordOne: [
        { required: true, message: translate('register', '密码不能为空'), trigger: 'blur' },
        {
          validator: (_rule, value) => {
            if (isPassword(value)) return Promise.resolve()
            else return Promise.reject(t('message.register.密码长度需要大于六位'))
          },
          trigger: 'change'
        }
      ],
      passwordTwo: [
        { required: true, message: translate('register', '确认密码不能为空'), trigger: 'blur' },
        {
          validator: (_rule, value) => {
            if (registerForm.passwordOne === value) return Promise.resolve()
            else return Promise.reject(t('message.register.两次密码不一致'))
          },
          trigger: 'change'
        }
      ],
      email: [
        { required: true, message: translate('register', '邮箱不能为空'), trigger: 'blur' },
        {
          validator: (_rule, value) => {
            if (isEmail(value)) return Promise.resolve()
            else return Promise.reject(t('message.register.邮箱不合法'))
          },
          trigger: 'change'
        }
      ]
    })
    const handleRegister = () => {
      registerFormRef.value.validate(async(valid) => {
        if (!valid) return
        const { message } = await register(registerForm)
        $baseMessage(message, 'success', false, 'element-hey-message-success')
      })
    }
    return {
      system,
      loading,
      registerForm,
      registerRules,
      registerFormRef,
      handleRegister,
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
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
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
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .register-form {
    width: 520px;
    max-width: 100%;
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
