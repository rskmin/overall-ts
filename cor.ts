// TODO: 泛型写好

interface IHandleFunc {
  (next: IInjectFunc, ...params: any[]): any
}

interface IInjectFunc {
  (...moreParams: any[]): any
}

const createCor = function (handleFuncs: IHandleFunc[], capture = () => {}) {
  const maxIndex = handleFuncs.length - 1
  handleFuncs.push(capture)
  return function (start: number) {
    if (start < 0 || start > maxIndex) {
      throw new Error(`start is between ${0} and ${maxIndex}`)
    }
    return function (...params: any[]) {
      const injectFuncs: IInjectFunc[] = []
      for (let i = maxIndex; i >= 0; i--) {
        injectFuncs[i] = (...moreParams: any[]) =>
          handleFuncs[i](
            injectFuncs[i + 1] || handleFuncs[i + 1],
            ...params,
            ...moreParams
          )
      }
      return injectFuncs[0]()
    }
  }
}

export { createCor }
