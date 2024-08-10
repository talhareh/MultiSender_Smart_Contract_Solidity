const hre = require("hardhat");

async function main() {

  const tokenAddress = "0x8BA94BD9037982BBE4cF754222F3650548d48E36"; 

  const MyContract = await hre.ethers.getContractFactory("WalletNumberMapping");

  const myContract = await MyContract.deploy(tokenAddress);
  console.log("Contract deployment transaction sent:", myContract.deployTransaction);

  await myContract.waitForDeployment();
  console.log("Contract deployed at address:", await myContract.getAddress());
}

main().catch((error) => {
  console.error("Error in script:", error);
  process.exitCode = 1;
});
