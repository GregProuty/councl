import { useEffect } from "react"

import { useRequireWallet } from "./useRequireWallet"

export const useAutoRainbowPopup = () => {
  const { shouldAutoPopup, tryPrompt } = useRequireWallet()

  useEffect(() => {
    shouldAutoPopup && tryPrompt()
  }, [shouldAutoPopup, tryPrompt])
}
