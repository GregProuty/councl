// import { fetchSigner } from '@wagmi/core'
import { ethers } from "ethers"
import { BigNumber } from 'ethers'

// import { NFTStorage } from 'nft.storage'

import CouncilAbi from "@/abis/council.json"
import token from "@/abis/token.json"
// import { NFT_STORAGE_TOKEN } from '@/consts/secrets'


// const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const getMethods = (provider) => {
  const councilContract = new ethers.Contract("0xbfbDf9286e57E71591557ECd1c6773a32c49501A", CouncilAbi, provider)

  console.log(councilContract)
}
// CouncilToken deployed to: 0x2452DF8C798e40E39d1b125A772B89F2f754B188
// CouncilContract deployed to: 0x65eD1cFa525b7Fe431Eb32F32D135773F1fFc150
// const calldata = ethers.utils.formatBytes32String("")
// console.log(calldata)
// 0xbfbDf9286e57E71591557ECd1c6773a32c49501A
// 0xf84B1A7cD6A8bB3532ef56B0c84746D99527Af08
// CouncilToken deployed to: 0xb692b41b166E7D3c3dd049A7b6aa454113342ac2
// CouncilContract deployed to: 0xA141bCB3C51503A12C7735261058F6420D84e05e
// CouncilToken deployed to: 0x30d4D9e0a51Ee7a0Baa05617bc861763ada36344
// CouncilContract deployed to: 0x0DF33aC94781D19E7C9c5827B75ED7367D3367b9

// CouncilToken deployed to: 0x792eEB84Fdea84aDEA1F3c99Ab7a2A6812deF0C3
// CouncilContract deployed to: 0xFb4b350680684E9daFD89245D23679e0B57f5d36

const CouncilToken = "0xc730CA9406D6A5719D0b849293C3dd267DCdeB24"
const CouncilContract = "0x9700540407b6dc90e91B0A4f271bEd5F719b024a"

export const propose = async (signer, cid) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)
  const councilToken = new ethers.Contract(CouncilToken, token, signer)

  const calldata = councilToken.interface.encodeFunctionData("transfer", ["0x3556306916594273B4Ba49B2Be7c7F8B970B55C3", 1])
  // const filters = await councilContract.filters.ProposalCreated()
  // const logs = await councilContract.queryFilter(filters, 0, "latest")
  // const events = logs.map((log) => councilContract.interface.parseLog(log))

  const proposal = await councilContract.propose(
    ["0xf84B1A7cD6A8bB3532ef56B0c84746D99527Af08"],
    [0],
    [calldata],
    '',
    cid
    // "Proposal #4: Give grant to team"
  )

  return proposal
}

export const name = async (signer) => {
  const councilContract = new ethers.Contract("0xbfbDf9286e57E71591557ECd1c6773a32c49501A", CouncilAbi, signer)

  const name = await councilContract.name()

  return name
}

export const getProposals = async (signer) => {
  const councilContract = 
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  try {
    const filters = await councilContract.filters.ProposalCreated()
    const logs = await councilContract.queryFilter(filters, 0, "latest")
    const events = logs.map((log) => councilContract.interface.parseLog(log))

    return events
  } catch (e) {
    console.log('e', e)
  }
}

export const getComments = async (signer) => {
  const councilContract = 
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  try {
    const filters = await councilContract.filters.CommentEvent()
    const logs = await councilContract.queryFilter(filters, 0, "latest")
    const events = logs.map((log) => councilContract.interface.parseLog(log))

    let blobs = []
    for (let i = 0; i < events.length; i++) {
      const cid = events[i]?.args.cid
      const commenter = events[i]?.args.commenter
      const proposalId = events[i]?.args.proposalId
      const sentiment = events[i]?.args.sentiment

      await fetch(`https://${cid}.ipfs.nftstorage.link/`)
        .then((response) => response.blob())
        .then(async (body) => {
          const text = await body.text()
          blobs = [
            ...blobs,
            {...JSON.parse(text),
              commenter,
              proposalId,
              sentiment,
            },
          ]
        })
    }

    return blobs
  } catch (e) {
    console.log('e', e)
  }
}

export const addComment = async (proposalId, cid, sentiment, signer) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result =
    // eslint-disable-next-line max-len
    await councilContract.addComment(BigNumber.from(proposalId), 0, cid, sentiment)

  return result
}

export const getProposalById = async (proposalId, signer) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.getProposalById(proposalId)

  return result
}

export const getState = async (proposalId, signer) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.state(proposalId)

  return result
}

export const secondProposal = async (proposalId, signer) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.secondProposal(proposalId)

  return result
}

export const proposeAmendment = async (proposalId, cid, signer) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)
  const councilToken = new ethers.Contract(CouncilToken, token, signer)

  const calldata = councilToken.interface.encodeFunctionData("transfer", ["0x3556306916594273B4Ba49B2Be7c7F8B970B55C3", 1])
  
  console.log(proposalId, cid)
  const ammendment = await councilContract.proposeAmendment(
    proposalId,
    ["0xf84B1A7cD6A8bB3532ef56B0c84746D99527Af08"],
    [0],
    [calldata],
    '',
    cid
  )

  return ammendment
}

export const getAmmendments = async (signer) => {
  const councilContract = 
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  try {
    const filters = await councilContract.filters.AmendmentCreated()
    const logs = await councilContract.queryFilter(filters, 0, "latest")
    const events = logs.map((log) => councilContract.interface.parseLog(log))

    return events
  } catch (e) {
    console.log('e', e)
  }
}

export const moveToVote = async (proposalId, signer) => {
  const councilContract =
  new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.moveToVote(proposalId)

  return result
}
// "Governor: vote not currently active"
export const getVoteProposals = async (signer) => {
  const councilContract = 
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  try {
    const filters = await councilContract.filters.MoveToVoteRequested()
    const logs = await councilContract.queryFilter(filters, 0, "latest")
    const events = logs.map((log) => councilContract.interface.parseLog(log))

    // console.log(events)
    return events
  } catch (e) {
    console.log('e', e)
  }
}

export const castVote = async (proposalId, signer, support) => {
  console.log(proposalId)
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.castVote(proposalId, support)

  return result
}

export const getVotesCast = async (signer) => {
  const councilContract = 
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  try {
    const filters = await councilContract.filters.VoteCast()
    const logs = await councilContract.queryFilter(filters, 0, "latest")
    const events = logs.map((log) => councilContract.interface.parseLog(log))

    return events
  } catch (e) {
    console.log('e', e)
  }
}

export const quorum = async (block, signer) => {
  const councilContract =
    new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.quorum(block)

  return result
}

export const hasVoted = async (proposalId, account, signer) => {
  const councilContract =
  new ethers.Contract(CouncilContract, CouncilAbi, signer)

  const result = await councilContract.hasVoted(proposalId, account)

  return result
}

export const sendFakeTx = async (signer, provider) => {
  const tx = {
    from: "0xCCE896AE7c12235ef92CE4f63392aC55335C368d",
    gasLimit: ethers.utils.hexlify(5258348),
    // 100000
    gasPrice: 4601055,
    nonce: provider.getTransactionCount("0xCCE896AE7c12235ef92CE4f63392aC55335C368d", "latest"),
    to: "0xCCE896AE7c12235ef92CE4f63392aC55335C368d", 
    value: ethers.utils.parseEther("0"),
  }
  const result = await signer.sendTransaction(tx)

  return result
}