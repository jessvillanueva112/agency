// agency-2/backend/contracts/AuditLog.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditLog {
    event Log(address indexed user, string action, uint256 timestamp);

    function logAction(string memory action) public {
        emit Log(msg.sender, action, block.timestamp);
    }
}