
class EthRouter {
    constructor(ethService, express) {
        this.ethService = ethService
        this.express = express
    }

    router () {
        let router = this.express.Router();
        router.get("/get-bal", this.getBal);
        
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
}

module.exports = EthRouter;