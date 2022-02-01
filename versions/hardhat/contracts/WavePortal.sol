// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "hardhat/console.sol";

// contract address 0xAC2155521F7DDc016D28e8f4BdE1Ac7fcf8EEC6e
contract WavePortal {
  uint256 totalWaves;

  event NewWave(address indexed from, uint256 timestamp, string message);

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }

  Wave[] waves;

  mapping(address => uint256) public lastWavedAt;

  mapping(address => uint256) numberOfWaves;

  constructor() payable {
    console.log("Yo yo, I am a contract and I am smart");
  }

  function wave(string memory _message) public {
    require(
      lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
      "wait 15 minutes"
    );
    lastWavedAt[msg.sender] = block.timestamp;
    totalWaves += 1;
    numberOfWaves[msg.sender] += 1;
    console.log("%s has waved!", msg.sender);
    console.log("%s has waved %s times", msg.sender, numberOfWaves[msg.sender]);

    waves.push(Wave(msg.sender, _message, block.timestamp));

    emit NewWave(msg.sender, block.timestamp, _message);

    uint256 prizeAmount = 0.0001 ether;
    require(
      prizeAmount <= address(this).balance,
      "Trying to withdraw more money than the contract holds"
    );
    (bool success, ) = (msg.sender).call{ value: prizeAmount }("");
    require(success, "Failed to withdraw money from contract.");
  }

  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves", totalWaves);
    return totalWaves;
  }

  function getWavesByAddress(address addr) public view returns (uint256) {
    return numberOfWaves[addr];
  }
}
