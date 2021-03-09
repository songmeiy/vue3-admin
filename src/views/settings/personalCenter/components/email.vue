<template>
  <div class="create">
    <el-dialog
      :modal="dialogFormVisible"
      :model-value="dialogFormVisible"
      :title="translate('user', '绑定邮箱')"
      :show-close="false"
      :fullscreen="false"
      :before-close="cancel"
      destroy-on-close
    >
      <el-form ref="emailFormRef" :model="emailForm" :rules="emailFormRules" label-width="70px">
        <el-form-item prop="email" :label="translate('user', '邮箱')">
          <el-input v-model="emailForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-button class="btn" type="default" @click='cancel'>{{ translate('user', '取消') }}</el-button>
        <el-button type="primary" :disabled="jumpTime > 0" @click="sendEmail">{{ translate('user', '发送邮件') }} {{jumpTime > 0 ? '( ' + jumpTime + ' )' : '' }}</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { bindingEmailSend } from '@/api/user/email'
import { computed, getCurrentInstance, reactive, ref, onBeforeUnmount } from 'vue'
import { translate } from '@/utils/i18n'
import { isEmail } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
export default {
  name: 'Email',
  setup() {
    const dialogFormVisible = ref(false)
    const { t } = useI18n()
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const userInfo = computed(() => $store.state.user.userInfo)
    const emailForm = reactive({
      email: userInfo.value.email
    })
    const timer = ref(0)
    const jumpTime = ref(0)
    const emailFormRules = reactive({
      email: [
        { required: true, message: translate('user', '请输入邮箱'), trigger: 'blur' },
        {
          validator: async(_rule, value) => {
            if (!isEmail(value)) return Promise.reject(t('message.user.请输入正确的邮箱'))
            return Promise.resolve()
          },
          trigger: 'change'
        }
      ]
    })
    const emailFormRef = ref(null)
    const open = () => {
      dialogFormVisible.value = true
    }
    const cancel = () => {
      dialogFormVisible.value = false
    }
    onBeforeUnmount(() => {
      jumpTime.value = 0
      timer.value = 0
      clearInterval(timer.value)
    })
    const sendEmail = () => {
      jumpTime.value = 60
      emailFormRef.value.validate(async(valid) => {
        if (!valid) return
        await bindingEmailSend(emailForm)
      })
      timer.value = setInterval(() => {
        if (jumpTime.value) {
          jumpTime.value--
        } else {
          clearInterval(timer.value)
        }
      }, 1000)
    }
    return {
      dialogFormVisible,
      emailForm,
      emailFormRules,
      emailFormRef,
      jumpTime,
      sendEmail,
      open,
      cancel,
      translate
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  :deep {
    .el-dialog{
      border-radius: 5px;
      .el-dialog__header{
        border-bottom: solid 2px #eee !important;
      }
      .el-dialog__body{
        padding: 20px 20px !important;
      }
    }
    .el-input-group__prepend {
      width: 120px;
      padding: 0;
      .el-select {
        width: 100%;
      }
    }
    .el-input-group__append {
      width: 40px;
    }
  }
}
</style>
