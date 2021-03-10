<template>
  <div class="add">
    <el-dialog
      :modal="dialogFormVisible"
      :model-value="dialogFormVisible"
      :title="translate('role', title)"
      :show-close="false"
      :fullscreen="false"
      :before-close="close"
      :width="device === 'mobile' ? '100%' : '450px'"
      destroy-on-close
    >
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="130px" label-position="left">
        <el-form-item prop="id" :label="translate('role', 'id')">
          <el-input v-model="addForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="type !== 'group'" :label="translate('role', '角色组')" prop="parentRole">
          <el-select v-model="addForm.parentRole" :disabled="type !== 'role'" >
            <el-option v-for="item in rolesGroup" :key="item.role" :value="item.role" :label="item.role"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="translate('role', type === 'group' ? '角色组名称' : '角色名称')" prop="role">
          <el-input v-model="addForm.role"></el-input>
        </el-form-item>
        <el-form-item v-if="type !== 'group'" :label="translate('role', '允许注册')" prop="parentRole">
          <el-switch v-model="addForm.register"></el-switch>
        </el-form-item>
        <el-form-item :label="translate('role', '备注')" prop="label">
          <el-input v-model="addForm.label"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click='close'>{{ translate('role', '取消') }}</el-button>
        <el-button type="primary" @click='submitForm'>{{ translate('role', '确定') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { translate } from '@/utils/i18n'
import { doAdd, getList } from '@/api/system/role'
import { isStartWithCapitalLetter, isStartWithSmallLetter } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
export default {
  name: 'RoleManagementAdd',
  emits: ['fetch-data'],
  setup(props, { emit }) {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const type = ref('')
    const title = ref('')
    const dialogFormVisible = ref(false)
    const rolesGroup = ref([])
    const addFormRef = ref(null)
    const { t } = useI18n()
    const addForm = reactive({
      id: '',
      label: '',
      parentRole: '',
      role: '',
      register: true
    })
    const addFormRules = reactive({
      label: [{ required: true, message: t('message.role.请输入备注'), trigger: 'blur' }],
      role: [
        { required: true, message: t('message.role.请输入角色名称'), trigger: 'blur' },
        {
          validator: (_rule, value) => {
            if (type.value === 'group') {
              return isStartWithCapitalLetter(value) ? Promise.resolve() : Promise.reject(t('message.role.角色组名称需要为大写字母开头的英文字符串'))
            } else {
              return isStartWithSmallLetter(value) ? Promise.resolve() : Promise.reject(t('message.role.角色名称需要为小写字母开头的英文字符串'))
            }
          },
          trigger: 'change'
        }
      ],
      parentRole: [{ required: true, message: t('message.role.请选择角色组'), trigger: 'blur' }]
    })
    const submitForm = () => {
      addFormRef.value.validate(async(valid) => {
        if (!valid) return
        await doAdd(addForm)
        emit('fetch-data')
        close()
      })
    }
    const open = async(row) => {
      const { data } = await getList()
      rolesGroup.value = data.map((role) => {
        if (!role.parentRole) return role
      })
      if (row === 'group') {
        type.value = 'group'
        title.value = '添加角色组'
      } else if (row === 'role') {
        type.value = 'role'
        title.value = '添加角色'
      } else {
        addForm.parentRole = row.role
        title.value = '添加角色'
      }
      dialogFormVisible.value = true
    }
    const close = () => {
      type.value = ''
      title.value = ''
      addFormRef.value.resetFields()
      dialogFormVisible.value = false
    }
    return {
      type,
      dialogFormVisible,
      device,
      rolesGroup,
      addFormRef,
      title,
      open,
      close,
      translate,
      submitForm,
      addForm,
      addFormRules
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  :deep {
    .el-dialog{
      border-radius: 5px;
      .el-dialog__header{
        border-bottom: solid 2px #eee !important;
        text-align: left;
      }
    }
    .el-dialog__body{
      padding: 20px 20px 0 20px !important;
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
    .el-select {
      width: 100%;
    }
  }
}
</style>
