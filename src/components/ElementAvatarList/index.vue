<template>
  <div class="element-avatar-list">
    <el-tooltip
      v-for="(item, index) in avatarList"
      :key="index"
      :content="item.username"
      effect="dark"
      placement="top-start"
    >
      <el-avatar :src="item.avatar" @click="openHomePage(item)"/>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ElementAvatarList',
  props: {
    avatarList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const openHomePage = (item) => {
      window.open(item.homepage)
    }
    return {
      openHomePage
    }
  }
}
</script>

<style lang="scss" scoped>
.element-avatar-list {
  ::v-deep {
    .el-avatar {
      display: inline-block;
      margin-left: -15px;
      cursor: pointer;
      border: 3px solid $base-color-white;
    }
  }
}
</style>
