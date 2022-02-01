import React, { useEffect, useState } from 'react';

import { getCharacters} from '../../lib/nftGame/getCharacters';
import { onCharacterMint } from '../../lib/nftGame/onCharacterMint';

import { CharacterCards } from './CharacterCards';
//import './SelectCharacter.css';

/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const SelectCharacter = ({ setCharacterNFT, gameContract, setIsLoading }) => {
    const [characters, setCharacters] = useState([]);


    const callSetCharacters = async () => {
        const freshCharacters = await getCharacters(gameContract);
        setCharacters(freshCharacters);
    }

    const callOnCharacterMint = async (sender, tokenId, characterIndex) => {
        const freshCharacter = await onCharacterMint(sender, tokenId, characterIndex, gameContract);
        setCharacterNFT(freshCharacter);
    };

    
    const characterCardProps = { characters, gameContract, setIsLoading};

    useEffect(() => {
        if (gameContract) {
          setIsLoading(true);
          callSetCharacters();
          setIsLoading(false);
          gameContract.on('CharacterNFTMinted', callOnCharacterMint);
        }

        return () => {
            /*
             * When your component unmounts, let;s make sure to clean up this listener
             */
            if (gameContract) {
              gameContract.off('CharacterNFTMinted', callOnCharacterMint);
            }
        }
      }, [gameContract]);

      

    return (
         <CharacterCards {...characterCardProps} />
    )
  };

export default SelectCharacter;