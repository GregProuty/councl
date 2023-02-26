import type { BigNumber } from "ethers"

type HasBigNumber = {
  getValue: (key: string) => BigNumber
}

export const bigNumberComparator = (
  a: HasBigNumber,
  b: HasBigNumber,
  columnId: string,
) =>
  (a.getValue(columnId) as BigNumber).eq(b.getValue(columnId))
    ? 0
    : (a.getValue(columnId) as BigNumber).gt(b.getValue(columnId))
      ? 1 : -1
