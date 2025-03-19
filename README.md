# ERC-20 Token Exchange Project

A decentralized exchange for ERC-20 tokens on the Sepolia network, featuring:

- Two custom ERC-20 tokens
- A token swap contract with a configurable exchange rate
- A web interface for performing token swaps

## Deployed Contracts

- Token1: 0x3cf59aBB95Aa0D7c9dCae3527314A0DdD6c7717a
- Token2: 0x92e979eE109e62AC9aEdBD8171756e32C4229393
- Exchange: 0x66b55d43C25900EB09a3146df79AaF254e37239f

## Setup and Deployment

### Prerequisites
- Node.js and npm
- Hardhat
- MetaMask with Sepolia ETH

### Installation
1. Clone this repository
2. Run `npm install` in the main directory
3. Configure `.env` file with your private key and RPC URL
4. Deploy contracts with `npx hardhat run scripts/deploy-***.js --network sepolia`

### Web Interface
1. Navigate to the `frontend` directory
2. Run `npm install`
3. Run `npm start` to start the development server
