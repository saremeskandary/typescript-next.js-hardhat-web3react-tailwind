import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const TextToken = await ethers.getContractFactory("TextToken");
  const textToken = await TextToken.deploy();

  await textToken.deployed();

  console.log("TextToken deployed to:", textToken.address);
  fs.writeFileSync(
    "./config.ts",
    `export const textContractAddress = "${textToken.address}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
