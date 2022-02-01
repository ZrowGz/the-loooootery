# Version Explainer
Optimally, each of these different routes would be used on a separate git develop branch. This is an attempt to reassemble versions optimally. Think of Base as the main branch, that is live on-chain currently, with no website integration. The rest are attempts to create a web3 integration.

This will all be pushed to github on a branch called `version-summary` so as to not impact the main branch.

---

## BASE
Base is simply the contract and the html. There is no web3 integration with this component. The contract is deployed per the main README.md

## HTML
The html directory is the attempt to integrate the website directly to the contract using web3 called in as a script. 

## REACT
This contains the src files that we initially modified and later removed from the Truffle deployement. The original files can be found at https://github.com/dappuniversity/chainlink_betting_game

## TRUFFLE
This is a base Truffle initialization, but with modifications made to the /client/public/src/ files relevant to a web3 integration.
