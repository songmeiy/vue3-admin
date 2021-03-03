<template>
  <div class="icon-selector">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :inline="true" label-width="0">
          <el-row>
            <el-col :span="17">
              <el-form-item label="">
                <el-input v-model="queryForm.title" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label-width="0">
                <el-button native-type="submit" type="primary" @click="queryData">
                  {{ translate('layout', '查询') }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col v-for="(item, index) in queryIcon" :key="index" :span="6">
        <el-card shadow="hover" @click="handleIcon(item)">
          <svg-icon v-if="element === 'svg'" :icon-class="item" />
          <i v-else :class="item"></i>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-pagination
          :current-page="queryForm.pageNo"
          :layout="layout"
          :page-size="queryForm.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIconList } from '@/api/icon'
import { reactive, ref, onMounted } from 'vue'
import { translate } from '@/utils/i18n'

export default {
  name: 'ElementIconSelector',
  props: {
    element: {
      type: String,
      default: 'svg'
    }
  },
  emits: ['handle-icon'],
  setup(props, { emit }) {
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 16,
      title: ''
    })
    const queryIcon = ref([])
    const queryResult = ref([]) // 全部icon，缓存一下，前端进行分页操作
    const layout = ref('total, prev, next')
    const icon = ref('24-hours-fill')
    const total = ref(0)
    const background = true
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
      let icons = []
      if (queryResult.value.length === 0) {
        const { data } = await getIconList({ item: props.element })
        queryResult.value = data
      }
      if (queryForm.title) {
        queryResult.value.forEach((key) => {
          if (key.indexOf(queryForm.title) !== -1) {
            icons.push(key)
          }
        })
      } else {
        icons = queryResult.value
      }
      total.value = icons.length
      queryIcon.value = icons.slice((queryForm.pageNo - 1) * queryForm.pageSize, queryForm.pageNo * queryForm.pageSize)
    }
    const handleIcon = (item) => {
      icon.value = item
      emit('handle-icon', item)
    }
    onMounted(() => {
      fetchData()
    })
    return {
      total,
      layout,
      queryForm,
      queryIcon,
      background,
      handleSizeChange,
      handleIcon,
      handleCurrentChange,
      queryData,
      translate
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-selector {
  width: 250px;
  border: solid 1px #eee;
  border-radius: 5px;
  .el-row {
    margin: 0!important;
    :deep {
      .el-col {
        padding-left: 2px!important;
        padding-right: 2px!important;
        .el-card {
          margin: 0;
          .el-card__body {
            padding: 10px;
            svg {
              width: 2.5em;
            }
          }
        }
        .el-form {
          .el-row {
            .el-col {
              .el-form-item {
                margin-top: 5px;
                margin-bottom: 5px;
              }
            }
          }
        }
        .el-pagination {
          margin-top: 0;
        }
      }
    }
  }
}
.icon-selector-popper {
  .el-card__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20px;
    cursor: pointer;

    i {
      font-size: 28px;
      color: $base-color-gray;
      text-align: center;
      vertical-align: middle;
      pointer-events: none;
      cursor: pointer;
    }
  }
}
</style>
