// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000;

    constructor()
        ERC20("GovernanceToken", "GT")
        ERC20Permit("GovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
        /*
        -> Someone knows a hot proposal is coming up. So they just buy a ton of tokens
           and then dump it after
        WE WANT TO AVOID ⬆️

        Soln ⬇️:
         We'll create a SNAPSHOT of tokens people have at a certain BLock   
         ==> ERC20Permit("GovernanceToken") has "checkpoints", "delegate", "snapshot"
         */
    }

    // Override Functions ⬇️
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
        // ⬆️ is done to make sure that "SNAPSHOTS" are updated.
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}
