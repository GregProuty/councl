import Link from 'next/link'
import {useEffect, useState} from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { secondProposal } from '@/helpers/contractMethods'
import { truncateEthAddress } from '@/helpers/utils'

interface ProposalProps {
  isAmmendment?: boolean,
  name: string,
  proposalData: any,
  proposalId: any,
  proposer: string,
  signer: any,
  text: string
}
const Proposal = ({
  name,
  text,
  proposalId,
  proposalData,
  signer,
  proposer,
  isAmmendment,
}: ProposalProps) => {
  const state = proposalData.state
  const [votePassed, setVotePassed] = useState(null)

  useEffect(() => {
    const localStorageVoteStatus = localStorage.getItem('voteStatus')
    if (localStorageVoteStatus) {
      const voteStatus = 
        JSON.parse(localStorageVoteStatus)[proposalId.toString()]
      if (voteStatus === true) {
        setVotePassed(true)
      } else if (voteStatus === false) {
        setVotePassed(false)
      }
    }
  }, [])

  return (
    <div className='flex min-h-[16vh] justify-between rounded my-4 p-4 bg-aragon-blue '>
      <div className='flex flex-col w-[80%] pr-4'>
        <div className={'flex items-center justify-start'}>
          <Jazzicon
            diameter={15}
            seed={jsNumberForAddress(proposer)}
          />
          <p className={'ml-2 font-semibold text-white'}>
            {`${truncateEthAddress(proposer)} ${isAmmendment ? "(Ammendment)" : ""}`}
          </p>
        </div>
        <span className='mt-2 font-bold text-lg'>{`${name}`}</span>
        <span className='mt-2 text-[#8A919A]'>{text}</span>
      </div>
      <div className='flex flex-col flex-1 justify-end items-end'>
        <div className='flex flex-1 justify-end'>
          <Badge className={'mb-12 h-7'} passed={votePassed} state={state} />
        </div>
        {!votePassed && <>{state === 1
          ?
          <Button
            label={'Second'}
            onClick={() => secondProposal(proposalId, signer)}
          />
          :
          <Link href={{ pathname: "/discussion", query: { name, proposalId: proposalId.toString(), proposer, text } }}>
            <Button
              // className='w-36'
              label={'Discuss'}
              onClick={() => ''}
            />
          </Link>}
        </>}
      </div>
    </div>

  )
}
export default Proposal
