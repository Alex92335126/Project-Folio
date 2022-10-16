
class AdminRouter {
    constructor(adminService, express) {
        this.adminService = adminService
        this.express = express
    }

    router () {
        let router = this.express.Router();
        router.get("/", this.getAll);
        
        return router
    }

    getAll = async (req, res) => {
        try {
            const getAssets = await this.adminService.getAllUsersAssets()
            res.json(getAssets)
        } catch (error) {
            console.log(error)
            res.sendStatus(401).json({msg: error});
        }
    }     
}

module.exports = AdminRouter;