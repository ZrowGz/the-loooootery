export const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

      let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4"; 
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;

    } else {
      console.log("We have the ethereum object", ethereum);
    }
    
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        return account;
    } else {
        console.log("No authorized account found")
        return '';
    }
  };

