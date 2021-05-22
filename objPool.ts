import { deepDiff } from "./deepDiff"

class ObjPool<T> {
  public pool: T[] = []
  size() {
    return this.pool.length
  }
  get(index: number): T | undefined {
    if (index >= this.size() || index < 0) return
    if (index === this.size() - 1) return this.pool.pop()
    const res = this.pool[index]
    this.pool[index] = this.pool.pop()!
    return res
  }
  push(obj: T) {
    this.pool.push(obj)
  }
}

function createObjPoolFactory<T extends Object>(
  createObjFactory: (...args: any[]) => T
) {
  const objPool = new ObjPool<T>()
  return {
    create(...args: any[]): T {
      let obj!: T
      if (objPool.size() > 0) {
        for (let i = 0; i < objPool.size(); i++) {
          const objFromPool = objPool.pool[i]
          if (deepDiff(args, Reflect.get(objFromPool, "__params"))) {
            obj = objPool.get(i)!
            break
          }
        }
      }
      if (!obj) {
        const newObj = createObjFactory(...args)
        Reflect.defineProperty(newObj, "__params", {
          value: args,
          writable: false,
          configurable: false,
        })
        return newObj
      }
      return obj
    },
    recover(obj: T) {
      objPool.push(obj)
    },
    getPoolSize() {
      return objPool.size()
    },
    // getPool() { //* 测试时使用
    //   return objPool.pool
    // },
  }
}

/**
 * @example
 * 
const objPoolFactory = createObjPoolFactory((name?: string) => {
  return {
    name,
  }
})

let obj1 = objPoolFactory.create("rskmin")
objPoolFactory.recover(obj1)
console.log(objPoolFactory.getPool()) // [ { name: 'rskmin' } ]
let obj2 = objPoolFactory.create()
objPoolFactory.recover(obj2)
console.log(objPoolFactory.getPool()) // [ { name: 'rskmin' }, { name: undefined } ]
objPoolFactory.create("rskmin")
console.log(objPoolFactory.getPool()) // [ { name: undefined } ]
 */

export { createObjPoolFactory }
