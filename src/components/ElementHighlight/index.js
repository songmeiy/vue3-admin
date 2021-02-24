import 'highlight.js/styles/tomorrow-night-eighties.css'
import 'highlight.js/styles/vs.css'
import hljs from 'highlight.js'

const install = function(app) {
  app.directive('highlight', {
    deep: true,
    bind(el, binding) {
      // on first bind, highlight all targets
      const targets = el.querySelectorAll('code')

      targets.forEach(target => {
        if (typeof binding.value === 'string') {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value
        }
        hljs.highlightBlock(target)
      })
    },
    componentUpdated(el, binding) {
      // after an update, re-fill the content and then highlight
      const targets = el.querySelectorAll('code')
      targets.forEach(target => {
        if (typeof binding.value === 'string') {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value
          hljs.highlightBlock(target)
        }
      })
    }
  })
}

export default install
