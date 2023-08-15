
class FolioRouters {
    constructor(folioService, express) {
      this.folioService = folioService;
      this.express = express;
    }
  
    router() {
      let router = this.express.Router();
      router.get("/", this.geUsertPortfolio.bind(this));
      router.get("/cash", this.getCashPortfolio.bind(this));
      router.get("/asset", this.getAssetPortfolio.bind(this));
      router.post("/buy", this.postBuyOrder.bind(this));
      router.put("/sell", this.putSellOrder.bind(this));
      return router;
    }

    //get portfolio (get) 
    async geUsertPortfolio(req, res) {
        console.log("user", req.user)
        try {
            const showPortfolio = await this.folioService.getPortfolio(
                req.user.id
            );
            res.json(showPortfolio);
        } catch (error) {
            res.status(500).send(error); 
        }
    }
    // Get current cash balance 
    async getCashPortfolio(req, res) {
      console.log("user", req.user)
      try {
          const showPortfolio = await this.folioService.getCashFolio(
              req.user.id
          );
          res.json(showPortfolio);
      } catch (error) {
          res.status(500).send(error); 
      }
  }
  // Get current asset balance 
  async getAssetPortfolio(req, res) {
    console.log("user", req.user)
    try {
        const showPortfolio = await this.folioService.getAssetFolio(
            req.user.id
        );
        res.json(showPortfolio);
    } catch (error) {
        res.status(500).send(error); 
    }
}

    //buy order (post)
    async postBuyOrder(req, res) {
      console.log("buy")
        try {
          const buyOrder = await this.folioService.postBuyOrder(
            // req.body.name,
            req.body.symbol,
            req.body.price,
            // req.body.cash_balance,
            req.body.num_shares,
            req.user.id      
          );
          res.json(buyOrder);
        } catch (error) {
          res.status(500).send(error);
        }
      }
    //sell order (put)
    async putSellOrder(req, res) {
      try {
        const sellOrder = await this.folioService.putSellOrder(
          req.body.symbol,
          req.body.price,
          req.body.num_shares,
          req.user.id
        );
        res.json(sellOrder);
      } catch (error) {
        res.status(500).send(error);
      }
    }
};

module.exports = FolioRouters