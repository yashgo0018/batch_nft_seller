// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

// [2, 3, 4, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10013, 10017, 10018, 10020, 10021, 10025, 10026, 10027, 10028, 10030, 10032, 10036, 10037, 10038, 10039, 10040, 10041, 10042, 10043, 10044, 10047, 10048, 10049, 10052, 10053, 10054, 10056, 10057, 10058, 10059, 10061, 10062, 10063, 10064, 10065, 10066, 10067, 10068, 10069, 10070, 10072, 10073, 10074, 10075, 10077, 10078, 10079, 10080, 10081, 10086, 10089, 10090, 10091, 10092, 10093, 10094, 10095, 10098, 10099, 10101, 10108, 10109, 10110, 10112, 10114, 10115, 10116, 10117, 10118, 10119, 10121, 10122, 10123, 10124, 10125, 10126, 10127, 10128, 10130, 10131, 10133, 10134, 10135, 10136, 10137, 10138, 10140, 10141, 10142, 10143]

contract Seller2 {
    uint256[100] public tokenIds;
    address public contractAddress;
    IERC1155 nftContract;
    uint256 public total = 100;
    uint256 public price;
    address public owner;
    bool public active = true;

    event UpdateStatus(bool status);
    event Sold(address buyer, uint256 price);
    event UpdatePrice(uint256 price);

    constructor(
        address _contractAddress,
        uint256 _price,
        address _owner,
        uint256[100] memory _tokenIds
    ) {
        contractAddress = _contractAddress;
        nftContract = IERC1155(contractAddress);
        price = _price;
        owner = _owner;
        tokenIds = _tokenIds;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
        emit UpdatePrice(price);
    }

    function activate() public onlyOwner {
        active = true;
        emit UpdateStatus(active);
    }

    function deactivate() public onlyOwner {
        active = false;
        emit UpdateStatus(active);
    }

    function buy() public payable {
        require(active, "contract not active");
        require(msg.value == price, "not enough ETH");
        require(owner != msg.sender, "cannot buy from yourself");
        require(
            nftContract.isApprovedForAll(owner, address(this)),
            "not approved for all"
        );
        for (uint256 i = 0; i < total; i++) {
            nftContract.safeTransferFrom(owner, msg.sender, tokenIds[i], 1, "");
        }
        payable(owner).transfer(msg.value);
        active = false;
        emit Sold(msg.sender, price);
    }
}
