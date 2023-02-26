import { useCountStore } from "@/store/store"

export const FaucetPage = () => {
  const { count } = useCountStore(({ count }) => ({
    count,
  }))
  return <h1>Faucet page {count}</h1>
}
export default FaucetPage
