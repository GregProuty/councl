import { renderHook, waitFor } from "@testing-library/react"
import { test, expect } from "vitest"
import { useAccount, useConnect, useDisconnect } from "wagmi"

import { mockRainbowWrapper as wrapper, mockConnect } from "@/test/mockWagmi"

import { useRequireWallet } from "./useRequireWallet"

const useTestRequireWallet = () => ({
  account: useAccount(),
  connect: useConnect(),
  disconnect: useDisconnect(),
  requireWallet: useRequireWallet(),
})


test('connect then disconnect', async () => {
  const view = renderHook(() => useTestRequireWallet(), { wrapper })

  expect(view.result.current?.requireWallet).toEqual(
    expect.objectContaining({
      disabled: false,
      needsChain: false,
      needsConnect: true,
      needsWallet: true,
      shouldAutoPopup: true,
    }),
  )

  // TODO: test connecting to wrong network here
  await mockConnect(view)
  await waitFor(
    () => expect(view.result.current?.account.isConnected).toBeTruthy()
  )

  expect(view.result.current?.requireWallet).toEqual(
    expect.objectContaining({
      disabled: false,
      needsChain: false,
      needsConnect: false,
      needsWallet: false,
      shouldAutoPopup: false,
    }),
  )
})
