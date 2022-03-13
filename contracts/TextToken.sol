// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TextToken is ERC721, Ownable {
    uint public counter;
    mapping(uint256 => string) private text;

    constructor() ERC721("TextToken", "TTK") {
        counter = 0;
    }

    function safeMint(string memory _text) public onlyOwner {
        counter++;
        text[counter] = _text;
        _safeMint(msg.sender, counter);  
    }

    function getText(uint _id) view public returns (string memory) {
        return text[_id];
    }
}