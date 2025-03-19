const hre = require("hardhat");

async function main() {
  // Replace with your exchange address
  const exchangeAddress = "0x66b55d43C25900EB09a3146df79AaF254e37239f";
  
  // Amount to swap (adjust as needed)
  const swapAmount = ethers.utils.parseUnits("10", 18); // 10 tokens

  // Get exchange contract
  const Exchange = await hre.ethers.getContractAt("TokenExchange", exchangeAddress);
  
  // Get token addresses from exchange contract
  const token1Address = await Exchange.token1();
  const token2Address = await Exchange.token2();
  
  // Get token contracts
  const Token1 = await hre.ethers.getContractAt("IERC20", token1Address);
  const Token2 = await hre.ethers.getContractAt("IERC20", token2Address);
  
  // Get initial balances
  const userAddress = await Token1.signer.getAddress();
  const initialToken1Balance = await Token1.balanceOf(userAddress);
  const initialToken2Balance = await Token2.balanceOf(userAddress);
  
  console.log(`Initial Token1 balance: ${ethers.utils.formatUnits(initialToken1Balance, 18)}`);
  console.log(`Initial Token2 balance: ${ethers.utils.formatUnits(initialToken2Balance, 18)}`);
  
  // Perform the swap (token1 for token2)
  console.log(`Swapping ${ethers.utils.formatUnits(swapAmount, 18)} Token1 for Token2...`);
  const tx = await Exchange.exchangeToken1ForToken2(swapAmount);
  const receipt = await tx.wait();
  
  // Find the swap event
  const swapEvent = receipt.events.find(event => event.event === "TokenSwap");
  const fromAmount = swapEvent.args.fromAmount;
  const toAmount = swapEvent.args.toAmount;
  
  console.log(`Swapped ${ethers.utils.formatUnits(fromAmount, 18)} Token1 for ${ethers.utils.formatUnits(toAmount, 18)} Token2`);
  
  // Get final balances
  const finalToken1Balance = await Token1.balanceOf(userAddress);
  const finalToken2Balance = await Token2.balanceOf(userAddress);
  
  console.log(`Final Token1 balance: ${ethers.utils.formatUnits(finalToken1Balance, 18)}`);
  console.log(`Final Token2 balance: ${ethers.utils.formatUnits(finalToken2Balance, 18)}`);
  
  console.log(`Transaction hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
