import { useForm } from "react-hook-form"

const ProposalForm = (onSubmit) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log('errors', errors)
  return (
    <div className='p-4 w-96 rounded-md bg-aragon-blue'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <p className='my-2'>Name:</p>
          <input
            className="inline-block rounded text-black"
            type="text"
            {...register("name", { required: true })}
          />
          <p className='my-2'>Text:</p>
          <textarea
            className="inline-block h-32 rounded text-black p-2"
            {...register("text", { required: true })}
          />
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className='flex mt-4 justify-center'>
          <input className="btn cursor-pointer bg-aragon-light-blue" type="submit" />
        </div>
      </form>
    </div>

  )
}

export default ProposalForm