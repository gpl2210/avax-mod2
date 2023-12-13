# GopalWallet Smart Contract

This repository contains the source code for the GopalWallet Smart Contract, developed for the ETH Proof: Intermediate course module 2.

## Overview

The `GopalWallet` smart contract is designed to manage a wallet with basic functionalities such as depositing and withdrawing tokens. Additionally, it includes features to retrieve the contract's balance, deposit tokens, withdraw tokens, get the contract's address, get the contract's balance, and buy NFTs.

## Contract Details

- **Owner**: The contract is initialized with an owner, and only the owner (msg.sender) can deposit and withdraw tokens.
- **Balance**: The current balance of the wallet is tracked and can be retrieved using the `getBalance` function.

## Functions

1. **getBalance()**: Retrieves the current balance of the wallet.

2. **deposit_token(uint256 _amount)**: Allows the owner to deposit tokens into the wallet.

3. **withdraw_token(uint256 _withdrawAmount)**: Allows the owner to withdraw tokens from the wallet. An `InsufficientBalance` error is thrown if the withdrawal amount exceeds the current balance.

4. **getContractAddress()**: Retrieves the address of the smart contract.

5. **getContractBalance()**: Retrieves the current balance of the smart contract.

6. **BuyNFT(uint256 _number)**: Initiates the process of buying NFTs by withdrawing the specified amount of tokens.


# Below are the instructions on how to run this project on your computer.

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/


