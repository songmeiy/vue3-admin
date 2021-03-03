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
            <el-button
              icon="el-icon-search"
              native-type="submit"
              type="primary"
              @click="handleQuery"
            >{{ translate('role', '查询') }}</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('group')">{{ translate('role', '添加角色组') }}</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('role')">{{ translate('role', '添加角色') }}</el-button>
          </el-form-item>
        </el-form>
      </element-query-form-left-panel>
    </element-query-form>
    <el-table
      :data="tableData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      default-expand-all
      row-key="role"
    >
      <el-table-column
        align="center"
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
        width="auto"
        :label="translate('role', '操作')"
      >
        <template #default="{ row }">
          <el-button v-if="row.children" type="text" @click="handleAdd(row)">{{ translate('role', '添加子角色') }}</el-button>
          <el-button type="text" @click="handleDelete(row)">{{ translate('role', row.children ? '删除角色组' : '删除角色') }}</el-button>
          <el-button type="text" @click="handleEdit(row)">{{ translate('role', '修改角色') }}</el-button>
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
      let ids = ''
      if (row.children) {
        // 删除角色组
        ids = row.id + ',' + row.children.map((item) => item.id).join()
      } else {
        ids = row.id
      }
      $baseConfirm('message.role.你确定要删除当前项吗', 'message.role.提示', async() => {
        const { message } = await deleteRole({ ids: ids })
        $baseMessage(message, 'success', false, 'element-hey-message-success')
        await fetchData()
      })
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
      handleDelete,
      handleAdd,
      handleEdit,
      handleQuery,
      fetchData,
      tableData,
      translate
    }
  }
}
</script>

<style scoped>

</style>
