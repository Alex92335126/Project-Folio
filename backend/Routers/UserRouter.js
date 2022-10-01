const jwt = require("jsonwebtoken");
const auth = require("../jwt-strategy");
const bcrypt = require("bcrypt");

class UserRouter {
    constructor(userService, express) {
        this.userService = userService
        this.express = express
    }

    router () {
        let router = this.express.Router();
        router.post("/signup", this.signup);
        router.post("/login", this.login);
        return router
    }

    login = async (req, res) => {
        const { username, password } = req.body;
        let user = await this.userService.getUser(username)
        if (user) {
            let result = await bcrypt.compare(password, user.password);

            if (result) {
            const payload = {
                id: user.id,
                username: user.username,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });
            } else {
            res.sendStatus(401);
            }
        }
    }

    signup = async (req, res) => {
        const { username, password } = req.body;
        console.log(username, password);
        let query = await this.userService.getUser(username);
        const hashed = await bcrypt.hash(password, 10);
        console.log("signup query", query)
        if (query == undefined) {
            try {
                await this.userService.addUser(username, hashed)
                res.json("signup complete");
            } catch (error) {
                console.log("DB error", error)
                res.sendStatus(401).json({msg: error});
            }
        } else {
            res.sendStatus(401).json({msg: "User exists"});
        }
    }
}

module.exports = UserRouter;