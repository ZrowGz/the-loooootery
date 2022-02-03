import * as React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../lib/theme';
import createEmotionCache from '../public/createEmotionCache';
import { Header } from '../components/Header.js';
import { checkIfWalletIsConnected } from '../lib/checkIfWalletIsConnected';
import { connectWallet } from '../lib/connect';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [currentAccount, setCurrentAccount] = useState("");
    console.log("_app")
    console.log(currentAccount);

    const setConnectWallet = () => {
        setCurrentAccount(connectWallet());
    }

    const updateCurrentAccount = async () => {
        const account = await checkIfWalletIsConnected();
        setCurrentAccount(account);
        console.log('afterCheckIfWalletISConnected');
        console.log(currentAccount);
    }
    
    useEffect(() => {
        updateCurrentAccount();
      }, []);
    
    const connectProps = {currentAccount, setConnectWallet};
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>The Devil's Train</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header {...connectProps}/>
        <Component {...pageProps} {...connectProps}/>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
