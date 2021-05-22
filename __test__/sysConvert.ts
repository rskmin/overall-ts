import { sysConvert } from "../sysConvert"
import { strictEqual } from "./utils/assert"

strictEqual(
  sysConvert({
    val: 1010101,
    from: 2,
    to: 10,
  }),
  "85"
)

strictEqual(sysConvert("1010101", 2, 10), "85")

strictEqual(
  sysConvert({
    val: "1010101",
    from: 2,
    to: 8,
  }),
  "125"
)

strictEqual(
  sysConvert({
    val: "101",
    from: 16,
    to: 2,
  }),
  "100000001"
)

strictEqual(
  sysConvert({
    val: "101",
    from: 16,
    to: 2,
  }),
  "100000001"
)

strictEqual(
  sysConvert({
    val: "010F",
    from: 16,
    to: 36,
  }),
  "7J"
)
