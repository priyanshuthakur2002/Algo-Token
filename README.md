# AlgoToken Project



## Overview

AlgoToken is a decentralized application (DApp) that implements an ERC-20 token on the Ethereum blockchain. This project was developed using Truffle, and the token is deployed on both the Ganache local development network and the Goerli test network.

## Features

- ERC-20 Token Implementation
- Deployed on Ganache for Local Development
- Deployed on Goerli Test Network for Testing
- Smart Contract Interactions using Truffle

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Metamask](https://metamask.io/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/priyanshuthakur2002/Algo-Token.git

2. Install dependencies:

   ```bash
   cd AlgoToken
   npm install

3. Start Ganache:

   ```bash
   ganache-cli

4. Compile and migrate the smart contract:

   ```bash
   truffle compile
   truffle migrate --network ganache

5. Test the smart contract:

   ```bash
   truffle test

6. Update the truffle-config.js file for the Goerli network and deploy the contract:

   ```bash
   truffle migrate --network goerli

7. Add tokens to metamask
   1. Open your browser and connect Metamask to Goerli network.
   2. Click on import tokens option
   3. Enter the deployed contract address, symbol and decimal. 
