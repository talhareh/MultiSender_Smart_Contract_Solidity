// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Minimal interface for an ERC-20 token contract
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract WalletNumberMapping {
    
    mapping(address => uint256) public walletNumbers;
    address[] public walletAddresses;
    IERC20 public token; // ERC-20 token contract
    address public owner;
    
    event WalletNumberAdded(address indexed wallet, uint256 number);
    event TokensDistributed(address indexed wallet, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
        owner = msg.sender;
    }
    
    function addWalletNumbers(address[] memory _wallets, uint256[] memory _numbers) public onlyOwner {
        require(_wallets.length == _numbers.length, "Arrays must have the same length");

        for (uint i = 0; i < _wallets.length; i++) {
            address wallet = _wallets[i];
            uint256 number = _numbers[i];
            
            if (walletNumbers[wallet] == 0) {
                walletAddresses.push(wallet);
            }
            walletNumbers[wallet] = number;
            emit WalletNumberAdded(wallet, number);
        }
    }

    // Function to get the number associated with a wallet address
    function getWalletNumber(address _wallet) public view returns (uint256) {
        return walletNumbers[_wallet];
    }

    // Function to get all wallet addresses
    function getAllWalletAddresses() public view returns (address[] memory) {
        return walletAddresses;
    }

    // Function to get the total count of wallet addresses
    function getWalletCount() public view returns (uint256) {
        return walletAddresses.length;
    }

    // Function to distribute tokens based on wallet numbers
    function distributeTokens() public onlyOwner {
        for (uint i = 0; i < walletAddresses.length; i++) {
            address wallet = walletAddresses[i];
            uint256 amount = walletNumbers[wallet];
            
            // Transfer the tokens
            require(token.transfer(wallet, amount), "Token transfer failed");
            emit TokensDistributed(wallet, amount);
        }
    }
}
