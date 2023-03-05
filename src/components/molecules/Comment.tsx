// import { useState } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { SENTIMENTS } from '@/consts/enums'
import { truncateEthAddress } from '@/helpers/utils'

import SentimentBadge from '../atoms/SentimentBadge'

const Comment = ({ text, commenter, sentiment }) => 
  // const [upvote, setUpvote] = useState(null)
  // const handleClickUpvote = () => upvote !== null
  (
    <div className='w-full my-2 p-4 rounded-md bg-aragon-blue flex flex-col'>
      <div className='flex justify-between mr-2'>
        <div className={'flex flex-1 items-center justify-start'}>
          <Jazzicon
            diameter={15}
            seed={jsNumberForAddress(commenter)}
          />
          <p className={'ml-2 font-semibold text-white'}>
            {truncateEthAddress(commenter)}
          </p>
        </div>
        <div>
          {SENTIMENTS[sentiment] === 'undefined' ? "" : <SentimentBadge label={SENTIMENTS[sentiment]} />}
        </div>
        {/* <span className={`cursor-pointer hover:opacity-50 ${upvote !== null && upvote && 'text-green-500'}`} onClick={() => setUpvote(true)}>▲</span>
        <span className={`cursor-pointer hover:opacity-50 ${upvote !== null && !upvote && 'text-red-500'}`} onClick={() => setUpvote(false)}>▼</span> */}
      </div>
      <div className='w-[97.5%]'>
        <p>{text}</p>
      </div>
    </div>
  )


export default Comment