import { NFTStorage } from 'nft.storage'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import { useSigner, useProvider } from 'wagmi'

import AddButton from '@/components/atoms/AddButton'
import Modal from '@/components/atoms/Modal'
import Proposal from '@/components/molecules/Proposal'

import { NFT_STORAGE_TOKEN } from '@/consts/secrets'
import { getMethods, propose, getProposals, getState, getProposalById } from '@/helpers/contractMethods'
import useRecursiveTimeout from '@/hooks/useRecursiveTimeout'

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const Proposals = () => {
  const provider = useProvider()
  const { data: signer } = useSigner()

  getMethods(provider)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [ipfsData, setIpfsData] = useState([])
  const [blobs, setBlobs] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useRecursiveTimeout(async () => {
    await fetchProposals()
  }, 1000)

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
    setBlobs(blobs)
  }

  const onSubmit = async (data) => {
    try {
      const obj = { name: data?.name, text: data?.text }
      const someData = new Blob([JSON.stringify(obj)])
      const cid = await client.storeBlob(someData)

      await propose(signer, cid)
      setIpfsData([...ipfsData, cid])
      setModalOpen(false)
      reset()

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProposals()
  }, [])

  return  (
    <>
      <div className='flex justify-between'>
        <h1>Proposals</h1>
        <div className='flex items-center'>
          <span className='mr-2'>Create New Proposal:</span>
          <AddButton onClick={() => setModalOpen(!modalOpen)}/>
        </div>
      </div>
      {/* <button className='border p-2 rounded-md' onClick={() => fetchProposals()}>fetch</button> */}

      {/* <ProposalForm onSubmit={onSubmit}/> */}
      {!blobs.length && <p className='mt-8'>No proposals yet...</p>}
      {blobs.map((blob, i) => <div key={i}>
        <Proposal
          name={blob.name}
          proposalData={blob.proposalData}
          proposalId={blob.proposalId}
          proposer={blob.proposer}
          signer={signer}
          text={blob.text}
        />
      </div>
      )}
      <Modal className={'w-[30vw] h-[32vw] flex flex-col'} open={modalOpen} title={'Create Proposal'} toggleOpen={() => setModalOpen(!modalOpen)}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
              <p className='my-2'>Name:</p>
              <input
                className="inline-block rounded text-black p-2 border-2 border-gray-300 text-base bg-white shadow"
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
      </Modal>
    </>

  )

}
export default Proposals
