const hre = require("hardhat");

async function main() {
  // Replace with your token and exchange addresses
  const token1Address = "0x3cf59aBB95Aa0D7c9dCae3527314A0DdD6c7717a";
  const token2Address = "0x92e979eE109e62AC9aEdBD8171756e32C4229393";
  const exchangeAddress = "0x66b55d43C25900EB09a3146df79AaF254e37239f";
  
  // Amount to approve (adjust as needed)
  const approvalAmount = ethers.utils.parseUnits("1000", 18); // 1,000 tokens

  // Get token contracts
  const Token1 = await hre.ethers.getContractAt("Token1", token1Address);
  const Token2 = await hre.ethers.getContractAt("Token2", token2Address);
  
  // Approve exchange to spend tokens
  const tx1 = await Token1.approve(exchangeAddress, approvalAmount);
  await tx1.wait();
  console.log(`Approved exchange to spend ${ethers.utils.formatUnits(approvalAmount, 18)} Token1`);
  
  const tx2 = await Token2.approve(exchangeAddress, approvalAmount);
  await tx2.wait();
  console.log(`Approved exchange to spend ${ethers.utils.formatUnits(approvalAmount, 18)} Token2`);
  
  // Get allowances to verify
  const allowance1 = await Token1.allowance(await Token1.signer.getAddress(), exchangeAddress);
  const allowance2 = await Token2.allowance(await Token2.signer.getAddress(), exchangeAddress);
  
  console.log(`Exchange allowance for Token1: ${ethers.utils.formatUnits(allowance1, 18)}`);
  console.log(`Exchange allowance for Token2: ${ethers.utils.formatUnits(allowance2, 18)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
