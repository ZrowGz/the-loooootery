import { transformCharacterData } from "../transformCharacterData";


export const checkIfUserHasNFT = async (gameContract) => {
  console.log('checkIfUserHasNFT');
    try {
        let txn = await gameContract.checkIfUserHasNFT();
        if (txn.name) {
            console.log('User has character NFT');
            return (transformCharacterData(txn));
          } else {
            console.log('No character NFT found');
          }
    } catch (error) {
      console.log(error)
    }
  }