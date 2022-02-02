# the-loooootery

## About
An on-chain lottery game where users buy the ticket for a flat fee. Winner is chosen randomly and all funds in the contract are paid out to the winner! Are you brave enough to take a ride on the dev

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

#### Contract-Only Functions
- getRandomNumber: when maxRiders are met, call this to trigger VRF call. Only called internally.
- fulfillRandomness: only callable by Chainlink VRF Coordinator
  - Assigns winner
  - Pays out winnings
  - Reset's the contract state for next round


---

## Installation & Requirements

###Requirements

***warning:*** *using `sudo` when installing node & it's components may result in permissions issues*
- npm 
- nodejs version 16
- npx
- git

You will need to obtain:
- API keys for access to Rinkeby (alchemy?)
- The private key (not seedphrase) from your ethereum wallet
- Access to Rinkeby Testnet
- Some Rinkeby test ether

Replace [`sample.env`](README.md) fields with your own data and save as `.env`

To install the repo, download the repository using
```shell
git clone https://github.com/ZrowGz/the-loooootery.git
```

Then, from the CLI at the root of this new directory run each:
- `npm install`
- `npx hardhat compile`
- `npx hardhat run --network rinkeby scripts/DevilTrainLotto/deploy.js;`
- `npm run dev`

Open a web browser and navigate to: `localhost:3000`

- Can also verify deployement using: `npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS` <--Replace this with your deployed contract's address

---

## Addresses & Links

<<<<<<< HEAD
### This Contract
Rinkeby Contract Address: 0x68b50434118e7839c6ce0f8054a50F9aD9B9D134
=======
### On Rinkeby Testnet
Contract Address: 0x1734b93e6916B363D3A74CeCC06086A3F8F6C800  
House Multisig (gnosis safe): 0x1DfF53Bbb4D478161dF0b0D51B8Bc942108bE055
>>>>>>> cbcacd86e82527653294bdae73cbce5a0723d95e

### Chainlink Data
VRF Addresses: https://docs.chain.link/docs/vrf-contracts/
LINK & ETH Faucet: https://faucets.chain.link/rinkeby

---

## Contributors
