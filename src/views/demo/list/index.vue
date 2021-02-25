<template>
  <div class="list-container">
    <element-query-form>
      <element-query-form-top-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.title"
              clearable
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </element-query-form-top-panel>
    </element-query-form>
    <ul v-loading="listLoading">
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="list-item-meta">
          <div class="list-item-meta-avatar">
            <el-image :src="item.img" />
          </div>
          <div class="list-item-meta-content">
            <div class="list-item-meta-title">
              {{ item.title }}
            </div>
            <div class="list-item-meta-description">
              {{ item.description }}
            </div>
          </div>
          <div class="list-item-meta-content">
            <div class="list-item-meta-item">
              <span>时间</span>
              <p>{{ item.datetime }}</p>
            </div>
          </div>
          <div class="list-item-meta-content">
            <el-progress :percentage="item.percentage" />
          </div>
        </div>
      </li>
    </ul>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="device === 'mobile'? 'total, prev, next' : 'total, sizes, prev, pager, next, jumper' "
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'

export default {
  name: 'List',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const list = ref([])
    const listLoading = ref(true)
    const total = ref(0)
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 10,
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
    const queryData = () => {
      queryForm.pageNo = 1
      fetchData()
    }
    const fetchData = async() => {
      listLoading.value = true
      const { data, totalCount } = await getList(queryForm)
      list.value = data
      total.value = totalCount
      listLoading.value = false
    }
    onMounted(() => {
      fetchData()
    })
    return {
      listLoading,
      list,
      total,
      device,
      queryForm,
      handleSizeChange,
      handleCurrentChange,
      queryData
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    outline: none;

    .list-item {
      padding: $base-padding;
      border-bottom: 1px solid $base-border-color;

      &-meta {
        display: flex;
        flex: 1 1;
        align-items: flex-start;

        &-avatar {
          margin-right: 16px;

          ::v-deep {
            .el-image {
              width: 61px;
              height: 61px;
            }
          }
        }

        &-content {
          flex: 1 0;
          width: 0;
          color: rgba(0, 0, 0, 0.85);
        }

        &-title {
          margin-top: 11px;
          margin-bottom: 4px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }

        &-description {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
        }

        &-item {
          display: inline-block;
          height: 61px;
          margin-left: 40px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          vertical-align: middle;

          > span {
            line-height: 30px;
          }

          > p {
            margin-top: 4px;
            margin-bottom: 0;
          }
        }

        ::v-deep {
          .el-progress {
            margin-top: 21px;
          }
        }
      }
    }
  }
}
</style>
