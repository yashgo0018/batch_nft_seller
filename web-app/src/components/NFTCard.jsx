function NFTCard({ nft }) {
    return <div className="lg:w-1/4 md:w-1/3 w-1/2">
        <div className="border-black border-1">
            <img src={nft.image} alt="" />
        </div>
    </div>
}

export default NFTCard;