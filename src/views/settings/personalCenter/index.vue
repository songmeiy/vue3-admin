<template>
  <div class="personal-center-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
          <div class="personal-center-user-info">
            <el-avatar :size="100" :src="userInfo.avatar" />
            <div class="personal-center-user-info-full-name">{{ userInfo.name }}</div>
            <div class="personal-center-user-info-description">{{ userInfo.description }}</div>
            <div class="personal-center-user-info-follow">
              <a href="https://github.com/zepingwong" target="_blank">
                <el-button round type="primary"><i class="el-icon-s-opportunity"></i>Follow me</el-button>
              </a>
            </div>
            <ul class="personal-center-user-info-list">
              <li>
                <svg-icon iconClass="ip"></svg-icon>{{ userInfo.last_ip }}
              </li>
              <li>
                <svg-icon iconClass="meditor-time"></svg-icon>{{ userInfo.last_time }}
              </li>
              <li>
                <el-divider />
                <h5>{{ translate('user', '个性标签') }}</h5>
                <el-tag v-for="item in userInfo.personality" :key="item" size="small">{{ item }}</el-tag>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <el-card shadow="hover">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane :label="translate('user', '基本信息')" name="info">
              <el-col :lg="20" :md="20" :sm="24" :xl="20" :xs="24">
                <el-form ref="formRef" :model="userInfo" :rules="rules" label-width="120px" :label-position="device === 'mobile' ? 'top' : 'left'">
                  <el-form-item :label="translate('user', '用户名')" prop="username">
                    <el-input v-model="userInfo.username" disabled></el-input>
                  </el-form-item>
                  <el-form-item :label="translate('user', '姓名')" prop="name">
                    <el-input v-model="userInfo.name" />
                  </el-form-item>
                  <el-form-item :label="translate('user', '性别')" prop="gender">
                    <el-select v-model="userInfo.gender" style="width: 100%">
                      <el-option :value="0" :label="translate('user', '保密')" />
                      <el-option :value="1" :label="translate('user', '男')" />
                      <el-option :value="2" :label="translate('user', '女')" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="translate('user', '邮箱')" prop="email">
                    <el-input v-model="userInfo.email" :disabled="userInfo.bindedEmail"/>
                  </el-form-item>
                  <el-form-item :value="0" :label="translate('user', '个性标签')" prop="personality">
                    <el-tooltip :content="translate('user', '每条标签中间用逗号隔开')" effect="dark">
                      <el-input v-model="personality" type="text" />
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item :value="0" :label="translate('user', '个人简介')" prop="description">
                    <el-input v-model="userInfo.description" type="textarea" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{ translate('user', '保存') }}</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-tab-pane>
            <el-tab-pane :label="translate('user', '账号绑定')" name="account">
              <div class="personal-center-item">
                <svg-icon iconClass="email" style="color: #3492ed" />
                <div class="personal-center-item-content">
                  <div>{{ translate('user', '绑定邮箱') }}</div>
                  <div class="personal-center-item-content-second">
                    {{ userInfo.bindedEmail ? userInfo.email : '未绑定邮箱' }}
                  </div>
                </div>
                <el-button type="text" @click="openEmailDialog">{{ translate('user', userInfo.bindedEmail ? '更换邮箱' : '绑定邮箱') }}</el-button>
              </div>
              <el-divider />
            </el-tab-pane>
            <el-tab-pane :label="translate('user', '头像')" name="avatar">
              <el-upload
                ref="uploadRef"
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onChange"
              >
                <img v-if="previewImage" :src="previewImage" :alt="translate('user', '头像')" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <EmailDialog ref="emailDialogRef"></EmailDialog>
    <ElementCropper
      v-if="cropperVisible"
      :action="baseURL + '/user/uploadAvatar'"
      :imagePath="imagePath"
      :headers="headers"
      auto-upload
      fileType="blob"
      @save="onSave"
      @cancel="onCancel"
      @success="handleAvatarSuccess"
      @fail="handleAvatarFail"
    />
  </div>
</template>

<script>
import { getCurrentInstance, ref, computed, reactive, toRefs, onMounted } from 'vue'
import { translate } from '@/utils/i18n'
import { isEmail } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
import { editInfo } from '@/api/user'
import EmailDialog from './components/email'
import ElementCropper from '@/components/ElementCropper'
import defaultConfig from '@/config'
const URL = window.URL || window.webkitURL
export default {
  name: 'PersonalCenter',
  components: {
    EmailDialog,
    ElementCropper
  },
  setup() {
    const { $store, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const { t } = useI18n()
    const activeName = ref('info')
    const device = computed(() => $store.state.settings.device)
    const userInfo = computed(() => $store.state.user.userInfo)
    const personality = ref(userInfo.value.personality.join(','))
    const avatar = computed(() => $store.state.user.avatar)
    const formRef = ref(null)
    const uploadRef = ref(null)
    const emailDialogRef = ref(null)
    const rules = reactive({
      name: [{ required: true, message: translate('user', '姓名不能为空'), trigger: 'blur' }],
      username: [{
        validator: (rule, value, callback) => {
          if (userInfo.value.username !== value) callback(new Error(translate('user', 'message.user.用户名不可以修改哦')))
          callback()
        },
        trigger: 'blur'
      }],
      gender: [{ required: true, message: translate('user', 'message.user.要选择性别哦'), trigger: 'blur' }],
      email: [
        { required: true, message: translate('user', 'message.user.邮箱不能为空'), trigger: 'blur' },
        {
          validator: async(_rule, value) => {
            if (userInfo.bindedEmail) return Promise.reject(t('message.user.已绑定的邮箱不能修改'))
            else if (!isEmail(value)) return Promise.reject(t('message.user.请输入正确的邮箱'))
            return Promise.resolve()
          },
          trigger: 'change'
        }],
      personality: [{
        validator: async() => {
          userInfo.value.personality = personality.value.split(',')
          return Promise.resolve()
        },
        trigger: 'change'
      }]
    })
    const onSubmit = () => {
      formRef.value.validate(async(valid) => {
        if (!valid) return
        await editInfo({
          username: userInfo.value.username,
          name: userInfo.value.name,
          email: userInfo.value.email,
          gender: userInfo.value.gender,
          description: userInfo.value.description,
          personality: personality.value
        })
        $baseMessage('message.user.保存成功', 'success', false, 'element-hey-message-success')
        // userInfo.value.personality = personality.value.split(',')
      })
    }
    const tabClick = (item) => {
      activeName.value = item.props.name
    }
    const openEmailDialog = () => {
      emailDialogRef.value.open()
    }
    onMounted(() => {
      $store.dispatch('user/getUserInfo')
    })
    // 头像上传
    const accessToken = computed(() => $store.state.user.accessToken)
    const { tokenName, baseURL } = defaultConfig
    const headers = ref({})
    headers.value[tokenName] = accessToken.value
    const state = reactive({
      cropperVisible: false,
      imagePath: '',
      previewImage: null
    })
    const onChange = (file) => {
      state.imagePath = URL.createObjectURL(file.raw)
      state.cropperVisible = true
    }
    const handleAvatarSuccess = () => {
      $baseMessage('message.user.上传成功', 'success', false, 'element-hey-message-success')
      $store.dispatch('user/getUserInfo')
    }
    const handleAvatarFail = (res) => {
      $baseMessage('message.user.上传失败', 'error', false, 'element-hey-message-error')
      $store.dispatch('errorLog/addErrorLog', res.message)
    }
    const onSave = (res) => {
      if (typeof res === 'string') {
        state.previewImage = res
      } else {
        state.previewImage = URL.createObjectURL(res)
      }
      state.cropperVisible = false
    }

    const onCancel = () => {
      state.cropperVisible = false
    }

    return {
      ...toRefs(state),
      onChange,
      handleAvatarSuccess,
      handleAvatarFail,
      onCancel,
      onSave,
      device,
      headers,
      uploadRef,
      userInfo,
      avatar,
      formRef,
      rules,
      activeName,
      personality,
      onSubmit,
      openEmailDialog,
      translate,
      tabClick,
      emailDialogRef,
      baseURL
    }
  }
}
</script>
<style lang="scss">
.cropper{
  z-index: 2000;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px!important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang="scss" scoped>
$base: '.personal-center';
#{$base}-container {
  padding: 0 !important;
  background: $base-color-background !important;

  #{$base}-user-info {
    padding: $base-padding;
    text-align: center;

    :deep {
      .el-avatar {
        img {
          cursor: pointer;
        }
      }
    }

    &-full-name {
      margin-top: 15px;
      font-size: 24px;
      font-weight: 500;
      color: #262626;
    }

    &-description {
      margin-top: 8px;
    }

    &-follow {
      margin-top: 15px;
    }

    &-list {
      margin-top: 18px;
      line-height: 30px;
      text-align: left;
      list-style: none;

      h5 {
        margin: -20px 0 5px 0;
      }

      :deep {
        .el-tag {
          margin-right: 10px !important;
        }
        .el-tag + .el-tag {
          margin-left: 0;
        }
      }
    }
  }

  #{$base}-item {
    display: flex;
    svg {
      width: 40px;
      font-size: 40px;
    }
    i {
      font-size: 40px;
    }

    &-content {
      box-sizing: border-box;
      flex: 1;
      margin-left: $base-margin;
      text-align: left;
      &-second {
        margin-top: 8px;
      }
    }
  }
}
</style>
