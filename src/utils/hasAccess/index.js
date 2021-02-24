import store from '@/store'
import { isArray } from '@/utils/validate'

/**
 * @author WangZeping zepingwong@gmail.com
 * @param value
 * @returns {boolean}
 */
export function hasAccess(value) {
  if (store.state.acl.admin) return true
  if (isArray(value) && value.length > 0) {
    return can(store.state.acl.role, {
      role: value,
      mode: 'oneOf'
    })
  }
  const { role, ability, mode = 'oneOf' } = value
  let result = true
  if (role) result = result && can(store.state.acl.role, { role, mode })
  if (result && ability) {
    result = can(store.state.acl.ability, {
      role: ability,
      mode
    })
  }
  return result
}

/**
 * @author WangZeping zepingwong@gmail.com
 * @param roleOrAbility
 * @param value
 * @returns {boolean}
 */
export function can(roleOrAbility, value) {
  let hasRole = false
  const { role, mode } = value
  if (role && mode) {
    if (mode === 'allOf') {
      hasRole = role.every((item) => {
        return roleOrAbility.includes(item)
      })
    }
    if (mode === 'oneOf') {
      hasRole = role.some((item) => {
        return roleOrAbility.includes(item)
      })
    }
    if (mode === 'except') {
      hasRole = !role.some((item) => {
        return roleOrAbility.includes(item)
      })
    }
  }
  return hasRole
}
