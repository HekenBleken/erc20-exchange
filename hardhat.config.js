require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

// No dotenv here

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/SSKN_UtwK_VbnUgLkG5B1s4MdpLmAv5p",
      accounts: ["48cea965d1bdabe3e5cb82b2e3007007df677eb40b896425e817f8d67c97e1a0"],
      chainId: 11155111,
      timeout: 60000, // 1 minute
    },
  },
  etherscan: {
    apiKey: "JH8N8XBR658EYE8GZN4J8UNQ45FXI68M4N",
  },
};
