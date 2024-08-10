require("@nomicfoundation/hardhat-toolbox");

const {mnemonic, bscscanApiKey} = require('./secrets.json');

module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    bscMainnet:{
      url:"https://bsc-pokt.nodies.app",
      chainId:56,
      gasPrice: 50000000000,
      accounts:{mnemonic:mnemonic}
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: bscscanApiKey
  }
};
