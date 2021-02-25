<template>
  <div class="icon-container">
    <el-form :inline="true" label-width="0" @submit.native.prevent>
      <el-form-item >
        <el-input v-model="queryForm.title" :placeholder="translate('component', '图标名称')"/>
        <el-button
          icon="el-icon-search"
          native-type="submit"
          type="primary"
          @click="queryData"
        >{{ translate('component', '查询') }}</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in queryIcon"
        :key="index"
        :lg="2"
        :md="3"
        :sm="8"
        :xl="2"
        :xs="6"
      >
        <el-card shadow="hover" @click.native="handleCopyIcon(item, $event)">
          <SvgIcon :iconClass="item" />
        </el-card>
        <div class="icon-text" @click="handleCopyText(item, $event)">
          {{ item }}
        </div>
      </el-col>

      <el-col :span="24">
        <el-pagination
          :current-page="queryForm.pageNo"
          :layout="device === 'mobile'? 'total, prev, next' : 'total, sizes, prev, pager, next, jumper' "
          :page-size="queryForm.pageSize"
          :page-sizes="[36 ,72, 144, 216, 288]"
          :total="total"
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIconList } from '@/api/icon'
import clip from '@/utils/clipboard'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { translate } from '@/utils/i18n'
export default {
  name: 'Svgs',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const total = ref(0)
    const queryIcon = ref([])
    const queryResult = ref([])
    const queryForm = reactive({
      pageNo: 1,
      pageSize: 72,
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
      let icons = []
      if (queryResult.value.length === 0) {
        const { data } = await getIconList({ item: 'svg' })
        queryResult.value = data
        total.value = data.length
      }
      if (queryForm.title) {
        queryResult.value.forEach(key => {
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
    const handleCopyText = (item, event) => {
      clip(item, event)
    }
    const handleCopyIcon = (item, event) => {
      clip(`<SvgIcon :iconClass="'${item}'" />`, event)
    }
    onMounted(() => {
      fetchData()
    })
    return {
      total,
      device,
      queryIcon,
      queryForm,
      translate,
      queryData,
      handleCopyIcon,
      handleCopyText,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-container {
  :deep {
    .el-form-item {
      width: 100%;
      text-align: right;
    }
    .el-input {
      width: 180px;
    }
    .el-card__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60px;
      max-height: 60px;
      padding: $base-padding/1.4;
      cursor: pointer;
      svg {
        font-size: 25px;
      }
      i {
        font-size: 28px;
        color: $base-color-gray;
        text-align: center;
        pointer-events: none;
        cursor: pointer;
        transition: $base-transition;
      }

      &::after {
        position: absolute;
        bottom: -30px;
        width: 100%;
        padding: 4px 0;
        font-size: $base-font-size-small;
        color: rgb(255, 255, 255);
        text-align: center;
        content: '点击复制';
        background-color: $base-color-blue;
        transition: $base-transition;
      }

      &:hover {
        i {
          margin-top: -($base-margin / 1.2);
        }

        &::after {
          bottom: 0;
        }
      }
    }
  }

  .icon-text {
    height: 30px;
    margin-top: -15px;
    overflow: hidden;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
