import { getTag, TagTypes, objTypeUtil } from "./obj-types"
const { isObject, isArray } = objTypeUtil

function createDeepHandler(
  handler: Function,
  filter: (target: any) => boolean
) {
  const strategies: Record<string, Function | undefined> = {
    [TagTypes.Array]: (target: any[]) => {
      for (let item of target) {
        handler(item)
      }
    },
    [TagTypes.Object]: (target: Record<string, unknown>) => {
      Object.getOwnPropertyNames(target).forEach((key) =>
        deepHandler(target[key])
      )
    },
  }
  function deepHandler(target: any) {
    if (filter(target)) handler(target)
    if (typeof target === "object") {
      const res = strategies[getTag(target)]
      res && res(target)
    }
  }
  return deepHandler
}

const freezeDeep = createDeepHandler(Object.freeze, (target) => {
  if (isObject(target) || isArray(target)) return true
  return false
})

export { createDeepHandler, freezeDeep }
