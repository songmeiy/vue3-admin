<template>
  <div class="icon-selector-container">
    <el-popover popper-class="icon-selector-popper" trigger="click" width="292">
      <template #reference>
        <el-button>
          <el-input v-model="icon">
            <template #append>
              <svg-icon :icon-class="icon" />
            </template>
          </el-input>
          <svg-icon icon-class="arrow-down-s-line" />
        </el-button>
      </template>
      <element-icon-selector @handle-icon="handleIcon" />
    </el-popover>
  </div>
</template>

<script>
import ElementIconSelector from '@/components/ElementIconSelector'

export default {
  name: 'IconSelector',
  components: { ElementIconSelector },
  data() {
    return {
      icon: 'bug'
    }
  },
  methods: {
    handleIcon(item) {
      this.icon = item
    }
  }
}
</script>
