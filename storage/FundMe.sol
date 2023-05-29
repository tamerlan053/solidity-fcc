// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint;
    uint public constant minimumUsd = 50 * 1e18;
    mapping (address => uint) public addressToAmountFunded;
    
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    address[] public funders;

    function fund() public payable {
        require(msg.value.getConversionRate() >= minimumUsd, "Not enough funds, aborting!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);

        (bool isSent, ) = payable(msg.sender).call{value: address(this).balance}("");
        require (isSent, "The call function was unsuccesful");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
}
