Changes made for version 0.2:
- updated all payments to call instead of .transfer
- add record variable lastWinner
- adjust events based on the docs: [Events](https://docs.soliditylang.org/en/v0.8.11/contracts.html#events)
  - removed string from NewRider
  - removed `indexed` from value in TrainFull
  - emit `indexed` round & winner for ResultArrived
    - include round number
    - include winner as `address payable`
  - Moved NewRider up out of if/else
  - create event AwaitingRiders
  - add emit AwaitingRiders to else
- alter getRandomNumber to internal
- alter fulfillRandomness
  - change index to uint8 from uint to conserve gas
  - sets lastWinner to riders[index]
  - moved riders array reset before payout
  - change payout to lastWinner from riders[index]
  - add to ResultArrived: tripsTaken & change riders[index] to lastWinner
  - kept acceptingRiders as final action to prevent new riders in case of error
- alter emergencyRefund
  - remove payable
  - switch `house` removal method to riders.pop;
  - continue using riders.length in for loop iterations
  - ~~adjust house removal from delete riders.length - 1 to for loop using maxRiders~~
  - ~~change userValue to calculate based on maxRiders to compensate for ignoring house~~
- alter emergencyReboot 
  - to run by onlyOwner
  - remove payable
- Remove event emission from buyTicket in if maxRiders reached
- alter getRandomNumber to internal
- add getWinner

Troubleshooting:
- `house` cannot be multisig due to changes from Berlin fork, where it'd require 2600 gas
  - https://help.gnosis-safe.io/en/articles/5249851-why-can-t-i-transfer-eth-from-a-contract-into-a-safe
    - ADDED USING CALL
- Compiled 0.8.7

No Action: 
- Warning for fulfillRandomness, requestId unused
  - required by chainlink vrf to send
  - could be used for a future version where multiple rounds could happen simultaneously
    - would allow for individual player play, player vs house, or player vs player
    - https://docs.chain.link/docs/chainlink-vrf-best-practices/
- Consider receiving funds from rider at time of buyTicket vs added to riders.
  - more consistent revenue
  - more riders = more revenue vs fewer riders, faster rounds, but fewer riders = less chance of house. 
  - could add `if maxRiders <= 10, add house to riders; else transfer 5% to house`

New Deployement (Rinkeby):
Contract Address: 0x0E221b24AA33762D1Cc5B75Bb50d1B43cc72853a

Frontend
- website deployed: https://the-loooootery.vercel.app/

Frontend Needs:
- needs event listeners & notifications about round status
- mining spinner doesn't halt once mined
- display contract stats (ticket price, payouts, rides taken, current rider count & max riders)