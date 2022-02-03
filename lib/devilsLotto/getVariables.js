import { selectUnstyledClasses } from "@mui/base";

export const getVariables = async (connectedContract, setPrice, setRides, setSales) => {
    console.log('initializing Variables...');
    console.log(connectedContract);
    try {
      const price = await connectedContract.getWinner();
      //const rides = await connectedContract.tripsTaken();
      //const sales = await connectedContract.ticketSales();
      //const winner = await connectedContract.getWinner();
        await price.wait();
    //   setPrice(price);
    //   setRides(rides);
    //   setSales(sales);
    //   setWinner(winner);
        console.log('Variables obtained', price);
        //const price = await connectedContract.setWinner();
        return price; //, rides, sales, winner;
    } catch (error) {
      console.log(error);
    }
  };