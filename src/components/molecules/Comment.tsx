import { useState } from 'react'

const Comment = ({ text }: { text: string }) => {
  const [upvote, setUpvote] = useState(null)
  // const handleClickUpvote = () => upvote !== null
  return (
    <div className='w-full my-4 p-4 rounded-md bg-aragon-blue flex'>
      <div className='w-[2.5%] flex flex-col items-start justify-center mr-2'>
        <span className={`cursor-pointer hover:opacity-50 ${upvote !== null && upvote && 'text-green-500'}`} onClick={() => setUpvote(true)}>▲</span>
        <span className={`cursor-pointer hover:opacity-50 ${upvote !== null && !upvote && 'text-red-500'}`} onClick={() => setUpvote(false)}>▼</span>
      </div>
      <div className='w-[97.5%]'>
        <p>{text}</p>
      </div>
    </div>
  )

}
export default Comment