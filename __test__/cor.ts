import { createCor } from "../cor"
import { strictEqual } from "./utils/assert"

strictEqual(
  createCor([
    (next, age) => {
      if (age === 1) {
        return 1
      }
      return next()
    },
  ])(0)(1),
  1
)

strictEqual(
  createCor([
    (next, age) => {
      if (age === 1) {
        return 1
      }
      return next()
    },
  ])(0)(2),
  undefined
)
strictEqual(
  createCor(
    [
      (next, age) => {
        if (age === 1) {
          return 1
        }
        return next()
      },
    ],
    () => "can not handle"
  )(0)(2),
  "can not handle"
)

strictEqual(
  createCor([
    (next, age) => {
      if (age === 1) {
        return 1
      }
      return next()
    },
    (next, age) => {
      if (age === 2) {
        return 2
      }
      return next()
    },
  ])(0)(2),
  2
)
strictEqual(
  createCor([
    (next, age) => {
      if (age === 1) {
        return 1
      }
      return next()
    },
    (next, age) => {
      if (age === 2) {
        return 2
      }
      return next()
    },
    (next, age) => {
      if (age === 3) {
        return 3
      }
    },
  ])(0)(3),
  3
)
