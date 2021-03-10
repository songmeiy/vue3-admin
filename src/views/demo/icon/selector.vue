<template>
  <div class="icon-selector-container">
    <el-popover popper-class="icon-selector-popper" trigger="click" width="292">
      <template #reference>
        <el-button>
          <el-input v-model="icon.svg">
            <template #prepend>
              svg 图标
            </template>
            <template #append>
              <svg-icon :icon-class="icon.svg" />
            </template>
          </el-input>
        </el-button>
      </template>
      <element-icon-selector element="svg" @handle-icon="handleIconSvg" />
    </el-popover>
    <el-popover popper-class="icon-selector-popper" trigger="click" width="292">
      <template #reference>
        <el-button>
          <el-input v-model="icon.element">
            <template #prepend>
              element 图标
            </template>
            <template #append>
              <i :class="icon.element" />
            </template>
          </el-input>
        </el-button>
      </template>
      <element-icon-selector element="element" @handle-icon="handleIconElement" />
    </el-popover>
  </div>
</template>

<script>
import ElementIconSelector from '@/components/ElementIconSelector'
import { reactive } from 'vue'

export default {
  name: 'IconSelector',
  components: { ElementIconSelector },
  setup() {
    const icon = reactive({
      svg: '',
      element: ''
    })
    const handleIconSvg = (item) => {
      icon.svg = item
    }
    const handleIconElement = (item) => {
      icon.element = item
    }
    return {
      icon,
      handleIconSvg,
      handleIconElement
    }
  }
}
</script>
