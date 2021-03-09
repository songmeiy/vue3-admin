<template>
  <div class="export-excel-container">
    <element-query-form>
      <element-query-form-left-panel :span="24">
        <el-form :inline="true" label-width="80px">
          <el-form-item label="文件名">
            <el-input v-model="filename" placeholder="请输出要导出文件的名称" />
          </el-form-item>
          <el-form-item label="文件类型">
            <el-select v-model="bookType">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="自动列宽">
            <el-radio-group v-model="autoWidth">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleDownload">
              导出 Excel
            </el-button>
          </el-form-item>
        </el-form>
      </element-query-form-left-panel>
    </element-query-form>

    <el-table v-loading="listLoading" :data="list" border>
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
      <el-table-column align="center" label="访问量">
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
import { onMounted, ref } from 'vue'

export default {
  name: 'ExportExcel',
  setup() {
    const list = ref([])
    const listLoading = ref(true)
    const downloadLoading = ref(false)
    const filename = ref('')
    const autoWidth = ref(true)
    const bookType = ref('xlsx')
    const options = ['xlsx', 'csv', 'txt']
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
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageViews', 'datetime']
        const data = formatJson(filterVal, list.value)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: filename.value,
          autoWidth: autoWidth.value,
          bookType: bookType.value
        })
        downloadLoading.value = false
      })
    }
    const formatJson = (filterVal, jsonData) => {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j]
        })
      )
    }
    onMounted(() => {
      fetchData()
    })
    return {
      list,
      bookType,
      options,
      filename,
      autoWidth,
      listLoading,
      downloadLoading,
      handleDownload
    }
  }
}
</script>
