import { ethers } from "ethers";

export const buyTicket = async (connectedContract, setMining, setTicketSales, currentAccount) => {
    console.log('BuyTicket');
    console.log({connectedContract});
    try {
        const ticketPrice = await connectedContract.ticketPrice();
        const buyTicketTxn = await connectedContract.buyTicket({value: ticketPrice});
        console.log("Mining...", buyTicketTxn.hash);

        setMining(true);
        await buyTicketTxn.wait();
        console.log("Mined -- ", buyTicketTxn.hash);


        const count = await connectedContract.setTicketSales();
        console.log('Retrieved total wave count...', count.toNumber());
        setMining(false);
        setCount(count);
    } catch (error) {
      console.log(error)
    }
}