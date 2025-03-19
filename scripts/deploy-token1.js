const hre = require("hardhat");

async function main() {
  const Token1 = await hre.ethers.getContractFactory("Token1");
  const token1 = await Token1.deploy(1000000); // 1 million tokens

  await token1.deployed();

  console.log("Token1 deployed to:", token1.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
