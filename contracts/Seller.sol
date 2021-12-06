// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract Seller {
  mapping(uint256 => uint256) public tokenIds;
  address contractAddress;
  uint256 public total = 0;
  bool public active;
  uint256 public price;
  address owner;

  constructor() {
    active = false;
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner allowed");
    _;
  }

  function setContractAddress(address _contractAddress) public onlyOwner {
    require(IERC165(_contractAddress).supportsInterface(0x80ac58cd), "Contract does not support IERC721");
    IERC721 nftContract = IERC721(_contractAddress);
    require(nftContract.isApprovedForAll(owner, address(this)), "not approved for all");
    contractAddress = _contractAddress;
  }

  function setPrice(uint256 _price) public onlyOwner {
    price = _price;
  }

  function addTokenIdBatch(uint256[] memory _tokenIds) public onlyOwner {
    require(!active, "contract already active");
    require(contractAddress != address(0), "contract address not set");
    for (uint256 i=0; i < _tokenIds.length; i+=1) {
      tokenIds[total+i] = _tokenIds[i];
    }
    total += _tokenIds.length;
  }

  function activate() public onlyOwner {
    require(!active, "contract already active");
    require(total > 0, "no token ids added");
    require(price > 0, "price must be greater than 0");
    active = true;
  }

  function cancel() public onlyOwner {
    require(active, "contract not active");
    active = false;
    total = 0;
    price = 0;
  }

  function clear() public onlyOwner {
    require(!active, "contract not active");
    total = 0;
    price = 0;
  }

  function buy() public payable {
    require(active, "contract not active");
    require(total > 0, "no token ids added");
    require(msg.value == price, "not enough ETH");
    require(contractAddress != address(0), "contract address not set");
    require(owner != msg.sender, "cannot buy from yourself");
    IERC721 nftContract = IERC721(contractAddress);
    require(nftContract.isApprovedForAll(owner, address(this)), "not approved for all");
    for (uint256 i = 0; i < total; i++) {
      nftContract.safeTransferFrom(owner, msg.sender, tokenIds[i]);
    }
    payable(owner).transfer(msg.value);
    active = false;
    total = 0;
    price = 0;
  }
}
