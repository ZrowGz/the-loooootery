import { ethers } from "ethers";


export const connectToContract = async (contractAdress, abi) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // 3 params we need to connect to our contract
        const connectedContract = new ethers.Contract(contractAdress, abi, signer);
        return connectedContract;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }