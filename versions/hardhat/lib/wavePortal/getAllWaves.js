export const getAllWaves = async (connectedContract, setAllWaves, setCount) => {
  console.log('getAllWaves');
  console.log(connectedContract);
  try {
    const waves = await connectedContract.getAllWaves();
    const count = await connectedContract.getTotalWaves();

    let wavesCleaned = [];
    waves.forEach((wave) => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      });
    });

    setAllWaves(wavesCleaned);
    setCount(count);
  } catch (error) {
    console.log(error);
  }
};
