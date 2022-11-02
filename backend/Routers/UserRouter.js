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
        router.get("/", this.getUser);
        router.post('/update-password', this.updatePassword)
        router.delete("/del/:username", this.deleteUser.bind(this));
        return router
    }

    login = async (req, res) => {
        const { username, password } = req.body;
        console.log('username', username, password)
        let user = await this.userService.getUser(req.body.username)
        console.log("router user", user)
        if (user) {
            let result = await bcrypt.compare(password, user.password);
            console.log('result', result)
            if (result) {
            const payload = {
                id: user.id,
                username: user.username,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token, role: user.role });
            } else {
            res.sendStatus(401);
            }
        }
    }

    signup = async (req, res) => {
        const { username, password, firstName, lastName, email } = req.body;
        console.log("signup user", username, password);
        let query = await this.userService.getUser(username);
        const hashed = await bcrypt.hash(password, 10);
        console.log("signup query", query)
        if (query == undefined) {
            try {
                await this.userService.addUser(username, hashed, firstName, lastName, email)
                res.json("signup complete");
            } catch (error) {
                console.log("DB error", error)
                res.sendStatus(401).json({msg: error});
            }
        } else {
            res.sendStatus(401).json({msg: "User exists"});
        }
    }

    getUser = async(req, res) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const tokenName = jwt.decode(token)
        console.log(tokenName)
        try {
            const getUser = await this.userService.getUser(tokenName.username)
            console.log("get user", getUser)
            res.json({id: getUser.id, firstName: getUser.fname})
        } catch (error) {
            console.log(error)
        }
    }

    updatePassword = async(req, res) => {


    }

    async deleteUser (req, res) {
        let user = req.params.username;
        console.log("del event", user)
        try{
          const delUser = await this.userService.delUser( 
            req.params.username);
          res.json(delUser);
        } catch (error) {
          res.status(500).send(error);
        }
      }
}

module.exports = UserRouter;