// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {NFTMinter} from "../src/NFTMinter.sol";

contract MyNFTTest is Test {
    NFTMinter instance;
    address owner;
    address recipient;

    function setUp() public {
        instance = new NFTMinter();
        owner = address(this);
        recipient = makeAddr("recipient");
    }

    function testMint() public {
        string memory tokenURI = "ipfs://CID";
        instance.mint(recipient, tokenURI);
        assertEq(instance.ownerOf(1), recipient);
        assertEq(instance.tokenURI(1), tokenURI);
    }
}
