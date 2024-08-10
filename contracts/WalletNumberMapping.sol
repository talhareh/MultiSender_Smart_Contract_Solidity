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
    event WalletRemoved(address indexed wallet);
    
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

    function getWalletNumber(address _wallet) public view returns (uint256) {
        return walletNumbers[_wallet];
    }

    // Updated function to return both addresses and their associated numbers
    function getAllWalletAddresses() public view returns (address[] memory, uint256[] memory) {
        uint256[] memory numbers = new uint256[](walletAddresses.length);
        for (uint i = 0; i < walletAddresses.length; i++) {
            numbers[i] = walletNumbers[walletAddresses[i]];
        }
        return (walletAddresses, numbers);
    }

    function getWalletCount() public view returns (uint256) {
        return walletAddresses.length;
    }

    function distributeTokens() public onlyOwner {
        for (uint i = 0; i < walletAddresses.length; i++) {
            address wallet = walletAddresses[i];
            uint256 amount = walletNumbers[wallet];
            
            require(token.transfer(wallet, amount), "Token transfer failed");
            emit TokensDistributed(wallet, amount);
        }
    }

    function removeWallets(address[] memory _walletsToRemove) public onlyOwner {
        for (uint i = 0; i < _walletsToRemove.length; i++) {
            address walletToRemove = _walletsToRemove[i];
            
            // Find the index of the wallet in the array
            for (uint j = 0; j < walletAddresses.length; j++) {
                if (walletAddresses[j] == walletToRemove) {
                    // Remove the wallet from the array by replacing it with the last element
                    walletAddresses[j] = walletAddresses[walletAddresses.length - 1];
                    walletAddresses.pop();
                    
                    // Remove the wallet from the mapping
                    delete walletNumbers[walletToRemove];
                    
                    emit WalletRemoved(walletToRemove);
                    break;
                }
            }
        }
    }
}