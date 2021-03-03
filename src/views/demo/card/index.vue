<template>
  <div class="card-container">
    <element-query-form class="page-header">
      <element-query-form-top-panel :span="24">
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          label-width="60px"
          @submit.native.prevent
        >
          <el-form-item label="区域">
            <el-select v-model="queryForm.area" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="queryForm.datetime"
              placeholder="选择日期时间"
              type="datetime"
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="queryForm.title" placeholder="名称" />
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
      </element-query-form-top-panel>
    </element-query-form>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :lg="8"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <el-card
          :body-style="{ padding: '0px', position: 'static' }"
          shadow="hover"
        >
          <div class="card-img"><img :src="item.img" :alt="item.title"></div>
          <div class="card-title">{{ item.title }}</div>
          <div class="card-description">{{ item.description }}</div>
          <div class="card-datetime">{{ item.datetime }}</div>
        </el-card>
      </el-col>
    </el-row>
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
import { getList } from '@/api/table'
import { computed, getCurrentInstance, onMounted, reactive, ref, onActivated } from 'vue'

export default {
  name: 'Card',
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
      total.value = totalCount
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(() => {
      fetchData()
    })
    return {
      total,
      list,
      device,
      listLoading,
      queryForm,
      handleQuery,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 0 0 $base-padding 0 !important;
  background: $base-color-background !important;

  .page-header {
    display: flex;
    align-items: center;
    padding: $base-padding $base-padding 0 $base-padding;
    margin-bottom: $base-margin;
    background: $base-color-white;
    border: 1px solid #ebeef5;

    ::v-deep {
      .el-form-item__content {
        width: 221px !important;

        .el-select,
        .el-input,
        .el-date-editor,
        .el-checkbox-group {
          width: 100%;
        }
      }
    }
  }

  ::v-deep {
    .el-card {
      &__body {
        position: relative;
        padding: $base-padding;
        cursor: pointer;
        .card-img {
          img {
            width: 100%;
            height: 228px;
          }
        }
        .card-title {
          margin: $base-margin $base-margin 10px $base-margin;
          font-size: 16px;
          font-weight: bold;
        }

        .card-description {
          margin: 0 $base-margin 10px $base-margin;
        }

        .card-datetime {
          margin: 0 $base-margin 10px $base-margin;
          color: rgba($base-color-black, 0.6);
        }
      }
    }

    .el-pagination.is-background {
      .btn-next,
      .btn-prev {
        background-color: $base-color-white;
      }

      .el-pager {
        li {
          background-color: $base-color-white;

          &.active {
            background-color: $base-color-blue;
          }
        }
      }
    }
  }
}
</style>
