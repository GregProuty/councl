import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"

import Comment from '@/components/molecules/Comment'

const dummyData = [{id: 123, replies: [], text: 'bla bla'}, {id: 124, replies: [], text: 'la la la'}]
// const a = '▲▼'
export const Discussion = () => {
  const [comments, setComments] = useState(dummyData)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onSubmit = data => {
    console.log('data', data)
    setComments([...comments, data])
    reset()
  }

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        handleSubmit(onSubmit)
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [comments])

  return (
    <>
      <h1 className='mb-4'>Discussion</h1>

      <div className='h-[70vh] overflow-auto flex flex-col'>

        {comments.map(comment => (
          <div key={comment.id}>
            <Comment text={comment.text} />
          </div>
        ))}
        <div ref={messagesEndRef} />

      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='w-[93%] h-12 absolute bottom-8 border border-aragon-dark-blue shadow'>
          <input
            className='inline-block h-full w-full bg-aragon-light-blue text-white px-4 rounded-md'
            placeholder={"Type your message here..."}
            type="text"
            {...register("text", { required: true })}
          />
        </div>
      </form>

    </>
  )
}
export default Discussion
