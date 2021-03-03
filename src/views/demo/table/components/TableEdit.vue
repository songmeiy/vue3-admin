<template>
  <el-dialog
    :title="title"
    :modal="dialogFormVisible"
    :model-value="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model.trim="form.author" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { doTableEdit } from '@/api/demo'
import { getCurrentInstance, reactive, ref } from 'vue'

export default {
  name: 'TableEdit',
  emits: ['fetchData'],
  setup(props, { emit }) {
    const { $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const form = ref({
      title: '',
      author: ''
    })
    const formRef = ref(null)
    const rules = reactive({
      title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
      author: [{ required: true, trigger: 'blur', message: '请输入作者' }]
    })
    const title = ref('')
    const dialogFormVisible = ref(false)
    const showEdit = (row) => {
      if (!row) {
        title.value = '添加'
      } else {
        title.value = '编辑'
        form.value = Object.assign({}, row)
      }
      dialogFormVisible.value = true
    }
    const close = () => {
      formRef.value.resetFields()
      dialogFormVisible.value = false
    }
    const save = () => {
      formRef.value.validate(async(valid) => {
        if (valid) {
          const { message } = await doTableEdit(form)
          $baseMessage(message, 'success', false, 'element-hey-message-success')
          emit('fetchData')
          close()
        } else {
          return false
        }
      })
    }
    return {
      title,
      form,
      formRef,
      rules,
      dialogFormVisible,
      showEdit,
      save,
      close
    }
  }
}
</script>
