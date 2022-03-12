//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract IDXToken is ERC20, Ownable, ERC20Burnable{

    event tokensMinted(address indexed owner, uint256 amount, string message, uint indexed timestamp);
    event tokensBurned(address indexed owner, uint256 amount, string message, uint  indexed timestamp);
    event additionalTokensMinted(address indexed owner, uint256 amount, string message, uint indexed timestamp);

    constructor() ERC20("IDXToken", "idx") {
       
    }

    function mint(address to, uint256 amount) public onlyOwner{
        _mint(to, amount);
        emit additionalTokensMinted(msg.sender, amount, "Additional tokens minted", block.timestamp);
    }

    function burn(uint256 amount) public override onlyOwner {
        _burn(msg.sender, amount);
        emit tokensBurned(msg.sender, amount, "Tokens burned", block.timestamp);
    }
    
}
