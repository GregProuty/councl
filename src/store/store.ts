import { create } from 'zustand'

interface CountState {
    count: number
    increase: (by: number) => void,
    title: string
}

export const useCountStore = create<CountState>()((set) => ({
  count: 5,
  increase: (by) => set((state) => ({ count: state.count + by })),
  title: 'my title from state ',
}))