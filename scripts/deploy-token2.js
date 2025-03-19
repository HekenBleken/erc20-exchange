const hre = require("hardhat");

async function main() {
  const Token2 = await hre.ethers.getContractFactory("Token2");
  const token2 = await Token2.deploy(2000000); // 2 million tokens

  await token2.deployed();

  console.log("Token2 deployed to:", token2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

