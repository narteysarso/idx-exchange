//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IDXToken.sol";

contract IDXExchange is IDXToken {

    event tokenPurchase(address indexed to, address indexed from, uint tokens, uint256 amount, uint indexed timestamp, string status);

    uint rate = 10000000000 wei;

    constructor() IDXToken() {
         _mint(address(this), 1000000 * 10**decimals());
        emit tokensMinted(address(this), 1000000 * 10**decimals(), "Initial supply of tokens minted", block.timestamp);
    }

    function buyToken() public payable {
        require(msg.value >= rate , "You need to spend more at least 0.00000001 eth");
        uint tokens = convertToTokens(msg.value);
        _transfer(address(this), msg.sender, tokens);
        emit tokenPurchase(msg.sender, address(this), tokens, msg.value, block.timestamp, "complete");
    }

    function totalVolume() external view returns (uint) {
        return address(this).balance;
    }


    function convertToTokens(uint _amountInWei) public view returns (uint) {
        require(_amountInWei > 0 , "Amount must be greater than zero");
        uint tokens = _amountInWei / rate;
        return tokens * 10**decimals();
    }


}
