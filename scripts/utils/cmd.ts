import { exec } from "child_process"

function cmd(command: string) {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}

export { cmd }
