const hre = require("hardhat");

async function main() {
  const WalletNumberMapping = await hre.ethers.getContractFactory("WalletNumberMapping");
  const contract = await WalletNumberMapping.attach("0xAdA786668326a88F37679AE15E8e652ca9381b8E");

  // Add wallet numbers
  
  
  await contract.addWalletNumbers(
    [
      "0x7957EE2EC7A28a2eFb0286b85bfe59AB8868B764", 
      "0x59EE15dCeAA800CC03357e33548fD571DD2Ab883"
    ], 
    [
      hre.ethers.parseUnits('100.8', 18), 
      hre.ethers.parseUnits('2000.6', 18)
    ]
  );
  console.log("Wallet numbers added");
  

  // Get all wallet addresses and their associated numbers
  const [addresses, numbers] = await contract.getAllWalletAddresses();
  console.log("All addresses and numbers:");
  addresses.forEach((address, index) => {
    console.log(`${address}: ${numbers[index]}`);
  });

  // Get wallet count
  const count = await contract.getWalletCount();
  console.log("Wallet count:", count.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });