<template>
  <div class="dynamic-meta-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>Query传参</span>
          </template>
          <el-form v-for="(item,index) in queryList" :key="index" label-width="40px">
            <div >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="键">
                    <el-input v-model="item.key"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  label="值">
                    <el-input v-model="item.value"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-button @click="queryAdd">新增</el-button>
          <el-button type="primary" @click="query">Query动态传参</el-button>
        </el-card>
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>Params传参</span>
          </template>
          <el-form v-for="(item,index) in paramList" :key="index" label-width="40px">
            <div >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="键">
                    <el-input v-model="item.key"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  label="值">
                    <el-input v-model="item.value"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-button @click="paramsAdd">新增</el-button>
          <el-button type="primary" @click="params">Params动态传参</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'

export default {
  name: 'DynamicSegmentDemo',
  setup() {
    const queryList = ref([{ key: 'id', value: 'test' }])
    const paramList = ref([{ key: 'id', value: 'test' }])
    const { $router } = getCurrentInstance().appContext.config.globalProperties
    const query = () => {
      const queryForm = {}
      queryList.value.forEach((item) => {
        queryForm[item.key] = item.value
      })
      $router.push({ path: '/demo/segment/query', query: queryForm })
    }
    const queryAdd = () => {
      queryList.value.push({ key: '', value: '' })
    }
    const paramsAdd = () => {
      paramList.value.push({ key: '', value: '' })
    }
    const params = () => {
      const paramForm = {}
      paramList.value.forEach((item) => {
        paramForm[item.key] = item.value
      })
      $router.push({ name: 'DynamicSegmentParam', params: paramForm })
    }
    return {
      queryList,
      paramList,
      queryAdd,
      paramsAdd,
      query,
      params
    }
  }
}
</script>

<style scoped>

</style>
