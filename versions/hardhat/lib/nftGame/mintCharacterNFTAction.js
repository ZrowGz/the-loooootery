export const mintCharacterNFTAction = async (characterId, gameContract, setIsLoading) => {
    try {
        if (gameContract) {
          console.log('Minting character in progress...');
          setIsLoading(true);
          const mintTxn = await gameContract.mintCharacterNFT(characterId);
          await mintTxn.wait();
          setIsLoading(false);
          console.log('mintTxn:', mintTxn);
        }
      } catch (error) {
        console.warn('MintCharacterAction Error:', error);
      }

}