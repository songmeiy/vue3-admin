<template>
  <div class="roles-management-container">
    <element-query-form>
      <element-query-form-left-panel>
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          label-width="0"
        >
          <el-form-item>
            <el-input v-model="queryForm.role" :placeholder="translate('role', '角色名称')" />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleQuery">{{ translate('role', '查询') }}</el-button>
            <el-button icon="el-icon-delete" type="danger" @click="handleDelete">{{ translate('role', '删除') }}</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('group')">{{ translate('role', '添加组') }}</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('role')">{{ translate('role', '添加角色') }}</el-button>
          </el-form-item>
        </el-form>
      </element-query-form-left-panel>
    </element-query-form>
    <el-table
      ref="tableRef"
      :data="tableData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      default-expand-all
      row-key="role"
      @select="rowSelect"
      @select-all="selectAll"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="left"
        :label="translate('role', '角色名称')"
        prop="role"
        show-overflow-tooltip
        width="auto"
      />
      <el-table-column
        align="center"
        :label="translate('role', '角色组')"
        prop="parentRole"
        show-overflow-tooltip
        width="auto"
      />
      <el-table-column
        align="center"
        :label="translate('role', '备注')"
        prop="label"
        show-overflow-tooltip
        width="auto"
      />
      <el-table-column
        align="center"
        width="140px"
        :label="translate('role', '操作')"
      >
        <template #default="{ row }">
          <el-button v-if="row.children" type="text" @click="handleAdd(row)">{{ translate('role', '添加') }}</el-button>
          <el-button type="text" @click="handleDelete(row)">{{ translate('role', row.children ? '删除' : '删除') }}</el-button>
          <el-button type="text" @click="handleEdit(row)">{{ translate('role', '修改') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="editRef" @fetch-data="fetchData"></edit-dialog>
    <add-dialog ref="addRef" @fetch-data="fetchData"></add-dialog>
  </div>
</template>

<script>
import EditDialog from './components/edit'
import AddDialog from './components/add'
import { getCurrentInstance, onActivated, onMounted, reactive, ref } from 'vue'
import { getRolesList, deleteRole } from '@/api/system'
import { filterRoles } from '@/utils/roles'
import { translate } from '@/utils/i18n'
export default {
  name: 'RolesManagement',
  components: {
    EditDialog,
    AddDialog
  },
  setup() {
    const { $baseMessage, $baseConfirm } = getCurrentInstance().appContext.config.globalProperties
    const editRef = ref(null)
    const addRef = ref(null)
    const tableRef = ref(null)
    const selectRows = ref('')
    const queryForm = reactive({
      role: '',
      pageNo: 1,
      pageSize: 20
    })
    const tableData = ref([])
    const fetchData = async() => {
      const { data } = await getRolesList(queryForm)
      tableData.value = await filterRoles(data)
    }
    const handleDelete = (row) => {
      if (row.role) {
        let roles = row.role
        if (row.children && row.children.length > 0) {
          row.children.forEach((value) => {
            roles = roles + ',' + value.role
          })
          $baseConfirm('message.role.删除角色组将会同时删除子角色，及路由权限中该角色的路由权限，是否确认删除', 'message.role.提示', async() => {
            const { message } = await deleteRole({ roles: roles })
            $baseMessage(message, 'success', false, 'element-hey-message-success')
            await fetchData()
          })
        } else {
          $baseConfirm('message.role.你确定要删除当前项吗', 'message.role.提示', async() => {
            const { message } = await deleteRole({ roles: roles })
            $baseMessage(message, 'success', false, 'element-hey-message-success')
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
            const { message } = await deleteRole({ roles: roles })
            $baseMessage(message, 'success', false, 'element-hey-message-success')
            await fetchData()
          })
        } else {
          $baseMessage('未选中任何行', 'error', false, 'element-hey-message-error')
          return false
        }
      }
    }
    const handleAdd = (row) => {
      addRef.value.open(row)
    }
    const handleEdit = (row) => {
      editRef.value.open(row)
    }
    const handleQuery = () => {
      queryForm.pageNo = 1
      fetchData()
    }
    const rowSelect = (selection, row) => {
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
    const selectAll = () => {
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
    const setSelectRows = (val) => {
      selectRows.value = val
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(() => {
      fetchData()
    })
    return {
      queryForm,
      editRef,
      addRef,
      tableRef,
      tableData,
      handleDelete,
      handleAdd,
      handleEdit,
      handleQuery,
      fetchData,
      translate,
      rowSelect,
      selectAll,
      setSelectRows
    }
  }
}
</script>

<style scoped>

</style>
