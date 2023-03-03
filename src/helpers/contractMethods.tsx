import { ethers } from "ethers"

import CouncilAbi from "@/abis/council.json"
import token from "@/abis/token.json"

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
export const propose = async (signer, cid) => {
  const councilContract = new ethers.Contract("0x0DF33aC94781D19E7C9c5827B75ED7367D3367b9", CouncilAbi, signer)
  const councilToken = new ethers.Contract("0x30d4D9e0a51Ee7a0Baa05617bc861763ada36344", token, signer)

  const calldata = councilToken.interface.encodeFunctionData("transfer", ["0x3556306916594273B4Ba49B2Be7c7F8B970B55C3", 1])
  // const filters = await councilContract.filters.ProposalCreated()
  // const logs = await councilContract.queryFilter(filters, 0, "latest")
  // const events = logs.map((log) => councilContract.interface.parseLog(log))

  const proposal = await councilContract.propose(
    ["0xf84B1A7cD6A8bB3532ef56B0c84746D99527Af08"],
    [0],
    [calldata],
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
  const councilContract = new ethers.Contract("0x0DF33aC94781D19E7C9c5827B75ED7367D3367b9", CouncilAbi, signer)

  try {

    const filters = await councilContract.filters.ProposalCreated()
    const logs = await councilContract.queryFilter(filters, 0, "latest")
    const events = logs.map((log) => councilContract.interface.parseLog(log))

    return events
  } catch (e) {
    console.log('e', e)
  }

}

export const getProposalById = async (proposalId, signer) => {
  const councilContract = new ethers.Contract("0x0DF33aC94781D19E7C9c5827B75ED7367D3367b9", CouncilAbi, signer)

  const result = await councilContract.getProposalById(proposalId)

  return result
}

export const getState = async (proposalId, signer) => {
  const councilContract = new ethers.Contract("0x0DF33aC94781D19E7C9c5827B75ED7367D3367b9", CouncilAbi, signer)

  const result = await councilContract.state(proposalId)

  return result
}

export const secondProposal = async (proposalId, signer) => {
  const councilContract = new ethers.Contract("0x0DF33aC94781D19E7C9c5827B75ED7367D3367b9", CouncilAbi, signer)

  const result = await councilContract.secondProposal(proposalId)

  return result
}