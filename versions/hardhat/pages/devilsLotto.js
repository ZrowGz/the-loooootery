import React, { useEffect, useState } from "react";
import { DEVIL_TRAIN_LOTTO_ADDRESS } from "../lib/constants";
import { connectToContract } from "../lib/connectToContract";
import WavePortal from "../public/contracts/WavePortal.json";
import { wave } from "../lib/wavePortal/wave";
import { getAllWaves } from "../lib/wavePortal/getAllWaves";
import { checkIfWalletIsConnected } from "../lib/checkIfWalletIsConnected";
import { useForm } from "react-hook-form";
import { Grid, Typography, Link, Button } from "@mui/material";
import {styleApp, styleTitleText} from "../components/SharedStyles";
import theme from "../lib/theme";
import { CircularProgress } from "@mui/material";
import Footer from "../components/Footer";
import DevilTrainLottery from "../public/contracts/DevilTrainLottery.json";
import { buyTicket } from "../lib/devilsLotto/buyTicket";
import smile from '../public/assets/smile.jpg';
import Image from 'next/dist/client/image'; 


export default function waveportal(connectProps) {
  const { register, handleSubmit } = useForm();
  const { currentAccount } = connectProps;

  const [connectedContract, setConnectedContract] = useState(null);
  const [mining, setMining] = useState(false);
  const [ticketPrice, setTicketPrice] = useState();
  const [tripsTaken, setTripsTake] = useState(0);
  const [ticketSales, setTicketSales] = useState(0);
 
  const updateContract = async () => {
    const connectedContract = await connectToContract(
      DEVIL_TRAIN_LOTTO_ADDRESS,
      DevilTrainLottery.abi
    );
    console.log(connectedContract);
    setConnectedContract(connectedContract);
  };

  const callBuyTicket = async () => {
    console.log('buyTicket');
    if (connectedContract) {
     await buyTicket(connectedContract, setMining, setTicketSales, currentAccount);
    }
  };
 
  useEffect(() => {
    updateContract();
  }, []);

  useEffect(() => {
  }, [connectedContract]);

  return (
    <div style={styleApp}>
        <title>Project 3</title>
        <h1 class="header">Devil's Train</h1>
        <h2 class="under">Will you get lucky? Or will you get rolled?</h2>

        <p>Are you game?<br/>
        It is simple really...<br/> take a risk, if you dare...<br/>
        All you have to do is buy a ticket... <br/>the rest is <em>EASY PEASY</em></p>
        <Image src={smile} alt={`${smile.title} logo`}/>
        <p>Once you buy your ticket wait for the train to fill<br/>
        When all the riders are on board a signal is sent and <em>away we go</em><br/>
        Patience is a virtue and by the time the train is back at the station<br/>
            you will know if the Devil's Luck was on your side...
        </p>
        <div class="container">
            <div class="center">
                <Button class="button" type="button" onClick={callBuyTicket}>Take a Chance</Button>
            </div>
          </div>
    </div> 
    )
}
