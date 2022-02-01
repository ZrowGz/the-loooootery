import React, { useEffect, useState } from "react";
import { WAVE_PORTAL_CONTRACT_ADDRESS } from "../lib/constants";
import { connectToContract } from "../lib/connectToContract";
import WavePortal from "../public/contracts/WavePortal.json";
import { wave } from "../lib/wavePortal/wave";
import { getAllWaves } from "../lib/wavePortal/getAllWaves";
import { checkIfWalletIsConnected } from "../lib/checkIfWalletIsConnected";
import { useForm } from "react-hook-form";
import { Grid, Typography, Link } from "@mui/material";
import {styleApp, styleTitleText} from "../components/SharedStyles";
import theme from "../lib/theme";
import { CircularProgress } from "@mui/material";
import Footer from "../components/Footer";



export default function waveportal(connectProps) {
  const { register, handleSubmit } = useForm();
  const { currentAccount } = connectProps;

  const [connectedContract, setConnectedContract] = useState(null);
  const [mining, setMining] = useState(false);
  const [allWaves, setAllWaves] = useState([]);
  const [count, setCount] = useState(0);

  const updateContract = async () => {
    const connectedContract = await connectToContract(
      WAVE_PORTAL_CONTRACT_ADDRESS,
      WavePortal.abi
    );
    console.log(connectedContract);
    setConnectedContract(connectedContract);
  };

  const updateWaves = async () => {
    console.log('updateWaves');
    if (connectedContract) {
     getAllWaves(connectedContract, setAllWaves, setCount);
    }
  };

  useEffect(() => {
    updateContract();
    updateWaves();
  }, []);

  useEffect(() => {
    updateWaves();
  }, [connectedContract]);


  const onSubmit = async (data) => {
    const waveResponse = await wave(
        data.message,
        connectedContract,
        setMining,
        setCount
      );
      await updateWaves();
  };
 
  return (
    <div style={styleApp}>
        <Grid container spacing={2} align="center">
          <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography variant='h1' style={styleTitleText}>
              Wave to the contract! 
            </Typography>
          </Grid>  
          {mining === true? (
            <Grid item xs={12}>
              <CircularProgress align="center"/>
            </Grid>
          ): null}
          <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Message:
                <input
                type="text"
                {...register("message")}
                />
            </label>
            <button className="waveButton" type="submit">
                Wave at Me
            </button>
          </form>
          </Grid>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography variant='h1' style={styleTitleText}>
              {`Total waves: ${count}`} 
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
            </Grid>
          </Grid>
          <Footer connectedContract={connectedContract} />
    </div> 
    )
}
