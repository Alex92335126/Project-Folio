const { ethers } = require("ethers");

class EthService {
    constructor(knex) {
        this.knex = knex
    }

    issueNft = () => {

    }

    getEthBalance = async () => {
       const provider = await ethers.getDefaultProvider(process.env.ALCHEMY_ENDPOINT)
       const amount = await provider.getBalance('0x24AccC3252615391C6C43E69f643B47236E9714E')
       return ethers.utils.formatEther(amount)
    }
}

module.exports = EthService