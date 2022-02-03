import React, { useEffect, useState } from "react";
import { DEVIL_TRAIN_LOTTO_ADDRESS } from "../lib/constants";
import { connectToContract } from "../lib/connectToContract";
import { checkIfWalletIsConnected } from "../lib/checkIfWalletIsConnected";
import { Grid, Typography, Link, Button } from "@mui/material";
import {styleApp, styleTitleText, styleBodyText, styleSubtitle1Text, styleConnectButton, stylePlayButton} from "../components/SharedStyles";
import theme from "../lib/theme";
import { CircularProgress } from "@mui/material";
import DevilTrainLottery from "../public/contracts/DevilTrainLottery.json";
import { buyTicket } from "../lib/devilsLotto/buyTicket";
import smile from '../public/assets/smile.jpg';
//import train from '../public/assets/dark_train.jpg';
import Image from 'next/dist/client/image'; 
//import { currentTicketPrice } from "../lib/devilsLotto/getTicketPrice";
//import { getLastWinner } from "../lib/devilsLotto/getLastWinner";
// import { getVariables } from "../lib/devilsLotto/getVariables";
// import { ethers } from "ethers";


export default function devilstrainlotto(connectProps) {

  const { currentAccount } = connectProps;

  const [connectedContract, setConnectedContract] = useState(null);
  const [mining, setMining] = useState(false);
  const [count, setCount] = useState(0);
  //const [price, setTicketPrice] = useState();
  // const [rides, setRides] = useState(0);
  // const [sales, setSales] = useState(0);
  // const [winner, setWinner] = useState(0);
  //const price = useState();
 
  const updateContract = async () => {
    const connectedContract = await connectToContract(
      DEVIL_TRAIN_LOTTO_ADDRESS,
      DevilTrainLottery.abi
    );
    console.log(connectedContract);
    setConnectedContract(connectedContract);
  };

  // const updateVariables = async () => {
  //   console.log('Update Variables');
  //   if (connectedContract) {
  //    await getVariables(connectedContract, setPrice, price); //, sales, winner);
  //   }
  // };

  // const setVariables = async () => {
  //   const provider = new ethers.providers.Web3Provider()
  // }


  const callBuyTicket = async () => {
    console.log('buyTicket');
    if (connectedContract) {
     await buyTicket(connectedContract, setMining, currentAccount); //removed setTicketPrice
    }
  };
 
  useEffect(() => {
    updateContract();
  }, []);

  // useEffect(() => {
  //   updateVariables();
  // }, []);


  useEffect(() => {
  }, [connectedContract]);

  return (
    <div style={styleApp}>
      <Grid container spacing={2} align="center">
        <Grid item xs={12} style={{paddingTop:"5%"}}>
          <Typography style={styleTitleText}>
            Devil's Train
          </Typography>
        </Grid>
        <Grid item xs={12} style={{paddingTop:"5%"}}>
          <Typography style={styleSubtitle1Text}>
            Will you get lucky? Or will you get rolled?
            <br/>
            Please connect MetaMask to Rinkeby
          </Typography>
        </Grid>
        <br/>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography style={styleBodyText}>
              Are you game?
              <br/>
              It is simple really...<br/> take a risk, if you dare...<br/>
              All you have to do is buy a ticket... 
              <br/>
              the rest is <em>EASY PEASY</em>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography style={styleBodyText}>
              <Image src={smile} alt={`${smile.title}`}/>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography style={styleBodyText}>
              Once you buy your ticket wait for the train to fill
              <br/>
              When all the riders are on board a signal is sent and <em>away we go</em>
              <br/>
              Patience is a virtue and by the time the train is back at the station
              <br/>
              you will know if the Devil's Luck was on your side...
        
            </Typography>
          </Grid>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
              <div>
                <div>
                  <Button style={stylePlayButton} onClick={callBuyTicket}>
                    Take a Chance
                  </Button>
                  <br/>
                  {/* <Button style={styleConnectButton} onClick={updateContract}>
                    Get Data
                  </Button>
                  <br/>
                  {`Ticket Price: ${price}`}
                  <br/>  */}
                  {/* {`Total Rounds: ${rides}`}
                  <br/> 
                  {`Total Payout: ${sales}`}
                  <br/> 
                  {`Most Recent Winner: ${winner}`}
                  <br/>  */}
                  {mining === true? (
                    <Grid item xs={12}>
                      <CircularProgress align="center"/>
                    </Grid>
                  ): null}
                </div>
              </div>
          </Grid>
          {/* <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography variant='h1' style={styleTitleText}>
              {`Trips Taken: ${tripsTaken}`}
              {`Total Payouts: ${ticketSales}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          {allWaves.map((wave, index) => {
            return (
                <div
                key={index}
                style={{
                    marginTop: "16px",
                    padding: "8px",
                }}
                >
                <div>Address: {wave.address}</div>
                <div>Time: {wave.timestamp.toString()}</div>
                <div>Message: {wave.message}</div>
                </div>
            );
            })}
            </Grid> */}
        </Grid>
      </div> 
    )
};
