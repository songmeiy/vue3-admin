<template>
  <div class="timeline-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="12" :xl="8" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>常规风格</span>
              <el-radio-group v-model="reverse" class="card-header-radio">
                <el-radio :label="true">倒序</el-radio>
                <el-radio :label="false">正序</el-radio>
              </el-radio-group>
            </div>
          </template>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(item, index) in activities"
              :key="index"
              :color="item.color"
              :timestamp="item.timestamp"
            >
              <template v-if="!item.color" #dot>
                <svg-icon v-if="item.icon" :icon-class="item.icon" />
                <span
                  v-if="item.waver"
                  class="element-dot"
                  :class="{
                    ['element-dot-' + item.waver]: true,
                  }"
                >
                  <span></span>
                </span>
              </template>
              <el-card v-if="item.card" shadow="hover">
                {{ item.content }}
              </el-card>
              <template v-else>
                {{ item.content }}
              </template>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="12" :xl="8" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>卡片风格</span>
              <el-radio-group v-model="reverse" class="card-header-radio">
                <el-radio :label="true">倒序</el-radio>
                <el-radio :label="false">正序</el-radio>
              </el-radio-group>
            </div>
          </template>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(item, index) in activities"
              :key="index"
              :color="item.color"
              :timestamp="item.timestamp"
            >
              <template v-if="!item.color" #dot>
                <svg-icon v-if="item.icon" :icon-class="item.icon" />
                <span
                  v-if="item.waver"
                  class="element-dot"
                  :class="{
                    ['element-dot-' + item.waver]: true,
                  }"
                >
                  <span></span>
                </span>
              </template>
              <div
                class="element-info-card"
                :class="{ ['element-info-card-' + item.cardType]: true }"
              >
                {{ item.content }}
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'Timeline',
  setup() {
    const reverse = ref(true)
    const activities = ref([
      {
        content: 'Mock加载数据',
        timestamp: '2021-02-24 20:46',
        icon: 'account',
        cardType: 'warning'
      },
      {
        content: '前端基本完成',
        timestamp: '2021-02-20 20:46',
        icon: 'archive',
        cardType: 'error'
      },
      {
        content: '增加Hide布局',
        timestamp: '2021-02-11 20:46',
        color: '#13ce66',
        cardType: 'success'
      },
      {
        content: '增加中国红主题',
        timestamp: '2021-02-03 20:46',
        color: '#e4e7ed'
      },
      {
        content: '全面改写Vue3.0语法',
        timestamp: '2021-01-25 20:46',
        waver: 'success'
      },
      {
        content: '开始Vue-admin',
        timestamp: '2021-01-05 20:46',
        waver: 'error'
      }
    ])
    watch(() => reverse.value, () => {
      if (reverse.value) {
        activities.value = activities.value.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp)
        })
      } else {
        activities.value = activities.value.sort((a, b) => {
          return new Date(a.timestamp) - new Date(b.timestamp)
        })
      }
    })
    return {
      reverse,
      activities
    }
  }
}
</script>
<style lang="scss" scoped>
.timeline-container {
  ::v-deep {
    .el-timeline-item__dot {
      svg{
        margin-right: 5px;
      }
      .element-dot {
        left: -1px;
        width: 12px;
        height: 12px;
        margin: auto !important;
      }
    }
    .el-card {;
      .el-card__header {
        position: relative;
        display: flex;
        .card-header-radio {
          position: absolute;
          top: 20px;
          right: $base-margin;
          .el-radio {
            margin-right: 10px;
          }
        }
      }
      .el-card__body {
        text-align: left;
        .el-timeline {
          padding-left: 0;
        }
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0!important;
    }
  }
  .element-info-card {
    position: relative;
    width: 80%;
    padding: $base-padding;
    background: #e2e2e2;
    border-radius: $base-border-radius + 2;
    &:after {
      position: absolute;
      top: 8px;
      left: -10px;
      width: 0;
      height: 0;
      overflow: hidden;
      content: '';
      border-color: #e2e2e2 transparent transparent;
      border-style: solid dashed dashed;
      border-width: 10px;
    }
    &-success {
      color: $base-color-white;
      background: $base-color-green;
      &:after {
        border-color: $base-color-green transparent transparent;
      }
    }
    &-error {
      color: $base-color-white;
      background: $base-color-red;
      &:after {
        border-color: $base-color-red transparent transparent;
      }
    }
    &-warning {
      color: $base-color-white;
      background: $base-color-orange;
      &:after {
        border-color: $base-color-orange transparent transparent;
      }
    }
  }
}
</style>
