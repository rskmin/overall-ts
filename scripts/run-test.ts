import { resolve } from "path"
import fs from "fs"
import { cmd } from "./utils/cmd"
const fsp = fs.promises

const TEST_DIR = resolve(process.cwd(), "__test__")

;(async function runTest() {
  const dirList = await fsp.readdir(TEST_DIR)
  const scriptPaths: string[] = []
  const passFlags: boolean[] = []

  async function runTestScript(filePath: string, index: number) {
    try {
      const stdout = await cmd(`ts-node ${filePath}`)
      stdout && console.log(stdout)
      passFlags[index] = true
    } catch (stderr) {
      stderr && console.log(stderr)
      passFlags[index] = false
    }
  }

  await Promise.all(
    dirList.map(async (name) => {
      const filePath = resolve(TEST_DIR, name)
      const stat = await fsp.stat(filePath)
      if (stat.isFile()) {
        scriptPaths.push(filePath)
      }
      return
    })
  )

  await Promise.all(scriptPaths.map(runTestScript))

  passFlags.forEach((isPass, index) => {
    console.log(`${isPass ? "✅" : "❌"}: ${scriptPaths[index]}`)
  })
})()
