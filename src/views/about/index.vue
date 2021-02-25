<template>
  <div class="about-container">
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
        <p>participants</p>
      </div>
    </el-card>
    <el-card class="page-header" shadow="never">
      <div class="page-header-tip">
        <p class="page-header-tip-description">我不是个专业码农，刚刚开始接触Vue3.0，感谢过程中众多大佬和大佬们的代码的帮助，写代码没有bug是不可能的，bug是永远也改不完的，如果你发现了一些问题，那么尽管可以联系我。</p>
        <p class="page-header-tip-description">如果你喜欢我写的东西，或者我的网站给你带来了帮助，那将是我最大的荣幸。</p>
      </div>
    </el-card>
    <el-card class="page-header" shadow="never">
      <div class="page-header-tip">
        <p class="page-header-tip-description">如果你愿意的话，可以请我喝杯奶茶吗？</p>
        <img :class="{ 'mobile': device === 'mobile' }" src="../../assets/20210225.jpg">
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/about'
import ElementAvatarList from '@/components/ElementAvatarList'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

export default {
  name: 'AboutIndex',
  components: { ElementAvatarList },
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const userInfo = computed(() => $store.state.user.userInfo)
    const device = computed(() => $store.state.settings.device)
    const description = ref('')
    const avatatList = [
      {
        avatar: 'https://zepingwong.github.io/image/20210223153728.jpg',
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
      description,
      userInfo,
      device,
      handleTips
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  min-height: 145px;
  transition: $base-transition;

  ::v-deep {
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
