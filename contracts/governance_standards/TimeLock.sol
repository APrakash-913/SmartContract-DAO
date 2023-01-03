// ADDITIONAL CONTRACT THAT IS ORIGINALLY AN OWNER

/*
-> We want to wait for a new vote to be "executed"
-> If it is said that, everyonr who holds the Governance Token has to PAY % TOKENS
==> So, Governance Contract give time to the user to "get out" if they don't like the governance update.
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    /*
        -> minDelay: How long to wait before executing
        -> proposers: List of addresses that can propose
        -> executors: Who can execute when a proposal passes
     */
    constructor(
        uint256 minDeley,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDeley, proposers, executors, admin) {}
}
