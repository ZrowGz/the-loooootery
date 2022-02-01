import { ethers } from "ethers";
export const transformBoss = (characterData) => {
    console.log('transformboss');
    console.log(characterData[0]);
    console.log(characterData[1]);
    console.log(characterData[2].toNumber());
    console.log(characterData[3].toNumber());
    console.log(characterData[4].toNumber());
    return {
      name: characterData[0],
      imageURI: characterData[1],
      hp: characterData[2].toNumber(),
      maxHp: characterData[3].toNumber(),
      attackDamage: characterData[4].toNumber(),
    };
  };