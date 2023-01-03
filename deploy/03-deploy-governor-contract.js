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

    // ---- Here need to get "GovernanceToken" & "TimeLock" contracts ---- \\
    const governanceToken = await ethers.getContract("GovernanceToken")
    const timeLock = await ethers.getContract("TimeLock")

    args = [
        governanceToken.address,
        timeLock.address,
        QUORUM_PERCENTAGE,
        VOTING_PERIOD,
        VOTING_DELAY,
    ]

    log("-------------------------------------------------------------------")
    log("Governor being deployed....")

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("-------------------------------------------------------------------")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("----Verifying....----")
        await verify(governorContract.address, args)
    }
}
