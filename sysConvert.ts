export interface IParams {
  val: any
  from: number
  to: number
}

/**
 * 2~36 进制间转换，
 * val 必定会先转化为 string 类型
 */
function sysConvert(val: any, from: number, to: number): string
function sysConvert(params: IParams): string
function sysConvert(...args: any[]): string {
  let val, from, to
  if (args.length === 1) {
    const params = args[0] as IParams
    val = params.val
    from = params.from
    to = params.to
  } else {
    val = args[0]
    from = args[1]
    to = args[2]
  }
  const dec = parseInt(val, from)
  return dec.toString(to).toLocaleUpperCase();
}

export { sysConvert }
