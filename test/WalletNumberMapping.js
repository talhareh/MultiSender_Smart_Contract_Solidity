const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WalletNumberMapping", function () {
  let WalletNumberMapping;
  let walletNumberMapping;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    WalletNumberMapping = await ethers.getContractFactory("WalletNumberMapping");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new WalletNumberMapping contract before each test
    walletNumberMapping = await WalletNumberMapping.deploy();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(walletNumberMapping.address).to.be.properAddress;
    });
  });

  describe("Adding wallet numbers", function () {
    it("Should add wallet numbers correctly", async function () {
      const wallets = [addr1.address, addr2.address];
      const numbers = [100, 200];

      await walletNumberMapping.addWalletNumbers(wallets, numbers);

      expect(await walletNumberMapping.getWalletNumber(addr1.address)).to.equal(100);
      expect(await walletNumberMapping.getWalletNumber(addr2.address)).to.equal(200);
    });

    it("Should emit WalletNumberAdded event", async function () {
      const wallets = [addr1.address];
      const numbers = [100];

      await expect(walletNumberMapping.addWalletNumbers(wallets, numbers))
        .to.emit(walletNumberMapping, "WalletNumberAdded")
        .withArgs(addr1.address, 100);
    });

    it("Should revert if arrays have different lengths", async function () {
      const wallets = [addr1.address, addr2.address];
      const numbers = [100];

      await expect(walletNumberMapping.addWalletNumbers(wallets, numbers))
        .to.be.revertedWith("Arrays must have the same length");
    });
  });

  describe("Getting wallet information", function () {
    beforeEach(async function () {
      const wallets = [addr1.address, addr2.address];
      const numbers = [100, 200];
      await walletNumberMapping.addWalletNumbers(wallets, numbers);
    });

    it("Should return correct wallet number", async function () {
      expect(await walletNumberMapping.getWalletNumber(addr1.address)).to.equal(100);
      expect(await walletNumberMapping.getWalletNumber(addr2.address)).to.equal(200);
    });

    it("Should return all wallet addresses", async function () {
      const allAddresses = await walletNumberMapping.getAllWalletAddresses();
      expect(allAddresses).to.have.lengthOf(2);
      expect(allAddresses).to.include(addr1.address);
      expect(allAddresses).to.include(addr2.address);
    });

    it("Should return correct wallet count", async function () {
      expect(await walletNumberMapping.getWalletCount()).to.equal(2);
    });
  });

  describe("Updating existing wallet numbers", function () {
    it("Should update existing wallet numbers correctly", async function () {
      await walletNumberMapping.addWalletNumbers([addr1.address], [100]);
      await walletNumberMapping.addWalletNumbers([addr1.address], [200]);

      expect(await walletNumberMapping.getWalletNumber(addr1.address)).to.equal(200);
      expect(await walletNumberMapping.getWalletCount()).to.equal(1);
    });
  });
});