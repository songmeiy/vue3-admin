/**
 * @description 树状数组
 * @returns {[]}
 */
export function filterRoles(roles) {
  return roles.filter((role) => {
    if (role.id && role.label) {
      return true
    }
  }).map((role) => {
    if (role.children) {
      role.children = filterRoles(role.children)
    }
    return role
  })
}
