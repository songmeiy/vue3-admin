<template>
  <div>
    <div class="pay-top-content">
      <svg-icon class="pay-success" icon-class="checkbox-circle-line" />
      <p>支付成功</p>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="pay-bottom"
      label-width="100px"
    >
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
    </el-form>
    <div class="pay-button-group">
      <el-button type="primary" @click="handlePrev">再转一笔</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'Step3',
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
    const form = reactive({
      password: '123456'
    })
    const rules = reactive({
      password: [
        { required: true, message: '请输入支付密码', trigger: 'blur' }
      ]
    })
    const loading = ref(false)
    const handleSubmit = () => {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            emit('change-step', 3)
            this.loading = false
          }, 1000)
        } else {
          this.loading = false
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
      handleSubmit,
      handlePrev
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-top-content {
  text-align: center;

  .pay-success {
    display: block;
    margin: $base-margin auto 5px auto;
    font-size: 40px;
    color: $base-color-green;
  }
}

.pay-bottom {
  padding: $base-padding;
  margin-top: $base-margin;
  background: #f5f7f8;
  border: 1px dashed $base-border-color;
  border-radius: $base-border-radius;
}

.pay-button-group {
  display: block;
  margin: $base-margin auto;
  text-align: center;
}
</style>
