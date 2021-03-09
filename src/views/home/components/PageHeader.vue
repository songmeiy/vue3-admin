<template>
  <el-col :span="24">
    <el-card class="page-header" shadow="never">
      <el-avatar :src="userInfo.avatar" class="page-header-avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
        <p class="page-header-tip-description">{{ description }}</p>
      </div>
      <div class="page-header-avatar-list">
        <element-avatar-list :avatar-list="avatatList" />
        <p>{{ translate('home', '参与开发') }}</p>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import { getList } from '@/api/system/about'
import ElementAvatarList from '@/components/ElementAvatarList'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { translate } from '@/utils/i18n'

export default {
  components: { ElementAvatarList },
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const userInfo = computed(() => $store.state.user.userInfo)
    const description = ref('')
    const avatatList = [
      {
        avatar: 'https://zepingwong.github.io/static/image/20210223153728.jpg',
        homepage: 'https://github.com/zepingwong',
        username: 'zepingwong'
      }
    ]
    const fetchData = async() => {
      const { data } = await getList()
      description.value = data.description
    }
    const handleTips = () => {
      const hour = new Date().getHours()
      return hour < 8
        ? `早上好 ${userInfo.value.username}，又是元气满满的一天。`
        : hour <= 11
          ? `上午好 ${userInfo.value.username}，看到你我好开心。`
          : hour <= 13
            ? `中午好 ${userInfo.value.username}，忙碌了一上午，记得吃午饭哦。`
            : hour < 18
              ? `下午好 ${userInfo.value.username}，你一定有些累了，喝杯咖啡提提神。`
              : `晚上好 ${userInfo.value.username}，愿你天黑有灯，下雨有伞。`
    }
    onMounted(() => {
      fetchData()
    })
    return {
      avatatList,
      userInfo,
      description,
      handleTips,
      translate
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  min-height: 145px;
  transition: $base-transition;

  :deep {
    * {
      transition: $base-transition;
    }

    .el-card__body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &-avatar {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
  }

  &-tip {
    flex: auto;
    width: calc(100% - 200px);
    min-width: 200px;
    text-align: left;
    &-title {
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: bold;
      color: #3c4a54;
    }

    &-description {
      font-size: $base-font-size-default;
      color: #808695;
    }
    .mobile {
      width: 100%;
      height: auto;
    }
  }

  &-avatar-list {
    flex: 1;
    min-width: 100px;
    margin-left: 20px;
    text-align: right;
    p {
      margin-right: 9px;
      line-height: 0;
    }
  }
}
</style>
