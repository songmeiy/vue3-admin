<template>
  <div class="select-excel-container">
    <element-query-form>
      <element-query-form-left-panel>
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="filename" placeholder="请输出要导出文件的名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleDownload">
              导出选中行
            </el-button>
          </el-form-item>
        </el-form>
      </element-query-form-left-panel>
    </element-query-form>

    <el-table
      ref="multipleTableRef"
      v-loading="listLoading"
      :data="list"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template #default="{ row }">
          <el-tag>{{ row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="访问量" width="115">
        <template #default="{ row }">
          {{ row.pageViews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template #default="{ row }">
          <span>{{ row.datetime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/demo/table'
import { getCurrentInstance, onMounted, ref } from 'vue'

export default {
  name: 'ExportSelectedExcel',
  setup() {
    const { $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const list = ref([])
    const listLoading = ref(true)
    const multipleSelection = ref([])
    const downloadLoading = ref(false)
    const filename = ref('')
    const multipleTableRef = ref(null)
    const fetchData = () => {
      listLoading.value = true
      getList().then((response) => {
        list.value = response.data
        listLoading.value = false
      })
    }
    const handleSelectionChange = (val) => {
      multipleSelection.value = val
    }
    const handleDownload = () => {
      if (multipleSelection.value.length) {
        downloadLoading.value = true
        import('@/utils/excel').then((excel) => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageViews', 'datetime']
          const data = formatJson(filterVal, multipleSelection.value)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: filename.value
          })
          multipleTableRef.value.clearSelection()
          downloadLoading.value = false
        })
      } else {
        $baseMessage('请至少选择一行', 'error', false, 'element-hey-message-error')
      }
    }
    const formatJson = (filterVal, jsonData) => {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    }
    onMounted(() => {
      fetchData()
    })
    return {
      list,
      listLoading,
      multipleTableRef,
      multipleSelection,
      downloadLoading,
      filename,
      handleDownload,
      handleSelectionChange
    }
  }
}
</script>
