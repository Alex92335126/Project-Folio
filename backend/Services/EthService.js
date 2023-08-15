const { ethers } = require("ethers");
const abi = require("../artifacts/contracts/NftToken.sol/Gamefolio.json")

class EthService {
    constructor(knex) {
        this.knex = knex
    }

    issueNft = async (address, uri) => {
        try {
            const provider = await ethers.getDefaultProvider(process.env.ALCHEMY_ENDPOINT)
            const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
            const NFTContract = new ethers.Contract("0x7259B0512D8ecEc12179C1ed31b1bf7Fe4EF2a2C", abi.abi, signer)
            const tx = await NFTContract.safeMint(address, uri);
            await tx.wait();
            return tx 
        } catch (error) {
            console.error(error)
        }
 
    }

    getDetails = async () => {
        try {
            const provider = await ethers.getDefaultProvider(process.env.ALCHEMY_ENDPOINT)
            const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
            const NFTContract = new ethers.Contract("0x7259B0512D8ecEc12179C1ed31b1bf7Fe4EF2a2C", abi.abi, signer)
            const name = await NFTContract.name()
            const symbol = await NFTContract.symbol()
            console.log("name", name, "symbol", symbol)
            return {name, symbol}
        } catch (error) {
            console.error(error)
        }
    }

    getEthBalance = async () => {
        try {
            const provider = await ethers.getDefaultProvider(process.env.ALCHEMY_ENDPOINT)
            const amount = await provider.getBalance('0x24AccC3252615391C6C43E69f643B47236E9714E')
            return ethers.utils.formatEther(amount)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = EthService