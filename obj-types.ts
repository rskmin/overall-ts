interface IJudgeFunc {
  (obj: Object): boolean
}

function getTag(obj: Object) {
  return Object.prototype.toString.call(obj) as TagTypes
}

function isType(type: string): IJudgeFunc {
  /** 非对象类型一律返回false */
  return (obj) => typeof obj === "object" && getTag(obj) === `[object ${type}]`
}

function createTypeFunc<T extends FuncNamesType>(
  types: T[]
): { [K in T]: IJudgeFunc } {
  return types.reduce((res, name, index) => {
    res[name] = isType(types[index].slice(2))
    return res
  }, Object.create(null))
}

const funcNames = [
  "isNumber",
  "isString",
  "isBoolean",

  "isObject",
  "isRegExp",
  "isFunction",
  "isArray",
] as const

const enum TagTypes {
  Number = "[object Number]",
  String = "[object String]",
  Boolean = "[object Boolean]",
  Null = "[object Null]",
  Undefined = "[object Undefined]",
  Symbol = "[object Symbol]",
  BigInt = "[object BigInt]",

  Object = "[object Object]",
  RegExp = "[object RegExp]",
  Function = "[object Function]",
  Array = "[object Array]",
  Map = "[object Map]",
  Set = "[object Set]",
  WeakMap = "[object WeakMap]",
  WeakSet = "[object WeakSet]",
}

type FuncNamesType = typeof funcNames[number]

const objTypeUtil = createTypeFunc(funcNames as unknown as FuncNamesType[])

export { objTypeUtil, TagTypes, getTag }
