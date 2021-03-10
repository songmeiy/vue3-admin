<template>
  <div class="tree-table-container">
    <el-alert
      :closable="false"
      title="树形数据与懒加载，当操作有子节点的父节点时会同时选中子节点"
      type="success"
    />
    <element-query-form>
      <element-query-form-left-panel>
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          label-width="0"
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              native-type="submit"
              type="primary"
              @click="handleQuery"
            >
              查询
            </el-button>
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete"
            >
              删除
            </el-button>
          </el-form-item>
        </el-form>
      </element-query-form-left-panel>
    </element-query-form>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="list"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      default-expand-all
      row-key="uuid"
      @select="rowSelect"
      @select-all="selectAll"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="center"
        label="uuid"
        prop="uuid"
        width="auto"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="id"
        prop="id"
        width="auto"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="title"
        prop="title"
        width="auto"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="author"
        prop="author"
        width="auto"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="85"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { doDelete, getList } from '@/api/demo/tree'
export default {
  name: 'TreeTable',
  setup() {
    const { $baseConfirm, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const listLoading = ref(true)
    const list = ref([])
    const tableRef = ref(null)
    const selectRows = ref([])
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 20,
      title: ''
    })
    const rowSelect = (selection, row) => {
      if (!row) return
      if (row.children && row.children.length > 0) {
        if (!row.isChecked) {
          row.children.map((item) => {
            tableRef.value.toggleRowSelection(item, true) // 切换该子节点选中状态
            /*
            方法名                    说明                                      参数
                                 用于多选表格，切换某一行的选中状态，         row, selected
            toggleRowSelection   如果使用了第二个参数，则是设置这一行
                                 选中与否（selected 为 true 则选中）
             */
            item.isChecked = true
          })
          row.isChecked = true // 当前行isChecked标志元素切换为false
        } else {
          row.isChecked = false // 当前行isChecked标志元素切换为false
          row.children.map((item) => {
            tableRef.value.toggleRowSelection(item, false) // 切换该子节点选中状态
            item.isChecked = false
          })
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
    const handleQuery = () => {
      queryForm.pageNo = 1
      fetchData()
    }
    const setSelectRows = (val) => {
      console.log(val)
      selectRows.value = val
    }
    const handleDelete = (row) => {
      if (row.id) {
        let ids = row.id
        if (row.children && row.children.length > 0) {
          row.children.forEach((value) => {
            ids = ids + ',' + value.id
          })
          $baseConfirm('删除此项会同时删除子节点内容', '提示', async() => {
            await doDelete({ ids: ids })
            await fetchData()
          })
        } else {
          $baseConfirm('你确定要删除当前项吗', '提示', async() => {
            await doDelete({ ids: ids })
            await fetchData()
          })
        }
      } else {
        if (selectRows.value.length > 0) {
          let ids = selectRows.value.map((item) => item.id).join()
          selectRows.value.map((item) => {
            if (item.children && item.children.length > 0) {
              item.children.forEach((value) => {
                ids = ids + ',' + value.id
              })
            }
          })
          $baseConfirm('你确定要删除选中项吗', '提示', async() => {
            await doDelete({ ids: ids })
            await fetchData()
          })
        } else {
          $baseMessage('未选中任何行', 'error', false, 'element-hey-message-error')
          return false
        }
      }
    }
    const fetchData = async() => {
      listLoading.value = true
      const { data } = await getList()
      list.value = data
      listLoading.value = false
    }
    onMounted(() => {
      fetchData()
    })
    return {
      list,
      tableRef,
      queryForm,
      listLoading,
      rowSelect,
      selectAll,
      handleDelete,
      setSelectRows,
      handleQuery
    }
  }
}
</script>

<style scoped>

</style>
