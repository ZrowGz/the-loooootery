// const hre = require("hardhat");

// const main = async () => {
//   console.log('strated');
//   const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
//   console.log(nftContractFactory);
//   const nftContract = await nftContractFactory.deploy();
//   await nftContract.deployed();
//   console.log("Contract deployed to:", nftContract.address);

//   let txn = await nftContract.makeAnEpicNFT();
//   await txn.wait();

//   txn = await nftContract.makeAnEpicNFT();
//   await txn.wait();
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();