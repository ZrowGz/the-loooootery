import { connectToContract } from "../connectToContract";
import { MINT_NFT_CONTRACT_ADDRESS } from "../constants";
import myEpicNft from '../../public/contracts/MyEpicNFT.json';


export const NFTzRemaining = async () => {
    try {
      const connectedContract = await connectToContract(MINT_NFT_CONTRACT_ADDRESS, myEpicNft.abi);

        console.log("NFTzRemaining");
        let tokenId = await connectedContract.getTokenId();
        
        console.log(tokenId.toNumber());

        return tokenId.toNumber()-1;
    } catch (error) {
      console.log(error)
    }
  }