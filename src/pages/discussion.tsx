import { useRouter } from 'next/router'
import { NFTStorage } from 'nft.storage'
import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useSigner, useProvider } from 'wagmi'
import { useAccount } from 'wagmi'

import { useBlockNumber } from 'wagmi'

import { Button } from '@/components/atoms/Button'
import Modal from '@/components/atoms/Modal'

import Comment from '@/components/molecules/Comment'
import Proposal from '@/components/molecules/Proposal'
import Select from '@/components/molecules/Select/Select'
import { SENTIMENTS } from '@/consts/enums'
import { NFT_STORAGE_TOKEN } from '@/consts/secrets'
import {
  getProposals,
  castVote,
  secondProposal,
  getComments,
  addComment,
  proposeAmendment,
  getState,
  getAmmendments,
  getProposalById,
  moveToVote,
  getVoteProposals,
  getVotesCast,
  hasVoted,
  // quorum,
  sendFakeTx,
} from '@/helpers/contractMethods'

import useRecursiveTimeout from '@/hooks/useRecursiveTimeout'

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const Discussion = () => {
  const provider = useProvider()
  const router = useRouter()
  const { data: signer } = useSigner()
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm()
  const { data: block } = useBlockNumber()
  const { address } = useAccount()
  const [comments, setComments] = useState([])
  const [commentType, setCommentType] = useState('neutral')
  const [modalOpen, setModalOpen] = useState(false)
  const [blobs, setBlobs] = useState([])
  const [proposalBlobs, setProposalBlobs] = useState([])
  const [voteProposals, setVoteProposals] = useState([])
  const [displayVote, setDisplayVote] = useState(false)
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState({
    abstain: 0,
    no: 0,
    yes: 0,
  })
  const messagesEndRef = useRef(null)
  const [votePassed, setVotePassed] = useState(null)

  useRecursiveTimeout(async () => {
    const comments = await getComments(signer)
    setComments(comments)
    await fetchAmendments()
    await fetchProposals()
    const voteProposals = await getVoteProposals(signer)
    setVoteProposals(voteProposals)

    blobs.forEach(blob => {
      if (blob.proposalData.state === 7) {
        setDisplayVote(true)
      }
    })
    proposalBlobs.forEach(blob => {
      if (blob.proposalData.state === 7) {
        setDisplayVote(true)
      }
    })
    countVotes()
    const voted = await hasVoted(router.query.proposalId, address, signer)
    setVoted(voted)

    const localStorageVoteStatus = localStorage.getItem('voteStatus')
    const proposalId = router.query.proposalId
    const voteStatus = JSON.parse(localStorageVoteStatus)[proposalId]

    if (voteStatus === true) {
      setVotePassed(true)
    } else if (voteStatus === false) {
      setVotePassed(false)
    }
  }, 1000)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onSubmit = data => {
    setComments([...comments, data])
    reset()
  }

  const countVotes = async () => {
    const events = await getVotesCast(signer)
    const voteCount = {
      abstain: 0,
      no: 0,
      yes: 0,
    }
    events.forEach(event => {
      const support = event.args.support
      if (support === 0) {
        voteCount.no++
      } else if (support === 1) {
        voteCount.yes++
      } else if (support === 2) {
        voteCount.abstain++
      }
    })
    setVotes(voteCount)
  }

  const callMoveToVote = async () => {
    const proposalId = router.query.proposalId

    const result = await moveToVote(proposalId, signer)

    console.log(result)
  }

  const tallyVotes = async () => {
    await sendFakeTx(signer, provider)
    const proposalId = router.query.proposalId
    if (votes.yes > votes.no) {
      setVotePassed(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.setItem("voteStatus", JSON.stringify({ [proposalId]: true }))
    } else {
      setVotePassed(false)
    }
  }

  const onSubmitAmmendment = async data => {
    const proposalId = router.query.proposalId
    try {
      const obj = { name: data?.name, text: data?.text }
      const someData = new Blob([JSON.stringify(obj)])
      const cid = await client.storeBlob(someData)

      await proposeAmendment(proposalId, cid, signer)

      reset2()
    } catch (e) {
      console.log(e)
    }
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
  }, [])

  const postComment = async (data) => {
    try {
      const obj = { text: data?.message }
      const someData = new Blob([JSON.stringify(obj)])
      const cid = await client.storeBlob(someData)

      const sentimentIndex = SENTIMENTS.indexOf(commentType)
      
      await addComment(router?.query.proposalId, cid, sentimentIndex, signer)

      reset()
      scrollToBottom()
    } catch (e) {
      console.log(e)
    }
  }

  const fetchAmendments = async () => {
    const events = await getAmmendments(signer)

    if (!events) return
    let blobs = []

    for (let i = 0; i < events.length; i++) {
      const cid = events[i].args[10]
      const proposer = events[i].args[2]
      const proposalId = events[i].args[0]
      const ammendmentId =  events[i].args[1]
      const state = await getState(proposalId, signer)
      const proposalData = await getProposalById(ammendmentId, signer)

      try {
        await fetch(`https://${cid}.ipfs.nftstorage.link/`)
          .then((response) => response.blob())
          .then(async (body) => {
            const text = await body.text()
            blobs = [
              ...blobs,
              {...JSON.parse(text),
                ammendmentId,
                proposalData,
                proposalId,
                proposer,
                state,
              },
            ]
          })
      } catch (e) {
        console.log(e)
      }
    }
    setBlobs(blobs)
  }
  const fetchProposals = async () => {
    const events = await getProposals(signer)
    if (!events) return
    let blobs = []
    for (let i = 0; i < events.length; i++) {
      const cid = events[i].args[9]
      const proposer = events[i].args[1]
      const proposalId = events[i].args.proposalId
      const state = await getState(proposalId, signer)
      const proposalData = await getProposalById(proposalId, signer)

      try {
        await fetch(`https://${cid}.ipfs.nftstorage.link/`)
          .then((response) => response.blob())
          .then(async (body) => {
            const text = await body.text()
            blobs = [
              ...blobs,
              {...JSON.parse(text),
                proposalData,
                proposalId,
                proposer,
                state,
              },
            ]
          })
      } catch (e) {
        console.log(e)
      }
    }
    setProposalBlobs(blobs)
  }
  return (
    <>
      <div className='flex'>
        <div className='w-[75%]' >
          <div className='h-[75vh] overflow-auto flex flex-col'>
            <>
              {comments.map(comment => (
                <div key={comment.id}>
                  <Comment
                    commenter={comment.commenter}
                    sentiment={comment.sentiment}
                    text={comment.text}
                  />
                </div>
              ))}
              {blobs.map((blob, i) => (
                <div key={i}>
                  <Proposal
                    isAmmendment={true}
                    name={blob.name}
                    proposalData={blob.proposalData}
                    proposalId={blob.ammendmentId}
                    proposer={blob.proposer}
                    signer={signer}
                    text={blob.text}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          </div>
          <form onSubmit={handleSubmit(postComment)}>
            <div className='flex flex-row'>
              <div className='flex w-[93%] h-12 absolute bottom-8 border border-aragon-dark-blue shadow'>
                <div className=''>
                  <Select onValueChange={(val) => setCommentType(val)} />
                </div>
                <input
                  className='inline-block h-full w-full bg-aragon-light-blue text-white px-4 rounded-br-md rounded-tr-md'
                  placeholder={"Type your message here..."}
                  type="message"
                  {...register("message", { required: true })}
                />
              </div>
            </div>
          </form>
        </div>
        <div className='w-[25%] pl-4'>
          <div className='h-[74vh] rounded-md bg-aragon-blue'>
            <div className='font-bold border-b border-aragon-dark-blue w-full h-16 rounded-tr-md rounded-tl-md flex justify-start items-center pl-4 pr-2'>
              {router.query.name}
            </div>
            <div className='text-[#8A919A] px-4 pt-1 h-[40%] overflow-scroll border-b border-aragon-dark-blue'>
              {router.query.text}
            </div>
            <div className='flex flex-col px-4 pt-1 h-[15%] overflow-scroll border-b border-aragon-dark-blue'>
              <span>{`Yes: ${votes.yes}`}</span>
              <span>{`No: ${votes.no}`}</span>
              <span>{`Abstain: ${votes.abstain}`}</span>

            </div>
            {votePassed !== null
              ? <div className='flex justify-center items-center pt-8'>{votePassed
                ?     <div className={`rounded-2xl flex justify-center px-3 py-1 bg-snapshot-green`}>
                  <span className='text-sm'>VOTE PASSED!</span>
                </div>
                : <div className={`rounded-2xl flex justify-center px-3 py-1 bg-red-500`}>
                  <span className='text-sm'>VOTE FAILED</span>
                </div>
              }</div>: <>{voted ? <div className='flex justify-center'>
                <Button
                  className='w-40 mt-8'
                  label={'Quorum'}
                  onClick={() => tallyVotes()}
                />
              </div>
                : <>
                  {displayVote ? <div className='flex flex-col justify-center items-center'>
                    <Button
                      className='w-40'
                      label={'Yes'}
                      onClick={
                        () => castVote(router.query.proposalId, signer, 1)
                      }
                    />
                    <Button
                      className='w-40 mt-4'
                      label={'No'}
                      onClick={
                        () => castVote(router.query.proposalId, signer, 0)
                      }
                    />
                    <Button
                      className='w-40 mt-4'
                      label={'Abstain'}
                      onClick={
                        () => castVote(router.query.proposalId, signer, 2)
                      }
                    />              
                  </div>:<div className='h-[35%] flex flex-col items-center p-4 justify-start'>
                    {voteProposals.length ? <Button
                      className='w-40'
                      label={'Second Vote'}
                      onClick={
                        () => secondProposal(router.query.proposalId, signer)
                      }
                    /> : <Button
                      className='w-40'
                      label={'Move to Vote'}
                      onClick={() => callMoveToVote()}
                    />}
                    <Button
                      className='w-40 mt-4'
                      label={'Ammend'}
                      onClick={() => setModalOpen(true)}
                    />
                  </div>}
                </>}
              </>}
          </div>
          
        </div>
      </div>
      <Modal
        className={'w-[30vw] h-[32vw] flex flex-col'}
        open={modalOpen} title={'Propose Ammendment'}
        toggleOpen={() => setModalOpen(!modalOpen)}
      >
        <div>
          <form onSubmit={handleSubmit2(onSubmitAmmendment)}>
            <div className='flex flex-col'>
              <p className='my-2'>Name:</p>
              <input
                className="inline-block rounded text-black p-2 border-2 border-gray-300 text-base bg-white shadow"
                type="text"
                {...register2("name", { required: true })}
              />
              <p className='my-2'>Text:</p>
              <textarea
                className="inline-block h-32 rounded text-black p-2"
                {...register2("text", { required: true })}
              />
            </div>
            <div className='flex mt-4 justify-center'>
              <input className="btn cursor-pointer bg-aragon-light-blue" onClick={() => console.log('wtf')} type="submit" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default Discussion
