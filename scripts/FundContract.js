const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const ERC20 = await hre.ethers.getContractAt("IERC20", "0x8BA94BD9037982BBE4cF754222F3650548d48E36");
  const amount = hre.ethers.parseUnits("1800", 18); 

                                     // Reciver wallet goes here 
  // Transfer tokens from the owner wallet to the contract
  const tx = await ERC20.transfer("0xAdA786668326a88F37679AE15E8e652ca9381b8E", amount);
  const response = await tx.wait();
  console.log(response)
  console.log(`Transferred ${amount.toString()} TRUMP tokens to WalletNumberMapping contract`);
}

main().catch((error) => {
  console.error("Error in script:", error);
  process.exitCode = 1;
});