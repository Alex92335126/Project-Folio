
class EthRouter {
    constructor(ethService, express) {
        this.ethService = ethService
        this.express = express
    }

    router () {
        let router = this.express.Router();
        router.get("/get-bal", this.getBal);
        router.get("/contract-details", this.getDetails)
        router.post("/mint", this.mintNft)
        return router
    }

    getBal = async (req, res) => {
        try {
            const balance = await this.ethService.getEthBalance()
            res.json(balance)
        } catch (error) {
            console.log(error)
            res.sendStatus(401).json({msg: error});
        }
    }
    
    getDetails = async(req, res) =>{
        try {
            const details = await this.ethService.getDetails()
            res.json(details)
        } catch (error) {
            console.log(error)
            res.sendStatus(401).json({msg: error})
        }
    }

    mintNft = async (req, res) => {
        const {address, uri} = req.body
        console.log('mint', address, uri)
        try {
            const tx = await this.ethService.issueNft(address, uri)
            res.json(tx)
        } catch (error) {
            console.log(error)
            res.sendStatus(401).json({msg: error})
        }
    }
}

module.exports = EthRouter;