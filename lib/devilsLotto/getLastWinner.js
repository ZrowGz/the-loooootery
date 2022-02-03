import { ethers } from "ethers";

export const getLastWinner = async (connectedContract, setMining, setTicketSales, currentAccount) => {
    console.log('LastWinner');
    console.log({connectedContract});
    try {
        const lastWinner = await connectedContract.lastWinner();
        //const buyTicketTxn = await connectedContract.buyTicket({value: ticketPrice});
        console.log("Got LastWinner", lastWinner);

        //setMining(true);
        //await buyTicketTxn.wait();
        //console.log("Mined -- ", buyTicketTxn.hash);


        const winner = await connectedContract.setTicketSales();
        console.log('Retrieved last winner', winner);
        setMining(false);
        setCount(count);
    } catch (error) {
      console.log(error)
    }
}