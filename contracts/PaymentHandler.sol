// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract PaymentHandler {
    address public owner;
    IERC20 public usdeToken;
    mapping(address => bool) public registeredMerchants;

    event PaymentReceived(string indexed merchantId, address indexed payer, uint256 amount, uint256 timestamp);
    event FundsWithdrawn(address indexed merchant, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    modifier onlyMerchant() {
        require(registeredMerchants[msg.sender], "Not a registered merchant");
        _;
    }

    constructor(address _usdeToken) {
        owner = msg.sender;
        require(_usdeToken != address(0), "Invalid token address");
        usdeToken = IERC20(_usdeToken);
    }

    function registerMerchant(address merchant) external onlyOwner {
        require(merchant != address(0), "Invalid merchant address");
        registeredMerchants[merchant] = true;
    }

    function receivePayment(string memory merchantId, uint256 amount) public {
        require(usdeToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit PaymentReceived(merchantId, msg.sender, amount, block.timestamp);
    }

    function withdraw(uint256 amount) external onlyMerchant {
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(usdeToken.transfer(msg.sender, amount), "Withdraw transfer failed");
        emit FundsWithdrawn(msg.sender, amount);
    }
}

// contract address: PaymentHandler deployed to: 0x15a5F0CC0eBbD6af48100885BB0c217457B01d14