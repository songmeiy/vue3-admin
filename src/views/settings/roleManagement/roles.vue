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
        align="left"
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
import { getList, doDelete } from '@/api/system/role'
import { filterRoles } from '@/utils/roles'
import { translate } from '@/utils/i18n'
export default {
  name: 'RolesManagement',
  components: {
    RoleManagementEdit,
    RoleManagementAdd
  },
  setup() {
    const { $baseMessage, $baseConfirm, $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const editRef = ref(null)
    const addRef = ref(null)
    const tableRef = ref(null)
    const selectRows = ref('')
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
      queryForm,
      editRef,
      addRef,
      tableRef,
      tableData,
      device,
      listLoading,
      handleDelete,
      handleAdd,
      handleEdit,
      handleQuery,
      fetchData,
      translate,
      rowSelect,
      selectAll,
      setSelectRows,
      handleSizeChange,
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
