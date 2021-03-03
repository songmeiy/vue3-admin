<template>
  <div class="comprehensive-table-container">
    <el-alert
      :closable="false"
      show-icon
      title="三级路由【缓存路由、固定表格高度、并根据窗口大小自适应】的示例"
      type="success"
    />
    <element-query-form>
      <element-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
        <el-button type="primary" @click="handleMessage">
          $baseMessage
        </el-button>
        <el-button type="primary" @click="handleAlert">$baseAlert</el-button>
        <el-button type="primary" @click="handleConfirm">
          $baseConfirm
        </el-button>
        <el-button type="primary" @click="handleNotify">$baseNotify</el-button>
        <el-button type="primary" @click="handleDetail">
          详情页高亮左侧菜单
        </el-button>
      </element-query-form-left-panel>
      <element-query-form-right-panel>
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
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
          </el-form-item>
        </el-form>
      </element-query-form-right-panel>
    </element-query-form>

    <el-table
      ref="tableSortRef"
      v-loading="listLoading"
      :data="list"
      :height="height"
      border
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
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
        prop="title"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="作者"
        prop="author"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="评级">
        <template #default="{ row }">
          <el-rate v-model="row.rate" disabled />
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="row.img"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="点击量"
        prop="pageViews"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        align="center"
        label="开关"
        prop="switch"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-tooltip
            :content="row.switch === 0 ? '点击开启' : '点击关闭'"
            :enterable="false"
            placement="top"
          >
            <el-switch v-model="row.switch" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tooltip
            :content="row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="statusFilter(row.status)">{{ row.status }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="时间"
        prop="datetime"
        show-overflow-tooltip
        width="200"
      />
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
        <el-image
          :src="require('@/assets/empty_images/data_empty.png')"
          class="element-data-empty"
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
    <table-edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script>
import { doDelete, getList } from '@/api/table'
import TableEdit from './components/TableEdit'
import {
  computed,
  getCurrentInstance,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref
} from 'vue'

export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit
  },
  setup() {
    const { $baseTableHeight, $baseConfirm, $baseMessage, $baseAlert, $baseNotify, $router, $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const height = ref($baseTableHeight(2))
    const imgShow = ref(true)
    const list = ref([])
    const imageList = ref([])
    const listLoading = ref(true)
    const total = ref(0)
    const selectRows = ref('')
    const editRef = ref(null)
    const tableSortRef = ref(null)
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 10
    })
    const handleHeight = () => {
      height.value = $baseTableHeight(2)
    }
    const tableSortChange = () => {
      tableSortRef.value.tableData.forEach((item) => {
        imageList.value.push(item.img)
      })
    }
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
    const handleMessage = () => {
      $baseMessage('test1', 'success', false, 'element-hey-message-success')
    }
    const handleAlert = () => {
      $baseAlert('11')
      $baseAlert('11', '自定义标题', () => { /* 可以写回调; */ })
      $baseAlert('11', '提示', () => { /* 可以写回调; */ })
    }
    const handleConfirm = () => {
      $baseConfirm('你确定要执行该操作?', '提示', () => { /* 可以写回调; */ }, () => { /* 可以写回调; */ })
    }
    const handleNotify = () => {
      $baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
    }
    const handleDetail = () => {
      $router.push('/demo/table/detail')
    }
    const statusFilter = (status) => {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(() => {
      fetchData()
    })
    onBeforeMount(() => {
      window.addEventListener('resize', handleHeight)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleHeight)
    })
    return {
      list,
      total,
      editRef,
      imgShow,
      height,
      queryForm,
      listLoading,
      tableSortRef,
      imageList,
      device,
      fetchData,
      handleAdd,
      handleEdit,
      handleQuery,
      handleDelete,
      handleDetail,
      handleNotify,
      statusFilter,
      handleAlert,
      handleMessage,
      setSelectRows,
      handleConfirm,
      tableSortChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>
