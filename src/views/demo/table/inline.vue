<template>
  <div class="inline-edit-table-container">
    <element-query-form>
      <element-query-form-right-panel :span="24">
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
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
            >查询</el-button>
          </el-form-item>
        </el-form>
      </element-query-form-right-panel>
    </element-query-form>
    <el-table v-loading="listLoading" :data="list" border>
      <el-table-column
        align="center"
        show-overflow-tooltip
        type="selection"
        width="55"
      />
      <el-table-column
        align="center"
        label="序号"
        show-overflow-tooltip
        width="95"
      >
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="标题"
        min-width="300px"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" style="width: 300px" />
            <el-button
              class="cancel-btn"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="作者"
        prop="author"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="200"
      >
        <template #default="{ row }">
          <el-button
            v-if="row.edit"
            size="small"
            type="success"
            @click="confirmEdit(row)"
          >
            保存
          </el-button>
          <el-button
            v-else
            icon="el-icon-edit"
            size="small"
            type="primary"
            @click="row.edit = !row.edit"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-image
          :src="require('@/assets/empty_images/data_empty.png')"
          class="vab-data-empty"
        />
      </template>
    </el-table>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="device === 'mobile'? 'total, prev, next' : 'total, sizes, prev, pager, next, jumper' "
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getList, doEdit } from '@/api/demo/table'
import { computed, getCurrentInstance, onActivated, onMounted, reactive, ref } from 'vue'

export default {
  name: 'InlineTable',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const list = ref([])
    const listLoading = ref(true)
    const total = ref(0)
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 20,
      title: ''
    })

    const fetchData = async() => {
      listLoading.value = true
      const { data } = await getList(queryForm)
      list.value = data.map((v) => {
        v.edit = false
        v.originalTitle = v.title
        return v
      })
      total.value = data.length
      listLoading.value = false
    }
    const handleSizeChange = (val) => {
      queryForm.pageSize = val
      fetchData()
    }
    const handleCurrentChange = (val) => {
      queryForm.pageNo = val
      fetchData()
    }
    const handleQuery = () => {
      queryForm.pageNo = 1
      fetchData()
    }
    const cancelEdit = (row) => {
      row.title = row.originalTitle
      row.edit = false
    }
    const confirmEdit = async(row) => {
      await doEdit(row)
      row.edit = false
      row.originalTitle = row.title
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(() => {
      fetchData()
    })
    return {
      list,
      device,
      total,
      queryForm,
      listLoading,
      cancelEdit,
      confirmEdit,
      handleCurrentChange,
      handleSizeChange,
      handleQuery
    }
  }
}
</script>
