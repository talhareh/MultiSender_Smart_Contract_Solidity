const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const ERC20 = await hre.ethers.getContractAt("IERC20", "0x8BA94BD9037982BBE4cF754222F3650548d48E36");
  const amount = hre.ethers.parseUnits("9500", 18); // Adjust amount as needed

  // Transfer tokens from the owner wallet to the contract
  const tx = await ERC20.transfer("0xEce5D42C0095d2e9DF8A796802dCFa794D98130a", amount);
  await tx.wait();
  console.log(`Transferred ${amount.toString()} TRUMP tokens to WalletNumberMapping contract`);
}

main().catch((error) => {
  console.error("Error in script:", error);
  process.exitCode = 1;
});