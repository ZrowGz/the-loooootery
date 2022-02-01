export const askContractToMintNft = async (connectedContract) => {
    try {
        let nftTxn = await connectedContract.makeAnEpicNFT();
       
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log('NewEpicNFTMinted');
          console.log({tokenId});
        });
        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        
        
        console.log({NFTzMinted})
    } catch (error) {
      console.log(error)
    }
  }