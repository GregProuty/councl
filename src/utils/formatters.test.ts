import { BigNumber } from "ethers"
import { test, expect } from "vitest"


import * as fmt from "./formatters"

test('parse BigNumber', () => {
  expect(fmt.parseBN(BigNumber.from(1111), 3, 6)).toStrictEqual("1.111")
  expect(fmt.parseBN(BigNumber.from(1111), 3, 1)).toStrictEqual("1.1")
  expect(fmt.parseBN(BigNumber.from(10000), 3, 0)).toStrictEqual("10.0")
  expect(fmt.parseBN(BigNumber.from(10000), 3, -4)).toStrictEqual("0.0")
  expect(fmt.parseBN(BigNumber.from(111), 0, -2)).toStrictEqual("100")
  expect(fmt.parseBN(BigNumber.from(111), 1, -1)).toStrictEqual("10.0")
  expect(fmt.parseBN(BigNumber.from(111), 5, 5)).toStrictEqual("0.00111")
  expect(fmt.parseBN(BigNumber.from(111), 5, 3)).toStrictEqual("0.001")
  expect(fmt.parseBN(BigNumber.from(111), 5, 2)).toStrictEqual("0.0")
  expect(fmt.parseBN(BigNumber.from(911), 5, 2)).toStrictEqual("0.01")
  expect(fmt.parseBN(BigNumber.from(500000), 6, 0)).toStrictEqual("1.0")
})
