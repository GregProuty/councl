import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { useNetwork, useAccount } from "wagmi"

import { useIsHydrated } from "./useIsHydrated"
import { usePrevious } from "./usePrevious"

const enum PopupReason {
  None,
  Connect,
  Network,
}

/**
 * A hook for intercepting button clicks which require a wallet connection.
 *
 * @returns promptWallet - A higher order function; the returned function runs
 *                       runs either the original function, or opens the modal
 * @returns tryPrompt - Opens the modal and returns true, or returns false
 * @returns shouldAutoPopup - Whether the popup is available, should be shown,
 *                            and wasn't already shown for this should-state
 * @returns disabled - Whether the button should be disabled,
 *                     because modal needed but unavailable
 * @returns needsConnect - No wallet connected
 * @returns needsChain - Wrong network
 * @returns needsWallet - Either no wallet connected, or wrong network
 *
 * @example
 * ```
 * const { disabled, promptWallet } = useRequireWallet();
 * return <button disabled={disabled} onClick={promptWallet(buy)} />;
 * ```
 * ```
 * const { needsWallet, shouldAutoPopup, tryPrompt } = useRequireWallet();
 * const nav = needsWallet ? [market, vaults] : [market, portfolio, vaults];
 * useEffect(() => { shouldAutoPopup && tryPrompt() }, [shouldAutoPopup, tryPrompt]);
 * ```
 */
export const useRequireWallet = () => {
  const isHydrated = useIsHydrated()
  const { chain } = useNetwork()
  const { isDisconnected: needsConnect } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()

  let [needsChain, needsWallet, disabled] = [false, false, true]
  if (isHydrated) {
    needsChain = !!(chain?.unsupported)
    needsWallet = needsConnect || needsChain
    disabled =
      (needsConnect && !openConnectModal) || (needsChain && !openChainModal)
  }

  let popupReason = PopupReason.None
  if (!disabled) {
    if (needsConnect) {
      popupReason = PopupReason.Connect
    } else if (needsChain) {
      popupReason = PopupReason.Network
    }
  }
  const prevPopupReason = usePrevious(popupReason)
  const shouldAutoPopup =
    popupReason !== PopupReason.None && popupReason !== prevPopupReason

  const tryPrompt = () => {
    if (needsConnect) {
      openConnectModal && openConnectModal()
      return true
    } else if (needsChain) {
      openChainModal && openChainModal()
      return true
    }
    return false
  }

  const promptWallet =
    (fn: (...args: object[]) => unknown) =>
      (...args: object[]) =>
        needsWallet ? tryPrompt() : fn(...args)

  return {
    disabled,
    needsChain,
    needsConnect,
    needsWallet,
    promptWallet,
    shouldAutoPopup,
    tryPrompt,
  }
}
