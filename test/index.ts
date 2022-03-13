import { expect } from "chai";
import { ethers } from "hardhat";

describe("TextToken", function () {
  it("Should return the new greeting once it's changed", async function () {
    const text = 'hello word'

    const TextToken = await ethers.getContractFactory("TextToken");
    const textToken = await TextToken.deploy();
    await textToken.deployed();

    const setTextTx = await textToken.safeMint(text);

    // wait until the transaction is mined
    await setTextTx.wait();

    expect(await textToken.getText(0)).to.equal(text);
  });
});
