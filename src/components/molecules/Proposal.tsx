import Link from 'next/link'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { secondProposal } from '@/helpers/contractMethods'
import { truncateEthAddress } from '@/helpers/utils'

interface ProposalProps {
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
}: ProposalProps) => {
  const state = proposalData.state

  console.log('proposalData', proposalData)
  return (
    <div className='flex min-h-[16vh] justify-between rounded my-4 p-4 bg-aragon-blue '>
      <div className='flex flex-col w-[80%]'>
        <div className={'flex items-center justify-start'}>
          <Jazzicon
            diameter={15}
            seed={jsNumberForAddress(proposer)}
          />
          <p className={'ml-2 font-semibold text-white'}>
            {truncateEthAddress(proposer)}
          </p>
        </div>
        <span className='mt-2 font-bold text-lg'>{name}</span>
        <span className='mt-2 text-[#8A919A]'>{text}</span>

      </div>
      <div className='flex flex-col justify-end h-[16vh] items-end'>
        <Badge className={'mb-12'} state={state} />
        {state === 1
          ?
          <Button
            label={ 'Second'}
            onClick={() => secondProposal(proposalId, signer)}
          />
          :
          <Link href={{ pathname: "/discussion", query: { proposalId: proposalId.toString() } }}>
            <Button
              label={'Discuss'}
              onClick={() => secondProposal(proposalId, signer)}
            />
          </Link>}
      </div>
    </div>

  )
}
export default Proposal
