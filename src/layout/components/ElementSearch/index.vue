<template>
  <span v-if="theme.showSearch">
    <el-tooltip placement="bottom" :effect="theme.themeName === 'white' ? 'dark' : 'light'" :content="translate('layout', '搜索')">
      <SvgIcon
        iconClass="search"
        class="quick-button"
        :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
        @click="openDialog"
      />
  </el-tooltip>
    <el-dialog
      v-model="dialogVisible"
      :model-value="dialogVisible"
      append-to-body
      width="40%"
      :title="translate('layout', '搜索')"
    >
      <el-form :model="queryForm" @submit.native.prevent>
        <el-form-item label-width="0">
          <el-autocomplete
            ref="searchRef"
            v-model="queryForm.searchWord"
            :fetch-suggestions="querySearchAsync"
            select-when-unmatched
            @select="handleSelect"
          >
            <template #prefix><SvgIcon :iconClass="'search'" /></template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue'
import { getList } from '@/api/search'
import { translate } from '@/utils/i18n'
export default {
  name: 'ElementSearch',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const searchRef = ref(null)
    const dialogVisible = ref(false)
    const queryForm = reactive({
      searchWord: ''
    })
    const restaurants = reactive([])
    const state = ref('')
    const timeout = ref(null)
    const theme = computed(() => $store.state.settings.theme)
    const openDialog = () => {
      queryForm.searchWord = ''
      dialogVisible.value = true
    }
    const loadAll = async() => {
      const { data } = await getList()
      restaurants.value = data
    }
    const querySearchAsync = (queryString, cb) => {
      const results = queryString ? restaurants.value.filter(createStateFilter(queryString)) : restaurants.value
      clearTimeout(timeout.value)
      timeout.value = setTimeout(() => {
        cb(results)
      }, 500)
    }
    const createStateFilter = (queryString) => {
      return state.value.includes(queryString.toLowerCase())
    }
    const handleSelect = (item) => {
      if (item.url) {
        window.open(item.url)
      } else {
        window.open(`https://www.baidu.com/s?wd=${item.value}`)
      }
    }
    onMounted(() => {
      if (theme.value.showSearch) loadAll()
    })
    return {
      theme,
      queryForm,
      searchRef,
      dialogVisible,
      openDialog,
      handleSelect,
      translate,
      querySearchAsync
    }
  }
}
</script>
<style lang="scss">
.el-autocomplete {
  width: 100%;
}
</style>
<style lang="scss" scoped>
::v-deep {
  .el-dialog {
    &__header {
      display: none;
      border: 0 !important;
    }

    &__body {
      padding: 0;
      border: 0 !important;
    }

    .el-form-item__content {
      position: relative;

      i {
        position: absolute;
        top: 14px;
        left: $base-margin/1.5;
      }
    }
  }
}
</style>
