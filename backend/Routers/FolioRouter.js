
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
      router.put("/buy", this.postBuyOrder.bind(this));
      // router.post("/", this.addEvent.bind(this));
      // router.put("/", this.putEvent.bind(this));
      // router.delete("/del/:eventId", this.deleteEvent.bind(this));
      return router;
    }

    //portfolio (get) 
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

    //buy order (put)
    async postBuyOrder(req, res) {
        try {
          const buyOrder = await this.folioService.postBuyOrder(
            account.id,
            stock.id,
            req.body.price,
            req.body.cash_balance,
            req.body.num_shares, 
        
          );
          res.json(buyOrder);
        } catch (error) {
          res.status(500).send(error);
        }
      }

};

module.exports = FolioRouters