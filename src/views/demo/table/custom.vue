<template>
  <div class="custom-table-container">
    <element-query-form>
      <element-query-form-left-panel>
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          label-width="0"
          @submit.native.prevent
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
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
              添加
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
      <element-query-form-right-panel>
        <div class="stripe-panel">
          <el-checkbox v-model="stripe">斑马纹</el-checkbox>
        </div>
        <div class="border-panel">
          <el-checkbox v-model="border">边框（可拉伸列）</el-checkbox>
        </div>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <el-radio-group v-model="lineHeight">
            <el-radio label="medium">大</el-radio>
            <el-radio label="small">中</el-radio>
            <el-radio label="mini">小</el-radio>
          </el-radio-group>
          <template #reference>
            <el-button
              style="margin: 0 10px 10px 0 !important"
              plain
              type="primary"
            >
              <svg-icon icon="line-height" />表格尺寸
            </el-button>
          </template>
        </el-popover>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(item, index) in columns"
              :key="item + index"
              :disabled="item.disableCheck === true"
              :label="item.label"
            >
              <svg-icon icon="drag-drop-line" />
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
          <template #reference>
            <el-button
              style="margin: 0 0 10px 0 !important"
              icon="el-icon-setting"
              plain
              type="primary"
            >
              可拖拽列设置
            </el-button>
          </template>
        </el-popover>
      </element-query-form-right-panel>
    </element-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :border="border"
      :stripe="stripe"
      :size="lineHeight"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
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
        v-for="(item, index) in finallyColumns"
        :key="index"
        :label="item.label"
        :sortable="item.sortable"
        :width="item.width"
        align="center"
      >
        <template #default="{ row }">
          <span v-if="item.label === '评级'">
            <el-rate v-model="row.rate" disabled />
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="85"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-image :src="require('@/assets/empty_images/data_empty.png')" class="element-data-empty" />
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
    <table-edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script>
import { doDelete, getList } from '@/api/table'
import TableEdit from './components/TableEdit'
import { computed, getCurrentInstance, onActivated, onMounted, reactive, ref } from 'vue'
export default {
  name: 'CustomTable',
  components: {
    TableEdit
  },
  setup() {
    const { $baseConfirm, $baseMessage, $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const border = ref(true)
    const stripe = ref(false)
    const lineHeight = ref('medium')
    const checkList = ref(['标题', '作者', '评级', '点击量', '时间'])
    const columns = ref([
      {
        label: '标题',
        width: 'auto',
        prop: 'title',
        sortable: true,
        disableCheck: true
      },
      {
        label: '作者',
        width: 'auto',
        prop: 'author',
        sortable: true
      },
      {
        label: '评级',
        width: 'auto',
        prop: 'rate',
        sortable: true
      },
      {
        label: '点击量',
        width: 'auto',
        prop: 'pageViews',
        sortable: true
      },
      {
        label: '时间',
        width: 'auto',
        prop: 'datetime',
        sortable: true
      }
    ])
    const list = ref([])
    const imageList = ref([])
    const listLoading = ref(true)
    const total = ref(0)
    const selectRows = ref('')
    const editRef = ref(null)
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 20,
      title: ''
    })
    const finallyColumns = computed(() => {
      return columns.value.filter((item) =>
        checkList.value.includes(item.label)
      )
    })
    const setSelectRows = (val) => {
      selectRows.value = val
    }
    const handleAdd = () => {
      editRef.value.showEdit()
    }
    const handleEdit = (row) => {
      editRef.value.showEdit(row)
    }
    const handleDelete = (row) => {
      if (row.id) {
        $baseConfirm('你确定要删除当前项吗', '提示', async() => {
          const { message } = await doDelete({ ids: row.id })
          $baseMessage(message, 'success', false, 'element-hey-message-success')
          await fetchData()
        })
      } else {
        if (selectRows.value.length > 0) {
          const ids = selectRows.value.map((item) => item.id).join()
          $baseConfirm('你确定要删除选中项吗', '提示', async() => {
            const { message } = await doDelete({ ids: ids })
            $baseMessage(message, 'success', false, 'element-hey-message-success')
            await fetchData()
          })
        } else {
          $baseMessage('未选中任何行', 'error', false, 'element-hey-message-error')
          return false
        }
      }
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
    const fetchData = async() => {
      listLoading.value = true
      const { data, totalCount } = await getList(queryForm)
      list.value = data
      data.forEach((item) => {
        imageList.value.push(item.img)
      })
      total.value = totalCount
      listLoading.value = false
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(() => {
      fetchData()
    })
    return {
      border,
      stripe,
      device,
      lineHeight,
      columns,
      checkList,
      list,
      imageList,
      listLoading,
      total,
      selectRows,
      queryForm,
      editRef,
      fetchData,
      finallyColumns,
      setSelectRows,
      handleAdd,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      handleQuery
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-table-container {
  ::v-deep {
    i {
      cursor: pointer;
    }
  }
  .stripe-panel,
  .border-panel {
    margin: 0 10px $base-margin/2 10px !important;
  }
}
</style>
<style lang="scss">
.custom-table-checkbox {
  .el-checkbox {
    display: block !important;
    margin: 8px 0 8px 10px;
  }
}
</style>
