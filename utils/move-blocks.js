const { network } = require("hardhat")

const moveBlocks = async (numberOfBlocks) => {
    console.log("Moving Blocks.....")
    for (let i = 0; i < numberOfBlocks; i++) {
        await network.provider.request({
            method: "evm_mine",
            params: [],
        })
    }
}

module.exports = {
    moveBlocks,
}
