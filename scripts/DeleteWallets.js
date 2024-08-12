const hre = require("hardhat");

async function main() {
  const WalletNumberMapping = await hre.ethers.getContractFactory("WalletNumberMapping");
  const contract = await WalletNumberMapping.attach("0xAdA786668326a88F37679AE15E8e652ca9381b8E");

  // Get wallet count
  const count = await contract.getWalletCount();
  console.log("Wallet count:", count.toString());

  // Remove wallets
  
  await contract.removeWallets([
    "0x59EE15dCeAA800CC03357e33548fD571DD2Ab883",
    "0x7957EE2EC7A28a2eFb0286b85bfe59AB8868B764"
  ]);
  console.log("Wallets removed");
  

  // Get updated wallet count after removal
  const updatedCount = await contract.getWalletCount();
  console.log("Updated wallet count:", updatedCount.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });