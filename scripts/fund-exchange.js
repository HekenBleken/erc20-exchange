const hre = require("hardhat");

async function main() {
  // Replace with your token and exchange addresses
  const token1Address = "0x3cf59aBB95Aa0D7c9dCae3527314A0DdD6c7717a";
  const token2Address = "0x92e979eE109e62AC9aEdBD8171756e32C4229393";
  const exchangeAddress = "0x66b55d43C25900EB09a3146df79AaF254e37239f";
  
  // Amount to transfer to the exchange (adjust as needed)
  const token1Amount = ethers.utils.parseUnits("10000", 18); // 10,000 Token1
  const token2Amount = ethers.utils.parseUnits("20000", 18); // 20,000 Token2

  // Get contract instances
  const Token1 = await hre.ethers.getContractAt("Token1", token1Address);
  const Token2 = await hre.ethers.getContractAt("Token2", token2Address);
  
  // Transfer tokens to the exchange
  const tx1 = await Token1.transfer(exchangeAddress, token1Amount);
  await tx1.wait();
  console.log(`Transferred ${ethers.utils.formatUnits(token1Amount, 18)} Token1 to the exchange`);
  
  const tx2 = await Token2.transfer(exchangeAddress, token2Amount);
  await tx2.wait();
  console.log(`Transferred ${ethers.utils.formatUnits(token2Amount, 18)} Token2 to the exchange`);
  
  // Get balances to verify
  const balance1 = await Token1.balanceOf(exchangeAddress);
  const balance2 = await Token2.balanceOf(exchangeAddress);
  
  console.log(`Exchange now has ${ethers.utils.formatUnits(balance1, 18)} Token1`);
  console.log(`Exchange now has ${ethers.utils.formatUnits(balance2, 18)} Token2`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
