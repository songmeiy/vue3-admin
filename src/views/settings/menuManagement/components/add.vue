<template>
  <div class="add">
    <el-dialog
      :modal="dialogFormVisible"
      :model-value="dialogFormVisible"
      :title="translate('menu', title)"
      :show-close="false"
      :fullscreen="false"
      :before-close="close"
      :width="device === 'mobile' ? '100%' : '60%'"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="menu-form"
        label-width="100px"
        :label-position="device === 'mobile' ? 'top' : 'right'"
      >
        <el-row :gutter="20">
          <el-col :lg="12" :xl="12">
            <el-form-item prop="name">
              <template #label>
                {{ translate('menu', '名称') }}
                <el-tooltip
                  :content="translate('menu', '路由名称为该路由唯一标识，由大写字母开头的英文字符串组成')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item prop="path">
              <template #label>
                {{ translate('menu', '路径') }}
                <el-tooltip
                  :content="translate('menu', '一级菜单路径需要“/”，其他子路由不需要')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-input v-model="form.path" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item :prop="type === 'layout' ? '' : 'parentName'">
              <template #label>
                {{ translate('menu', '父级菜单') }}
                <el-tooltip
                  :content="translate('menu', '子路由建立树状路由标识')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-select v-model="form.parentName" :disabled="type === 'layout' || type === 'menu'">
                <el-option v-for="item in selectName" :key="item" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item prop="component">
              <template #label>
                {{ translate('menu', '组件') }}
                <el-tooltip
                  :content="translate('menu', '该路由对应的页面内容')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-select v-model="form.component" :disabled="type === 'layout'">
                <el-option v-for="item in selectComponents" :key="item.component" :value="item.component" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item prop="redirect">
              <template #label>
                {{ translate('menu', '重定向') }}
                <el-tooltip
                  :content="translate('menu', '重定向路径对应面包屑的路径')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-input v-model="form.redirect" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item prop="title">
              <template #label>
                {{ translate('menu', '标题') }}
                <el-tooltip
                  :content="translate('menu', '导航菜单，标签栏，面包屑对应显示的路由名称')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-input v-model="form.title" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item label="badge" prop="badge">
              <el-input v-model="form.badge" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item prop="roles">
              <template #label>
                {{ translate('menu', '角色权限') }}
                <el-tooltip
                  :content="translate('menu', '开启角色权限时，会对路由功能进行角色限制')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-popover trigger="click" width="300px">
                <template #reference>
                  <el-input v-model="form.roles" />
                </template>
                <el-tree
                  ref="rolesTreeRef"
                  :data="selectRoles"
                  show-checkbox
                  node-key="role"
                  highlight-current
                  :props="defaultProps"
                  @check="handleCheck"
                >
                </el-tree>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xl="12">
            <el-form-item prop="icon">
              <template #label>
                {{ translate('menu', '图标') }}
                <el-tooltip
                  :content="translate('menu', '对应名称前的路由图标，可以选择使用自定义图标或者element图标')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-popover
                popper-class="icon-selector-popper"
                trigger="click"
                width="300"
              >
                <template #reference>
                  <el-input v-model="form.icon">
                    <template #append>
                      <svg-icon v-if="form.isCustomSvg" :iconClass="form.icon"></svg-icon>
                      <i v-else :class="form.icon"></i>
                    </template>
                  </el-input>
                </template>
                <el-tabs v-model="tabName" @tab-click="tabClick">
                  <el-tab-pane :label="translate('menu', '自定义图标')" name="svg">
                    <element-icon-selector element="svg" @handle-icon="handleIcon" />
                  </el-tab-pane>
                  <el-tab-pane :label="translate('menu', 'element图标')" name="elements">
                    <element-icon-selector element="elements" @handle-icon="handleIcon" />
                  </el-tab-pane>
                </el-tabs>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item prop="hidden">
              <template #label>
                {{ translate('menu', '隐藏') }}
                <el-tooltip
                  :content="translate('menu', '隐藏开启时，该路由将不会出现在导航菜单')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-switch v-model="form.hidden" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item prop="affix">
              <template #label>
                {{ translate('menu', '固定') }}
                <el-tooltip
                  :content="translate('menu', '开启标签固定时，该标签固定在标签栏')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-switch v-model="form.affix" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item prop="noKeepAlive">
              <template #label>
                {{ translate('menu', '无缓存') }}
                <el-tooltip
                  :content="translate('menu', '开启无缓存时，页面内容将无法缓存')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-switch v-model="form.noKeepAlive" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item label-width="160px" prop="alwaysShow">
              <template #label>
                {{ translate('menu', '始终显示当前节点') }}
                <el-tooltip
                  :content="translate('menu', '当只有一级子路由时是否显示父路由是否显示在菜单中显示路由')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-switch v-model="form.alwaysShow" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item  label-width="160px" prop="tabHidden">
              <template #label>
                {{ translate('menu', '不显示当前标签页') }}
                <el-tooltip
                  :content="translate('menu', '当前路由是否不显示多标签页')"
                  effect="dark"
                  placement="top"
                >
                  <svg-icon :icon-class="'tips'" />
                </el-tooltip>
              </template>
              <el-switch v-model="form.tabHidden" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ElementIconSelector from '@/components/ElementIconSelector'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { getList as getComponentsList } from '@/api/system/components'
import { getList as getRolesList } from '@/api/system/role'
import { getList as getRouterList, doAdd } from '@/api/system/router'
import { translate } from '@/utils/i18n'
import { isStartWithCapitalLetter } from '@/utils/validate'
import { useI18n } from 'vue-i18n'

export default {
  name: 'MenuManagementAdd',
  components: { ElementIconSelector },
  emits: ['fetch-data'],
  setup(props, { emit }) {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const device = computed(() => $store.state.settings.device)
    const selectComponents = ref('')
    const selectRoles = ref([])
    const selectName = ref([])
    const type = ref('')
    const { t } = useI18n()
    const rolesTreeRef = ref(null)
    const defaultProps = reactive({
      children: 'children',
      label: 'role'
    })
    const tabName = ref('')
    const form = reactive({
      name: '',
      path: '',
      hidden: false,
      alwaysShow: false,
      parentName: '',
      component: '',
      redirect: '',
      affix: false,
      title: '',
      isCustomSvg: false,
      icon: '',
      roles: '',
      badge: '',
      dot: false,
      tabHidden: false,
      dynamicNewTab: false,
      noKeepAlive: false,
      activeMenu: false
    })
    const formRef = ref(null)
    const title = ref('')
    const dialogFormVisible = ref(false)
    const rules = reactive({
      name: [
        { required: true, trigger: 'blur', message: '请输入名称' },
        {
          validator: (_rule, value) => {
            return isStartWithCapitalLetter(value) ? Promise.resolve() : Promise.reject(t('message.menu.菜单名称需要为大写字母开头的英文字符串'))
          }
        }
      ],
      path: [
        { required: true, trigger: 'blur', message: '请输入路径' },
        {
          validator: (_rule, value) => {
            if (type.value === 'layout') {
              const reg = /^[/][A-Za-z]*$/
              return reg.test(value) ? Promise.resolve() : Promise.reject(t('message.menu.一级菜单路径应该以"/"开头'))
            } else {
              const reg = /^[A-Za-z]*$/
              return reg.test(value) ? Promise.resolve() : Promise.reject(t('message.menu.菜单路径为字母开头的英文字符串'))
            }
          }
        }
      ],
      hidden: [{ required: true, trigger: 'blur', message: '请选择是否隐藏该菜单' }],
      alwaysShow: [{ required: true, trigger: 'blur', message: '请选择是否始终显示当前节点' }],
      parentName: [{ required: true, trigger: 'blur', message: '请选择父级菜单' }],
      component: [{ required: true, trigger: 'blur', message: '请选择组件' }],
      redirect: [
        { required: false, trigger: 'blur', message: '请输入重定向路径' },
        {
          validator: (_rule, value) => {
            const reg = /^[/][A-Za-z]*$/
            if (!value) return Promise.resolve()
            return reg.test(value) ? Promise.resolve() : Promise.reject(t('message.menu.菜单重定向路径应该以"/"开头'))
          }
        }
      ],
      affix: [{ required: true, trigger: 'blur', message: '请选择是否固定标签' }],
      title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
      isCustomSvg: [{ required: true, trigger: 'blur', message: '请选择是否使用自定义图标' }],
      icon: [{ required: true, trigger: 'change', message: '请选择图标' }],
      badge: [{ required: false, trigger: 'blur', message: '请输入徽章内容' }],
      roles: [{ required: false, trigger: 'blur', message: '请输入角色权限' }],
      dot: [{ required: true, trigger: 'blur', message: '请选择是否使用dot' }],
      tabHidden: [{ required: true, trigger: 'blur', message: '请选择是否隐藏标签' }],
      dynamicNewTab: [{ required: true, trigger: 'blur', message: '请选择传参是否开启新页面' }],
      noKeepAlive: [{ required: true, trigger: 'blur', message: '请选择是否缓存' }],
      activeMenu: [{ required: true, trigger: 'blur', message: '请选择是否高亮该菜单' }]
    })
    const handleIcon = (item) => {
      form.isCustomSvg = tabName.value === 'svg'
      form.icon = item
    }
    const handleCheck = () => {
      form.roles = rolesTreeRef.value.getCheckedKeys().join()
    }
    const tabClick = (item) => {
      tabName.value = item.props.name
    }
    const open = (row) => {
      if (row === 'layout') {
        type.value = 'layout'
        title.value = '添加一级菜单'
        form.component = 'Layout'
      } else if (row === 'menu') {
        title.value = '添加子菜单'
        form.component = ''
      } else {
        type.value = 'menu'
        title.value = '添加子菜单'
        form.component = ''
        form.parentName = row.name
      }
      dialogFormVisible.value = true
    }
    const close = () => {
      type.value = ''
      title.value = ''
      formRef.value.resetFields()
      dialogFormVisible.value = false
    }
    const submitForm = () => {
      formRef.value.validate(async(valid) => {
        if (!valid) return
        await doAdd(form)
        emit('fetch-data')
        close()
      })
    }
    const filterSelectName = (data) => {
      data.forEach((item) => {
        selectName.value.push(item.name)
        if (item.children && item.children.length > 0) filterSelectName(item.children)
      })
    }
    onMounted(async() => {
      const selectComponentsResponse = await getComponentsList()
      selectComponents.value = selectComponentsResponse.data
      const selectRolesResponse = await getRolesList()
      selectRoles.value = selectRolesResponse.data
      const selectNameResponse = await getRouterList()
      await filterSelectName(selectNameResponse.data)
    })
    return {
      form,
      type,
      title,
      tabName,
      defaultProps,
      dialogFormVisible,
      rolesTreeRef,
      rules,
      formRef,
      device,
      submitForm,
      handleIcon,
      tabClick,
      open,
      close,
      translate,
      selectComponents,
      selectRoles,
      selectName,
      handleCheck
    }
  }
}
</script>
<style lang="scss">
.el-dialog__header {
  text-align: left;
}
.el-select {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.add {
  :deep {
    .el-dialog {
      border-radius: 5px;

      .el-dialog__header {
        border-bottom: solid 2px #eee !important;
        text-align: left;
      }

      .el-dialog__body {
        padding: 20px 20px !important;
      }
    }
  }
  .menu-form {
    text-align: left;
    .el-form-item {
      width: 100%!important;
    }
    .el-input {
      width: 100%;
    }
  }
}
</style>
