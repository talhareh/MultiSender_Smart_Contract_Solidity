const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const ERC20 = await hre.ethers.getContractAt("IERC20", "0x8BA94BD9037982BBE4cF754222F3650548d48E36");
  const amount = hre.ethers.parseUnits("8000", 18); // Adjust amount as needed

  // Transfer tokens from the owner wallet to the contract
  const tx = await ERC20.transfer("0x18B97eb65801380C2D4026B7Af3FccCb7B45f053", amount);
  await tx.wait();
  console.log(`Transferred ${amount.toString()} TRUMP tokens to WalletNumberMapping contract`);
}

main().catch((error) => {
  console.error("Error in script:", error);
  process.exitCode = 1;
});