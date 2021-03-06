<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'
export default {
  name: 'ElementLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const external = computed(() => {
      return isExternal(props.to)
    })
    const type = computed(() => {
      if (external.value) return 'a'
      return 'router-link'
    })
    const linkProps = (to) => {
      if (external.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
    return {
      type,
      linkProps
    }
  }
}
</script>
