const { network, ethers } = require("hardhat")
const {
    developmentChains,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log, get } = deployments

    args = []

    log("-------------------------------------------------------------------")
    log("Deploying Box....")

    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContractAt("Box", box.address)
    // Transfering Ownership to "TimeLock"
    const transferOwnerTx = await boxContract.transferOwnership(
        timeLock.address
    )
    await transferOwnerTx.wait(1)
    log("Ownweship Transfer Successful......")

    log("-------------------------------------------------------------------")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("----Verifying....----")
        await verify(box.address, args)
    }
}
