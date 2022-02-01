import React, { useState } from "react";
import {styleTitleText, styleSubText, styleApp, styleLink, styleHeader, styleContainer} from '../components/SharedStyles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FriendsCards from "../components/Friends";




// Constants
const TWITTER_HANDLE = 'jonValjonathan';
const RINKEBY_FACUET = 'https://buildspace-faucet.vercel.app/';
const RINKEBY_FACUET2 = 'https://faucet.rinkeby.io/';

const index = () => {
  
  return (
    <div style={styleApp}>
          <Grid container spacing={2} algin="center">
            <Grid item xs={12}>
              <h1 style={styleTitleText}>Buildspace.co Knowledge Session</h1>
              <p style={styleSubText}>
                Three follow-along, text-based projects.
                <br/> 
                <br/>
                Write, compile, and deploy your first smart contracts.
                <br/>
                <br/>
                Connect your app to the Ethereum blockchain.
                <br/>
                <br/>
                Create a front-end to send transactions and view blockchain data. 
              </p>
            </Grid>
            <Grid item xs={12}>
                <h1 style={styleTitleText}> Step 1: Get Rinkeby Test ETH</h1>
                <Link href={RINKEBY_FACUET} style={styleLink}> Faucet 1</Link>
                <br />
                <Link href={RINKEBY_FACUET2} style={styleLink}> Faucet 2</Link>
              </Grid>
              <Grid item xs={12}>
                <h1 style={styleTitleText}> Project 1: Wave Portal</h1>
                <p> Deploy your first smart contract on the Rinkeby test network.</p>
                <p> Create a web3 front-end to interact with your contract.</p>
                <p> Send transactions to the blockchain with message data.</p>
                <p> Query your contract and retrieve data from the blockchain.</p>
              </Grid>
              <Grid item xs={12}>
                <h1 style={styleTitleText}>Project 2: Mint an NFT</h1>
                <p>Use OpenZeppelin to mint generative ERC721s.</p>
                <p>Dive further into etherjs front-ends.</p>
                <p>View your NFTs on Opensea and Rarible.</p>
              </Grid>
              <Grid item xs={12}>
                <h1 style={styleTitleText}>Project 3: NFT Game</h1>
                <p>Create your own mini turn-based NFT browser game.</p>
                <p>Create transactions that alter the state of your NFTs.</p>
                <p>View state changes on OpenSea.</p>
              </Grid>
              <FriendsCards />
          </Grid>          
      </div> 
  );
};

export default index;
