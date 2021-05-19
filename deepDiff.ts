import { TagTypes, getTag } from "./obj-types"
// TODO: 各种情况考虑完整
const strategies: Record<string, (target1: any, target2: any) => boolean> = {
  [TagTypes.Array]: (target1: any[], target2: any[]) => {
    if (target1.length !== target2.length) return false
    for (let i = 0; i < target1.length; i++) {
      if (!deepDiff(target1[i], target2[i])) return false
    }
    return true
  },
  [TagTypes.Object]: (
    target1: Record<string, any>,
    target2: Record<string, any>
  ) => {
    const target1Keys = Reflect.ownKeys(target1) as string[]
    const target2Keys = Reflect.ownKeys(target2) as string[]
    for (let i = 0; i < target1Keys.length; i++) {
      const key = target1Keys[i]
      if (!target2Keys.includes(key)) return false
      const val1 = target1[key]
      const val2 = target2[key]
      if (!deepDiff(val1, val2)) return false
    }
    return true
  },
  [TagTypes.Set]: (target1: Set<any>, target2: Set<any>) => {
    if (target1 !== target2) return false
    return true
  },
  [TagTypes.Map]: (target1: Map<any, any>, target2: Map<any, any>) => {
    if (target1 !== target2) return false

    return true
  },
}

function deepDiff(target1: any, target2: any): boolean {
  const type1 = typeof target1
  const type2 = typeof target2
  if (type1 !== type2) return false
  if (type1 === "object") {
    const tag1 = getTag(target1)
    const tag2 = getTag(target2)
    if (tag1 !== tag2) return false
    const strategy = strategies[tag1]
    if (typeof strategy === "function") return strategy(target1, target2)
    return true
  } else {
    return target1 === target2
  }
}

export { deepDiff }
