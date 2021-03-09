<template>
  <div class="merge-header-container">
    <element-query-form>
      <element-query-form-top-panel :span="24">
        <el-button
          :loading="downloadLoading"
          type="primary"
          @click="handleDownload"
        >
          导出
        </el-button>
      </element-query-form-top-panel>
    </element-query-form>

    <el-table ref="multipleTable" v-loading="listLoading" :data="list" border>
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Main Information">
        <el-table-column label="Title">
          <template #default="{ row }">
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Author">
          <template #default="{ row }">
            <el-tag>{{ row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Readings">
          <template #default="{ row }">
            {{ row.pageViews }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="Date">
        <template #default="{ row }">
          <span>{{ row.datetime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/demo/table'
import { parseTime } from '@/utils'
import { onMounted, ref } from 'vue'

export default {
  name: 'ExportMergeHeaderExcel',
  setup() {
    const list = ref([])
    const listLoading = ref(true)
    const downloadLoading = ref(false)
    const fetchData = () => {
      listLoading.value = true
      getList().then((response) => {
        list.value = response.data
        listLoading.value = false
      })
    }
    const handleDownload = () => {
      downloadLoading.value = true
      import('@/utils/excel').then((excel) => {
        const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
        const header = ['', 'Title', 'Author', 'Readings', '']
        const filterVal = ['id', 'title', 'author', 'pageViews', 'datetime']
        const data = formatJson(filterVal, list.value)
        const merges = ['A1:A2', 'B1:D1', 'E1:E2']
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data
        })
        downloadLoading.value = false
      })
    }
    const formatJson = (filterVal, jsonData) => {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
    onMounted(() => {
      fetchData()
    })
    return {
      list,
      listLoading,
      downloadLoading,
      handleDownload
    }
  }
}
</script>
