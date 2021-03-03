<template>
  <div class="menu-management-container">
    <el-alert
      :closable="false"
      title="演示环境仅做基础功能展示，若想实现不同角色的真实菜单配置，需将config/setting.config.js路由加载模式改为all模式，由后端全面接管路由渲染与角色权限控制"
      type="success"
    />
    <el-row>
      <el-col :lg="3" :md="8" :sm="24" :xl="3" :xs="24">
        <el-tree
          :data="roleData"
          :default-expanded-keys="['root']"
          :props="defaultProps"
          node-key="id"
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :lg="21" :md="16" :sm="24" :xl="21" :xs="24">
        <element-query-form>
          <element-query-form-top-panel :span="12">
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('layout')">添加一级菜单</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('menu')">添加菜单</el-button>
          </element-query-form-top-panel>
        </element-query-form>
        <el-table
          v-loading="listLoading"
          :data="list"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          border
          default-expand-all
          row-key="path"
          @node-click="handleNodeClick"
        >
          <el-table-column
            align="left"
            label="标题"
            prop="meta.title"
            width="220"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="name"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="路径"
            prop="path"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="是否隐藏"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span>
                {{ row.hidden ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否一直显示当前节点"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span>
                {{ row.alwaysShow ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="vue文件路径"
            prop="component"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="重定向"
            prop="redirect"
            show-overflow-tooltip
          />
          <el-table-column align="center" label="图标" show-overflow-tooltip>
            <template #default="{ row }">
              <span v-if="row.meta">
                <svg-icon v-if="row.meta.icon" :icon-class="row.meta.icon" />
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否固定"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span v-if="row.meta">{{ row.meta.affix ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否无缓存"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span v-if="row.meta">{{ row.meta.noKeepAlive ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="badge" show-overflow-tooltip>
            <template #default="{ row }">
              <span v-if="row.meta">{{ row.meta.badge }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="140"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleAdd(row)">增加</el-button>
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
          <template #empty>
            <el-image
              :src="require('@/assets/empty_images/data_empty.png')"
              class="element-data-empty"
            />
          </template>
        </el-table>
      </el-col>
    </el-row>
    <menu-management-edit ref="editRef" @fetch-data="fetchData"/>
    <menu-management-add ref="addRef" @fetch-data="fetchData"/>
  </div>
</template>

<script>
import { getCurrentInstance, onActivated, onMounted, reactive, ref } from 'vue'
import { getRolesList, getRouterList, deleteRouter } from '@/api/system'
import MenuManagementEdit from './components/edit'
import MenuManagementAdd from './components/add'
export default {
  name: 'MenuManagement',
  components: {
    MenuManagementEdit,
    MenuManagementAdd
  },
  setup() {
    const editRef = ref(null)
    const addRef = ref(null)
    const { $baseConfirm, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const roleData = ref([])
    const defaultProps = reactive({
      children: 'children',
      label: 'role'
    })
    const queryForm = reactive({
      role: ''
    })
    const list = ref([])
    const listLoading = ref(true)
    const handleDelete = (row) => {
      let names = ''
      if (row.children) {
        names = row.name + ',' + row.children.map((item) => item.name).join()
      } else {
        names = row.name
      }
      if (names) {
        $baseConfirm('你确定要删除当前项吗', '提示', async() => {
          const { message } = await deleteRouter({ names: names })
          $baseMessage(message, 'success', false, 'element-hey-message-success')
          await fetchData()
        })
      }
    }
    const handleAdd = (type) => {
      addRef.value.open(type)
    }
    const handleEdit = (row) => {
      editRef.value.open(row)
    }
    const handleNodeClick = (item) => {
      queryForm.role = item.role
      if (!item.children) {
        fetchData()
      } else if (item.children.length === 0) {
        fetchData()
      }
    }
    const fetchData = async() => {
      listLoading.value = true
      const { data } = await getRouterList(queryForm)
      list.value = data
      listLoading.value = false
    }
    onActivated(() => {
      fetchData()
    })
    onMounted(async() => {
      const { data } = await getRolesList()
      roleData.value = data
      await fetchData()
    })
    return {
      addRef,
      editRef,
      roleData,
      defaultProps,
      list,
      listLoading,
      fetchData,
      handleDelete,
      handleEdit,
      handleAdd,
      handleNodeClick
    }
  }
}
</script>

<style scoped>

</style>
