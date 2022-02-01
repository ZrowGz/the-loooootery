export const wave = async (message, connectedContract, setMining, setCount) => {
    console.log('WAVE');
    console.log(connectedContract);
    try {

        const waveTxn = await connectedContract.wave(message);
        console.log("Mining...", waveTxn.hash);

        setMining(true);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);


        const count = await connectedContract.getTotalWaves();
        console.log('Retrieved total wave count...', count.toNumber());
        setMining(false);
        setCount(count);
    } catch (error) {
      console.log(error)
    }
}