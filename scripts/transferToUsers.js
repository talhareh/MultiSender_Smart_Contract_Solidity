const hre = require("hardhat");

async function main() {
  const WalletNumberMapping = await hre.ethers.getContractFactory("WalletNumberMapping");
  const contract = await WalletNumberMapping.attach("0xAdA786668326a88F37679AE15E8e652ca9381b8E"); 

  // Distribute tokens
  
  
  const tx = await contract.distributeTokens();
  await tx.wait();
  console.log("Tokens distributed to all wallets");
  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });