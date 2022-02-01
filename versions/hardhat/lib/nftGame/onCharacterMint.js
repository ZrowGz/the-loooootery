import { transformCharacterData } from "../transformCharacterData";
export const onCharacterMint = async (sender, tokenId, characterIndex, gameContract) => {
    console.log(
      `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
    );

    /*
     * Once our character NFT is minted we can fetch the metadata from our contract
     * and set it in state to move onto the Arena
     */
    if (gameContract) {
      const characterNFT = await gameContract.checkIfUserHasNFT();
      console.log('CharacterNFT: ', characterNFT);
      return transformCharacterData(characterNFT);
    }
  };