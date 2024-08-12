const hre = require("hardhat");

async function main() {

  const tokenAddress = "0x8B1B075c0d661882f2383DD022bF0F18aC2a6B4F"; 

  const MyContract = await hre.ethers.getContractFactory("WalletNumberMapping");

  const myContract = await MyContract.deploy(tokenAddress);
  //console.log("Contract deployment transaction sent:", myContract.deployTransaction);

  await myContract.waitForDeployment();
  console.log("Contract deployed at address:", await myContract.getAddress());
}

main().catch((error) => {
  console.error("Error in script:", error);
  process.exitCode = 1;
});
