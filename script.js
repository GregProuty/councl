const { time } = require("@openzeppelin/test-helpers")
require("@openzeppelin/test-helpers/configure")({
  provider: "http://localhost:7545",
})

async function main() {
  await time.advanceBlock()
  // await myTimeRelatedContractMethodCall();
  console.log('advanced?')
}
main()