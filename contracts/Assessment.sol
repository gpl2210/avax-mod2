// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract GopalWallet {
    address payable public owner;
    uint256 public balance;

    event DepositToken(uint256 amount);
    event WithdrawToken(uint256 amount);
    event buy_NFT(uint256 _number);

    constructor(uint initialAmount) payable {
        owner = payable(msg.sender);
        balance = initialAmount;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit_token(uint256 _amount) public payable {
        uint256 _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit DepositToken(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw_token(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not authorized");
        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw_token the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit WithdrawToken(_withdrawAmount);
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function BuyNFT(uint256 _number) public {
        withdraw_token(_number);

        emit buy_NFT(_number);
    }
}
