<template>
  <div class="roles-management-container">
    <el-form
      ref="form"
      :inline="true"
      :model="queryForm"
      label-width="0"
    >
      <el-form-item class="query-input">
        <el-input v-model="queryForm.role" :placeholder="translate('role', '角色名称')" />
      </el-form-item>
      <el-form-item>
        <el-button
          :icon="device === 'mobile' ? '' : 'el-icon-search'"
          type="primary"
          :size="device === 'mobile' ? 'mini' : 'small'"
          @click="handleQuery"
        >{{ translate('role', '查询') }}</el-button>
        <el-button
          :icon="device === 'mobile' ? '' : 'el-icon-delete'"
          type="danger"
          :size="device === 'mobile' ? 'mini' : 'small'"
          @click="handleDelete"
        >{{ translate('role', '删除') }}</el-button>
        <el-button
          :icon="device === 'mobile' ? '' : 'el-icon-plus'"
          type="primary"
          :size="device === 'mobile' ? 'mini' : 'small'"
          @click="handleAdd('group')"
        >{{ translate('role', '添加组') }}</el-button>
        <el-button
          :icon="device === 'mobile' ? '' : 'el-icon-plus'"
          type="primary"
          :size="device === 'mobile' ? 'mini' : 'small'"
          @click="handleAdd('role')"
        >{{ translate('role', '添加') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="tableData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      default-expand-all
      row-key="role"
      @select="handleRowSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="center"
        :label="translate('role', 'ID')"
        prop="id"
        show-overflow-tooltip
        width="55"
      />
      <el-table-column
        align="left"
        :label="translate('role', '角色名称')"
        show-overflow-tooltip
        width="auto"
      >
        <template v-if="device !== 'mobile'" #default="{ row }">
          <span v-if="!row.edit">{{ row.role }}</span>
          <el-form v-else ref="formRef" :model="editRow" :rules="formRules">
            <el-form-item prop="role">
              <el-input v-model="editRow.role"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else #default="{ row }">
          <span>{{ row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="translate('role', '角色组')"
        show-overflow-tooltip
        width="auto"
      >
        <template v-if="device !== 'mobile'" #default="{ row }">
          <span v-if="!row.edit">{{ row.parentRole }}</span>
          <el-form v-if="row.edit && row.parentRole" ref="formRef" :model="editRow" :rules="formRules">
            <el-form-item prop="parentRole">
              <el-select  v-model="editRow.parentRole">
                <el-option v-for="item in rolesGroup" :key="item.role" :value="item.role" :label="item.role"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <template v-else #default="{ row }">
          <span>{{ row.parentRole }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="auto"
        :label="translate('role', '允许注册')"
      >
        <template #default="{ row }">
          <span v-if="!row.edit && row.parentRole">{{ translate('role' ,row.register ? '是' : '否') }}</span>
          <el-switch v-if="row.edit && row.parentRole" v-model="editRow.register"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="translate('role', '备注')"
        show-overflow-tooltip
        width="auto"
      >
        <template v-if="device !== 'mobile'" #default="{ row }">
          <span v-if="!row.edit">{{ row.label }}</span>
          <el-form v-else ref="formRef" :model="editRow" :rules="formRules">
            <el-form-item prop="label">
              <el-input v-model="editRow.label"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else #default="{ row }">
          <span>{{ row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        width="140px"
        :label="translate('role', '操作')"
      >
        <template #default="{ row }">
          <el-button v-if="!row.edit && row.children" type="text" @click="handleAdd(row)">{{ translate('role', '添加') }}</el-button>
          <el-button v-if="row.edit" type="text" @click="handleSave(row)">{{ translate('role', '保存') }}</el-button>
          <el-button v-if="row.edit" type="text" @click="handleCancel(row)">{{ translate('role', '取消') }}</el-button>
          <el-button v-if="!row.edit"  type="text" @click="handleDelete(row)">{{ translate('role', row.children ? '删除' : '删除') }}</el-button>
          <el-button v-if="!row.edit"  type="text" @click="handleEdit(row)">{{ translate('role', '修改') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="device === 'mobile'? 'total, prev, next' : 'total, sizes, prev, pager, next, jumper' "
      :page-sizes="[5, 10, 30, 50]"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <role-management-edit ref="editRef" @fetch-data="fetchData"></role-management-edit>
    <role-management-add ref="addRef" @fetch-data="fetchData"></role-management-add>
  </div>
</template>

<script>
import RoleManagementEdit from './components/edit'
import RoleManagementAdd from './components/add'
import { computed, getCurrentInstance, onActivated, onMounted, reactive, ref } from 'vue'
import { getList, doDelete, doEdit } from '@/api/system/role'
import { filterRoles } from '@/utils/roles'
import { translate } from '@/utils/i18n'
import { isStartWithCapitalLetter, isStartWithSmallLetter } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
export default {
  name: 'RoleManagement',
  components: {
    RoleManagementEdit,
    RoleManagementAdd
  },
  setup() {
    const { $baseMessage, $baseConfirm, $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const editRef = ref(null)
    const type = ref('')
    const { t } = useI18n()
    const formRef = ref(null)
    const editRow = reactive({
      id: '',
      role: '',
      parenRole: '',
      register: '',
      label: ''
    })
    const formRules = reactive({
      label: [{ required: true, message: t('message.role.请输入备注'), trigger: 'change' }],
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
    const addRef = ref(null)
    const tableRef = ref(null)
    const selectRows = ref([])
    const rolesGroup = ref([])
    const total = ref(0)
    const listLoading = ref(true)
    const queryForm = reactive({
      role: '',
      pageNo: 1,
      pageSize: 5
    })
    const tableData = ref([])
    const fetchData = async() => {
      listLoading.value = true
      const { data, totalCount } = await getList(queryForm)
      tableData.value = await filterRoles(data)
      total.value = totalCount
      listLoading.value = false
    }
    const handleDelete = (row) => {
      if (row.role) {
        let roles = row.role
        if (row.children && row.children.length > 0) {
          row.children.forEach((value) => {
            roles = roles + ',' + value.role
          })
          $baseConfirm('message.role.删除角色组将会同时删除子角色，及路由权限中该角色的路由权限，是否确认删除', 'message.role.提示', async() => {
            await doDelete({ roles: roles })
            await fetchData()
          })
        } else {
          $baseConfirm('message.role.你确定要删除当前项吗', 'message.role.提示', async() => {
            await doDelete({ roles: roles })
            await fetchData()
          })
        }
      } else {
        if (selectRows.value.length > 0) {
          let roles = selectRows.value.map((item) => item.role).join()
          selectRows.value.map((item) => {
            if (item.children && item.children.length > 0) {
              item.children.forEach((value) => {
                roles = roles + ',' + value.role
              })
            }
          })
          $baseConfirm('你确定要删除选中项吗', '提示', async() => {
            await doDelete({ roles: roles })
            await fetchData()
          })
        } else {
          $baseMessage('未选中任何行', 'error', false, 'element-hey-message-error')
          return false
        }
      }
    }
    const handleRegister = async(row) => {
      await doEdit(row)
    }
    const handleAdd = (row) => {
      addRef.value.open(row)
    }
    const handleSave = (row) => {
      formRef.value.validate(async(valid) => {
        if (!valid) return
        await doEdit(editRow)
        row.role = editRow.role
        row.label = editRow.label
        row.register = editRow.register
        if (row.parentRole !== editRow.parentRole) {
          await fetchData()
        }
        row.edit = false
      })
    }
    const handleEdit = async(row) => {
      if (device.value === 'mobile') {
        editRef.value.open(row)
      } else {
        const { data } = await getList()
        rolesGroup.value = data.map((role) => {
          if (!role.parentRole) return role
        })
        tableRef.value.data.map((items) => {
          if (items.children && items.children.length > 0) {
            items.edit = false
            items.children.map((item) => {
              item.edit = false
            })
          } else {
            items.edit = false
          }
        })
        type.value = row.parentRole ? 'role' : 'group'
        row.edit = true
        Object.keys(row).forEach((key) => {
          editRow[key] = row[key]
        })
        editRow.originRole = row.role
      }
    }
    const handleCancel = (row) => {
      row.edit = false
    }
    const handleQuery = () => {
      queryForm.pageNo = 1
      fetchData()
    }
    const handleRowSelect = (selection, row) => {
      if (!row) return
      if (row.children) {
        if (!row.isChecked) {
          row.children.map((item) => {
            tableRef.value.toggleRowSelection(item, true) // 切换该子节点选中状态
            item.isChecked = true
          })
          row.isChecked = true // 当前行isChecked标志元素切换为false
        } else {
          row.children.map((item) => {
            tableRef.value.toggleRowSelection(item, false) // 切换该子节点选中状态
            item.isChecked = false
          })
          row.isChecked = false // 当前行isChecked标志元素切换为false
        }
      }
    }
    const handleSelectAll = () => {
      tableRef.value.data.map((items) => {
        if (items.children) {
          if (!items.isChecked) { // 若遍历出来的行未选中
            tableRef.value.toggleRowSelection(items, true) // 行变为选中状态
            items.isChecked = true // 更新标志参数
            items.children.map((item) => { // 遍历子节点并改变状态与标志参数
              tableRef.value.toggleRowSelection(item, true)
              item.isChecked = true
            })
          } else { // 选中状态同理
            tableRef.value.toggleRowSelection(items, false)
            items.isChecked = false
            items.children.map((item) => {
              tableRef.value.toggleRowSelection(item, false)
              item.isChecked = false
            })
          }
        } else {
          items.isChecked = !items.isChecked
        }
      })
    }
    const handleSelectRows = (val) => {
      selectRows.value = val
    }
    const handleSizeChange = (val) => {
      queryForm.pageSize = val
      fetchData()
    }
    const handleCurrentChange = (val) => {
      queryForm.pageNo = val
      fetchData()
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(() => {
      fetchData()
    })
    return {
      total,
      device,
      addRef,
      editRef,
      editRow,
      formRef,
      tableRef,
      tableData,
      queryForm,
      formRules,
      rolesGroup,
      listLoading,
      fetchData,
      translate,
      handleAdd,
      handleSave,
      handleEdit,
      handleQuery,
      handleDelete,
      handleCancel,
      handleRegister,
      handleRowSelect,
      handleSelectAll,
      handleSizeChange,
      handleSelectRows,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.roles-management-container {
  .el-form {
    text-align: right;
  }
}
</style>
