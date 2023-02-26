import { useEffect } from "react"

/** https://stackoverflow.com/a/39642318 */
export const useDynamicViewport = () => {
  useEffect(() => {
    const applyViewport = () => {
      const windowWidth = window.screen.width
      const minWidth = 800
      const ratio = windowWidth / minWidth
      const viewportMeta = document.getElementById("viewport")
      const attr = windowWidth < minWidth
        ? `initial-scale=${ratio}, width=${minWidth}`
        : "initial-scale=1.0, width=device-width"
      viewportMeta?.setAttribute("content", attr)
    }

    window.addEventListener("resize", applyViewport)
    applyViewport()
    return () => window.removeEventListener("resize", applyViewport)
  }, [])
}
