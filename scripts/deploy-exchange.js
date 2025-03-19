const hre = require("hardhat");

async function main() {
  const token1Address = "0x3cf59aBB95Aa0D7c9dCae3527314A0DdD6c7717a";
  const token2Address = "0x92e979eE109e62AC9aEdBD8171756e32C4229393";
  const rateNumerator = 1;
  const rateDenominator = 2;

  const TokenExchange = await hre.ethers.getContractFactory("TokenExchange");
  const exchange = await TokenExchange.deploy(
    token1Address,
    token2Address,
    rateNumerator,
    rateDenominator
  );

  await exchange.deployed();

  console.log("TokenExchange deployed to:", exchange.address);
  console.log("With exchange rate:", rateNumerator, ":", rateDenominator);
  console.log("Token1 address:", token1Address);
  console.log("Token2 address:", token2Address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
