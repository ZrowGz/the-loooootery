import Link from 'next/link';
import Image from 'next/dist/client/image';
import Grid from '@mui/material/Grid';
import { Button, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import {stylePaper } from '../SharedStyles';
import { mintCharacterNFTAction } from '../../lib/nftGame/mintCharacterNFTAction';

export const CharacterCards = (characterCardProps) => {
    const {characters, setIsLoading, gameContract} = characterCardProps;
    console.log(characters);

    if (characters){
        return (
                <Grid container spacing={2} align="center">
                <Grid item xs={12}>
                    <h2>Mint Your Hero. Choose wisely.</h2>
                </Grid>
                {characters.map((character, index) => (
                        <Grid item xs={4} key={index}>
                            <Paper style={stylePaper}>
                                <Typography>
                                    {character.name}
                                </Typography>
                                <Image width={"350px"} height={"350px"} src={character.imageURI} alt={`${character.name} logo`}/>
                                <Button onClick={() => mintCharacterNFTAction(index, gameContract, setIsLoading)}>
                                    {`Mint ${character.name}`}
                                </Button>
                            </Paper>
                        </Grid>
                    ))
                    }
                </Grid>
        );
        }
    };
