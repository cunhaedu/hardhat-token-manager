import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Token, Token__factory as TokenFactoryType } from "../typechain";

describe("Token", () => {
  let TokenFactory: TokenFactoryType;
  let token: Token;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  // eslint-disable-next-line no-unused-vars
  let addresses: SignerWithAddress[];

  beforeEach(async () => {
    TokenFactory = await ethers.getContractFactory("Token");
    token = await TokenFactory.deploy();
    // eslint-disable-next-line no-undef
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", () => {
    it("Should transfer tokens between accounts", async () => {
      await token.transfer(addr1.address, 50);
      const address1Balance = await token.balanceOf(addr1.address);
      expect(address1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      const address2Balance = await token.balanceOf(addr2.address);
      expect(address2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.address, 50);

      const finalOwnerBalance = await token.balanceOf(owner.address);

      expect(finalOwnerBalance).to.equal(initialOwnerBalance.toNumber() - 150);

      const address1Balance = await token.balanceOf(addr1.address);
      expect(address1Balance).to.equal(100);

      const address2Balance = await token.balanceOf(addr2.address);
      expect(address2Balance).to.equal(50);
    });
  });
});
