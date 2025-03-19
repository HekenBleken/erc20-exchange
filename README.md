# ERC-20 Token Exchange Project

A decentralized exchange for ERC-20 tokens on the Sepolia network, featuring:

- Two custom ERC-20 tokens
- A token swap contract with a configurable exchange rate
- A web interface for performing token swaps

## Deployed Contracts

- Token1: [YOUR_TOKEN1_ADDRESS]
- Token2: [YOUR_TOKEN2_ADDRESS]
- Exchange: [YOUR_EXCHANGE_ADDRESS]

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
