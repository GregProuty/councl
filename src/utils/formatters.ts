import { utils } from "ethers"

import type { BigNumber } from "ethers"

/**
  * TODO: clean this up, as it's copied from old repo
  * @param shift - divides the BigNumber by 10^shift;
  *                set this to the ERC-20 `decimals`
  * @param decimals - number of digits to show to the right of the decimal point
  */
export const parseBN = (
  bigNumber: BigNumber | undefined,
  shift: number,
  decimals: number,
) => {
  if (!bigNumber) return "-"
  const mod = `1${"0".repeat(shift > decimals ? shift - decimals : 0)}`
  const remainder = bigNumber.mod(mod)
  const floored = bigNumber.sub(remainder)
  const rounded = remainder.mul(2).gte(mod) ? floored.add(mod) : floored
  return utils.formatUnits(rounded, shift)
}

export const utcDateString = (date: Date) =>
  date.toUTCString().split(' ').slice(0, 4).join(' ')

export const errorString = (error: object) => {
  const naiveStr = error.toString()
  return naiveStr === "[object Object]" ?
    `Error: ${JSON.stringify(error, null, 2)}` : naiveStr
}
