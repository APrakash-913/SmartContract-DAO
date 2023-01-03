const { network } = require("hardhat")

const moveTime = async (amountOfTime) => {
    console.log("Moving Time.....")
    for (let i = 0; i < numberOfBlocks; i++) {
        await network.provider.send("evm_increaseTime", [amountOfTime])
        console.log(`Move forward ${amount} seconds`)
    }
}

module.exports = {
    moveTime,
}
