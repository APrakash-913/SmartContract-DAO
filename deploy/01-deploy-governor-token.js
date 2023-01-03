const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    args = []

    log("-------------------------------------------------------------------")

    const governanceToken = await deploy("GovernanceToken", {
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
        await verify(governanceToken.address, args)
    }

    log(`Delegating to ${deployer}`)
    await delegate(governanceToken.address, deployer)
    log("Delegated!")
}

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken1 = await ethers.getContractAt(
        "GovernanceToken",
        governanceTokenAddress
    )

    const tx = await governanceToken1.delegate(delegatedAccount)
    await tx.wait(1)

    console.log(
        `Checkpoints ${await governanceToken1.numCheckpoints(delegatedAccount)}`
    )
}
