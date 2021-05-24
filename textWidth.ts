interface IGetTextWidth {
  (text: string, font: string): number
  canvas?: HTMLCanvasElement
}

/**
 * 计算浏览器中特定样式文字的宽度
 * @param text 文字内容
 * @param font 文字样式
 */
const getTextWidth: IGetTextWidth = (text, font) => {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"))
  const context = canvas?.getContext("2d")
  if (!context) {
    throw new Error("浏览器不支持canvas，请更换计算方法")
  }
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

export { getTextWidth }
