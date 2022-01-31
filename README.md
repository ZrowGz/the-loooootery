# the-loooootery

## About

---

## Use
Game play where users buy a ticket and take the ride! A random soul is selected to inherit the fortunes of the other lost souls...  

### Function Definitions
#### Publicly Available Functions
- buyTicket: user sends funds to contract and is added to the drawing
- getTicketPrice: obtain the ticket price in wei
- getHouse, getBalance, getRiderCount, getRiders: all display current game parameters
- getWinner: returns the most recent winner address

#### Publicly Callable Variables
- fee: fee paid to chainlink VRF in $LINK in wei
- maxRiders, owner, riders, ticketPrice: current game stats and parameters
- ticketSales, tripsTaken: historical data 

#### Admin/onlyOwner 
  ***Note: the House address should be set to a multisig to reduce the risk of abuse for emergency functions!***
- emergencyRefund: returns funds to users
- emergencyReboot: if contract locks up due to an out of gas error at one of the EOAs, withdraws all funds to House & resets state
- setAcceptingRiders: a way to pause the contract
- setFee & setKeyHash: updatable settings for Chainlink VRF
- setTicketPrice, setMaxRiders, setHouse: adjusts parameters for the game

#### Contract Functions
- getRandomNumber: when maxRiders are met, call this to trigger VRF call. Only called internally.
- fulfillRandomness: only callable by Chainlink VRF Coordinator
  - Assigns winner
  - Pays out winnings
  - Reset's the contract state for next round


---

## Installation & Requirements


---

## Addresses & Links

### This Contract
Rinkeby Contract Address: 0x68b50434118e7839c6ce0f8054a50F9aD9B9D134

### Chainlink Data
VRF Addresses: https://docs.chain.link/docs/vrf-contracts/
LINK & ETH Faucet: https://faucets.chain.link/rinkeby

---

## Contributors
