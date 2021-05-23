interface IAop {
  (...arg: Parameters<typeof createAopFn>): ReturnType<typeof createAopFn>
  before: typeof before
  after: typeof after
}

function before<T extends (...args: any) => void>(fn: T, beforeCb: Function) {
  return function (this: any, ...arg: Parameters<T>): ReturnType<T> {
    beforeCb()
    return fn.call(this, ...arg) as ReturnType<T>
  }
}

function after<T extends (...args: any) => void>(fn: T, afterCb: Function) {
  return function (this: any, ...arg: Parameters<T>): ReturnType<T> {
    const res = fn.call(this, ...arg) as ReturnType<T>
    afterCb()
    return res
  }
}

function createAopFn<T extends (...args: any) => void>(fn: T) {
  const beforeFns: Function[] = []
  const afterFns: Function[] = []
  function aopFn(this: any, ...arg: Parameters<T>): ReturnType<T> {
    beforeFns.forEach((fn) => fn())
    const res = fn.call(this, ...arg) as ReturnType<T>
    afterFns.forEach((fn) => fn())
    return res
  }
  aopFn.before = (beforeCb: Function) => {
    beforeFns.unshift(beforeCb)
    return aopFn
  }
  aopFn.after = (afterCb: Function) => {
    afterFns.push(afterCb)
    return aopFn
  }
  return aopFn
}
const aop = createAopFn as IAop
aop.before = before
aop.after = after

// TODO: 异步AOP

export { aop }

/**
 * @example
 * const aopFn = aop(() => console.log(2))
 *  .before(() => console.log(1))
 *  .after(() => console.log(3))
 * aopFn()
 */

/**
 * @example
 * const aopFn = aop.before(
 *  () => console.log(2),
 *  () => console.log(1)
 * )
 * aopFn()
 */
