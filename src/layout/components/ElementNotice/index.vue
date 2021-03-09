<template>
  <el-badge v-if="theme.showNotice" :value="badge">
    <el-popover placement="bottom" trigger="hover" width="300">
      <template #reference>
        <svg-icon
          icon-class="notification"
          class="quick-button"
          :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
        />
      </template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="translate('layout', '通知')" name="notice">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span v-html="item.notice" />
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="translate('layout', '邮件')" name="email">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span>{{ item.email }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="notice-clear" @click="handleClearNotice">
        <el-button type="text">
          <svg-icon :icon-class="'close-circle'" />
          {{ translate('layout', '清空消息') }}
        </el-button>
      </div>
    </el-popover>
  </el-badge>
</template>

<script>
import { translate } from '@/utils/i18n'
import { getList } from '@/api/system/notice'
import { computed, onMounted, ref, getCurrentInstance } from 'vue'
export default {
  name: 'ElementNotice',
  setup() {
    const { $store, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const activeName = ref('notice')
    const badge = ref(null)
    const list = ref([])
    const handleClearNotice = () => {
      badge.value = null
      list.value = []
      $baseMessage('清空消息成功', 'success', false, 'element-hey-message-success')
    }
    const fetchData = async() => {
      const { data } = await getList()
      badge.value = data.length === 0 ? null : data.length
      list.value = data
    }
    const handleClick = () => {
      fetchData()
    }
    onMounted(() => {
      if (theme.value.showNotice) fetchData()
    })
    return {
      activeName,
      badge,
      list,
      theme,
      translate,
      handleClick,
      handleClearNotice
    }
  }
}
</script>

<style lang="scss" scoped>
:deep {
  .el-tabs__active-bar {
    min-width: 28px;
  }
}

.notice-list {
  height: 29vh;

  ul {
    padding: 0 15px 0 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 0;

      :deep {
        .el-avatar {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      span {
        margin-left: 10px;
      }
    }
  }
}

.notice-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 0 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  border-top: 1px solid #e8eaec;

  i {
    margin-right: 3px;
  }
}
</style>
