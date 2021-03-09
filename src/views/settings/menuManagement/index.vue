<template>
  <div class="menu-management-container">
    <el-alert
      :closable="false"
      title="演示环境仅做基础功能展示，若想实现不同角色的真实菜单配置，需将config/setting.config.js路由加载模式改为all模式，由后端全面接管路由渲染与角色权限控制"
      type="success"
    />
    <el-row>
      <el-col :lg="3" :md="4" :sm="24" :xl="3" :xs="24">
        <el-tree
          :data="roleData"
          :default-expanded-keys="['root']"
          :props="defaultProps"
          node-key="id"
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :lg="21" :md="20" :sm="24" :xl="21" :xs="24">
        <element-query-form>
          <element-query-form-left-panel>
            <el-form inline>
              <el-form-item>
                <el-button icon="el-icon-plus" type="primary" @click="handleAdd('layout')">添加一级菜单</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="handleAdd('menu')">添加菜单</el-button>
                <el-button icon="el-icon-delete" type="danger" @click="handleDelete">删除</el-button>
              </el-form-item>
            </el-form>
          </element-query-form-left-panel>
        </element-query-form>
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :data="list"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          border
          default-expand-all
          row-key="name"
          @select="rowSelect"
          @select-all="selectAll"
          @selection-change="setSelectRows"
        >
          <el-table-column align="center" type="selection" width="55" />
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
import { getList as getRolesList } from '@/api/system/role'
import { doDelete, getList as getRouterList } from '@/api/system/router'
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
    const tableRef = ref(null)
    const selectRows = ref('')
    const { $baseConfirm, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const roleData = ref([])
    const defaultProps = reactive({
      children: 'children',
      label: 'role'
    })
    const setSelectRows = (val) => {
      selectRows.value = val
    }
    const queryForm = reactive({
      role: ''
    })
    const list = ref([])
    const listLoading = ref(true)
    const handleDelete = (row) => {
      if (row.name) {
        let names = row.name
        if (row.children) {
          row.children.forEach((value) => {
            names = names + ',' + value.name
          })
          $baseConfirm('删除父级菜单会同时删除子菜单，你确定要删除当前项吗', '提示', async() => {
            await doDelete({ names: names })
            await fetchData()
          })
        } else {
          $baseConfirm('你确定要删除当前项吗', '提示', async() => {
            await doDelete({ names: names })
            await fetchData()
          })
        }
      } else {
        if (selectRows.value.length > 0) {
          let names = selectRows.value.map((item) => item.name).join()
          selectRows.value.map((item) => {
            if (item.children && item.children.length > 0) {
              item.children.forEach((value) => {
                names = names + ',' + value.name
              })
            }
          })
          $baseConfirm('你确定要删除选中项吗', '提示', async() => {
            await doDelete({ names: names })
            await fetchData()
          })
        } else {
          $baseMessage('未选中任何行', 'error', false, 'element-hey-message-error')
          return false
        }
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
    const rowSelect = (selection, row) => {
      if (!row) return
      if (row.children) {
        if (!row.isChecked) {
          row.children.map((item) => {
            tableRef.value.toggleRowSelection(item, true) // 切换该子节点选中状态
            /*
            方法名                    说明                                      参数
                                 用于多选表格，切换某一行的选中状态，         row, selected
            toggleRowSelection   如果使用了第二个参数，则是设置这一行
                                 选中与否（selected 为 true 则选中）
             */
            item.isChecked = true
          })
          row.isChecked = true // 当前行isChecked标志元素切换为false
        } else {
          row.children.map((item) => {
            tableRef.value.toggleRowSelection(item, false) // 切换该子节点选中状态
            item.isChecked = false
          })
          row.isChecked = false // 当前行isChecked标志元素切换为false
        }
      }
    }
    const selectAll = () => {
      tableRef.value.data.map((items) => {
        if (items.children) {
          if (!items.isChecked) { // 若遍历出来的行未选中
            tableRef.value.toggleRowSelection(items, true) // 行变为选中状态
            items.isChecked = true // 更新标志参数
            items.children.map((item) => { // 遍历子节点并改变状态与标志参数
              tableRef.value.toggleRowSelection(item, true)
              item.isChecked = true
            })
          } else { // 选中状态同理
            tableRef.value.toggleRowSelection(items, false)
            items.isChecked = false
            items.children.map((item) => {
              tableRef.value.toggleRowSelection(item, false)
              item.isChecked = false
            })
          }
        } else {
          items.isChecked = !items.isChecked
        }
      })
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
      tableRef,
      roleData,
      defaultProps,
      list,
      listLoading,
      rowSelect,
      selectAll,
      fetchData,
      handleDelete,
      handleEdit,
      handleAdd,
      setSelectRows,
      handleNodeClick
    }
  }
}
</script>

<style scoped>

</style>
