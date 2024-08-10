const hre = require("hardhat");

async function main() {
  const WalletNumberMapping = await hre.ethers.getContractFactory("WalletNumberMapping");
  const contract = await WalletNumberMapping.attach("0xEce5D42C0095d2e9DF8A796802dCFa794D98130a");

  // Add wallet numbers
  
  
//   await contract.addWalletNumbers(
//     [
//       "0x7957EE2EC7A28a2eFb0286b85bfe59AB8868B764", 
//       "0x59EE15dCeAA800CC03357e33548fD571DD2Ab883"
//     ], 
//     [hre.ethers.parseUnits('600', 18), hre.ethers.parseUnits('1800', 18)]
//   );
//   console.log("Wallet numbers added");
  

  // Distribute tokens
  
  
//   const tx = await contract.distributeTokens();
//   await tx.wait();
//   console.log("Tokens distributed to all wallets");
  

  // Get a wallet number
//   const number = await contract.getWalletNumber("0x7957EE2EC7A28a2eFb0286b85bfe59AB8868B764");
//   console.log("Wallet 0x7957EE2EC7A28a2eFb0286b85bfe59AB8868B764:", number.toString());

  // Get all wallet addresses and their associated numbers
  const [addresses, numbers] = await contract.getAllWalletAddresses();
  console.log("All addresses and numbers:");
  addresses.forEach((address, index) => {
    console.log(`${address}: ${numbers[index]}`);
  });

  // Get wallet count
  const count = await contract.getWalletCount();
  console.log("Wallet count:", count.toString());

  // Remove wallets
  
//   await contract.removeWallets([
//     "0x7957EE2EC7A28a2eFb0286b85bfe59AB8868B764",
//   ]);
//   console.log("Wallets removed");
  

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