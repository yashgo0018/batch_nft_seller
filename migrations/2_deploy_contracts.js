const NFT1155 = artifacts.require('NFT1155');
const Seller2 = artifacts.require('Seller2');

module.exports = async function (deployer, network, accounts) {
    const tokenIds = ['2', '3', '4', '10005', '10006', '10007', '10008', '10009', '10010', '10011', '10013', '10017', '10018', '10020', '10021', '10025', '10026', '10027', '10028', '10030', '10032', '10036', '10037', '10038', '10039', '10040', '10041', '10042', '10043', '10044', '10047', '10048', '10049', '10052', '10053', '10054', '10056', '10057', '10058', '10059', '10061', '10062', '10063', '10064', '10065', '10066', '10067', '10068', '10069', '10070', '10072', '10073', '10074', '10075', '10077', '10078', '10079', '10080', '10081', '10086', '10089', '10090', '10091', '10092', '10093', '10094', '10095', '10098', '10099', '10101', '10108', '10109', '10110', '10112', '10114', '10115', '10116', '10117', '10118', '10119', '10121', '10122', '10123', '10124', '10125', '10126', '10127', '10128', '10130', '10131', '10133', '10134', '10135', '10136', '10137', '10138', '10140', '10141', '10142', '10143'];
    let contractAddress = '0xe7afb4189603a901b74f8085f775931a60996166';
    let price = web3.utils.toWei('1', 'ether');
    let owner = '0x6c5e0d57075ae529e90fecb4289c1bcb9a6ba24a';
    if (network !== 'mainnet') {
        await deployer.deploy(NFT1155);
        const nft = await NFT1155.deployed();
        const amountList = []
        const dataList = []
        for (let i = 0; i < 100; i++) {
            amountList.push('1');
            dataList.push('');
        }
        await nft.mintBatch(
            accounts[0],
            tokenIds,
            amountList,
            dataList
        );
        owner = accounts[0];
        contractAddress = nft.address;
    }
    await deployer.deploy(Seller2, contractAddress, price, owner, tokenIds);
};