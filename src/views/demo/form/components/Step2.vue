<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="付款账户">
        {{ infoData.payAccount }}
      </el-form-item>
      <el-form-item label="收款账户">
        {{ infoData.gatheringAccount }}
      </el-form-item>
      <el-form-item label="收款人姓名">
        {{ infoData.gatheringName }}
      </el-form-item>
      <el-form-item label="转账金额">
        <strong>￥{{ infoData.price }}元</strong>
      </el-form-item>
      <el-form-item label="支付密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button :loading="loading" type="primary" @click="handleSubmit">
        提交
      </el-button>
      <el-button @click="handlePrev">上一步</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'Step2',
  props: {
    infoData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['change-step'],
  setup(props, { emit }) {
    const formRef = ref(null)
    const loading = ref(false)
    const form = reactive({
      password: '123456'
    })
    const rules = reactive({
      password: [
        { required: true, message: '请输入支付密码', trigger: 'blur' }
      ]
    })
    const handleSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          setTimeout(() => {
            emit('change-step', 3)
            loading.value = false
          }, 2000)
        } else {
          loading.value = false
        }
      })
    }
    const handlePrev = () => {
      emit('change-step', 1)
    }
    return {
      form,
      rules,
      loading,
      formRef,
      handlePrev,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-button-group {
  display: block;
  margin: 20px auto;
  text-align: center;
}
</style>
