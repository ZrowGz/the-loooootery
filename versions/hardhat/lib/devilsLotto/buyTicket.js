import { ethers } from "ethers";

export const buyTicket = async (connectedContract, setMining, setTicketSales, currentAccount) => {
    console.log('BuyTicket');
    console.log({connectedContract});
    try {
        const overides = {value: ethers.utils.parseEther('.1')}
        const buyTicketTxn = await connectedContract.buyTicket(overides);
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