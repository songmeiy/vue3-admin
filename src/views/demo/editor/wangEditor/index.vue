<template>
  <div class="WangEditor">
    <Editor
      v-if="headers"
      ref="editorRef"
      :image-config="imageConfig"
      :initial-setting="initialSetting"
    >
      <template #under-edit-slot>
        <div>
          <el-button size="mini" type="primary" @click="appendText">新增</el-button>
          <el-button size="mini" type="primary" @click="setHtml">重设</el-button>
        </div>
      </template>
    </Editor>
  </div>
</template>

<script>
// config.js在当前目录下的wangEditor的配置文件
import { imageConfig, initialSetting } from './config'
import Editor from '@/components/ElementWangEditor'
import { computed, getCurrentInstance, ref } from 'vue'
import defaultConfig from '@/config'
export default {
  name: 'WangEditor',
  components: {
    Editor
  },
  setup() {
    const editorRef = ref(null)
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const accessToken = computed(() => $store.state.user.accessToken)
    const { tokenName } = defaultConfig
    const headers = ref({})
    headers.value[tokenName] = accessToken.value
    imageConfig.uploadImgHeaders = headers.value
    const appendText = () => {
      editorRef.value.appendText('<p>这里是新增加的内容</p>')
    }
    const setHtml = () => {
      editorRef.value.setHtml('<p>重新设置内容</p>')
    }
    return {
      editorRef,
      headers,
      appendText,
      setHtml,
      imageConfig,
      initialSetting
    }
  }
}
</script>

<style scoped>
.WangEditor{
  padding: 20px 20px;
}
</style>
