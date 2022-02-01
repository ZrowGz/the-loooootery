import { transformCharacterData } from "../transformCharacterData";

export const getCharacters = async (gameContract) => {
    try {
      console.log('Getting contract characters to mint');
      console.log(gameContract);

      const charactersTxn = await gameContract.getAllDefaultCharacters();
      console.log('charactersTxn:', charactersTxn);

      const characters = charactersTxn.map((characterData) =>
        transformCharacterData(characterData)
      );
      console.log({characters})  
      return characters;
    } catch (error) {
      console.error('Something went wrong fetching characters:', error);
    }
  };