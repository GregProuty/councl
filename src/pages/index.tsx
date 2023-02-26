import { useState } from "react"
import { useForm } from "react-hook-form"

import { useRequireWallet } from "@/hooks/useRequireWallet"
import { useCountStore } from "@/store/store"

export const HomePage = () => {
  const { count, title, increase } = useCountStore(
    ({ count, title, increase }) => ({
      count,
      increase,
      title,
    })
  )
  const [greeting, setGreeting] = useState("")
  const { disabled, promptWallet } = useRequireWallet()

  const helloWorld = () => setGreeting(`hello ${Math.random()}`)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: object) => console.log(data)

  return (
    <>
      <h1>Demo of some tooling possibilities</h1>
      <div className="w-full py-8">
        <button
          className="bg-blue-400 p-4 text-white rounded-xl mx-4"
          disabled={disabled}
          onClick={promptWallet(helloWorld)}
        >
          Say hello
        </button>
        {greeting}
      </div>
      <h1 className="text-3xl text-black dark:text-ak-blue-500 p-4">
        {title}
        <span className="text-blue-500 dark:text-red-500">
          with dark mode CSS
        </span>
      </h1>
      <div className="my-4">
        <h3 className="text-xl mt-4">React Hook Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="mx-2 inline-block"
            type="text"
            {...register("exampleRequired", { required: true })}
          />
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
          <input className="btn " type="submit" />
        </form>
      </div>
      <div className="py-4">
        <button
          className="btn mr-3"
          onClick={() => {
            increase(1)
          }}
        >
          Increase in Zustand
        </button>
        {count}
      </div>
    </>
  )
}
export default HomePage
