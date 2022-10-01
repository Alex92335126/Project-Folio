
class FolioRouters {
    constructor(folioService, express) {
      this.folioService = folioService;
      this.express = express;
    }
  
    router() {
      let router = this.express.Router();
      router.post("/", this.getPortfolio.bind(this));
      router.put("/buy", this.postBuyOrder.bind(this));
      // router.post("/", this.addEvent.bind(this));
      // router.put("/", this.putEvent.bind(this));
      // router.delete("/del/:eventId", this.deleteEvent.bind(this));
      return router;
    }

    //portfolio (get) 
    async getPortfolio(req, res) {
        console.log("body", req.body.account)
        try {
            const showPortfolio = await this.folioService.getPortfolio(
                req.body.account
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