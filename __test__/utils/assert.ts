import { strictEqual as _strictEqual } from "assert"

function strictEqual<T, A>(
  actual: A,
  expected: T,
  message: (actual: A, expected: T) => string | Error | undefined = () =>
    `expected is: ${expected}, but actual is: ${actual}`
) {
  return _strictEqual(actual, expected, message(actual, expected))
}

export { strictEqual }
