//Require modules
const express = require("express");
const cors = require("cors");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
// const jwt = require("jsonwebtoken");
const auth = require("./jwt-strategy");
// const bcrypt = require("bcrypt");
require("dotenv").config();
const fs = require("fs");

// Middlware
const isLoggedIn = require('./middleware/isLoggedIn')

//Routers and Services
const UserRouter = require("./Routers/UserRouter")
const UserService = require("./Services/UserService")
const FolioRouter = require("./Routers/FolioRouter")
const FolioService = require("./Services/FoilioService.js")
const AdminRouter = require('./Routers/AdminRouter')
const AdminService = require('./Services/AdminService')
const EthRouter = require('./Routers/EthRouter')
const EthService = require('./Services/EthService');
const { METHODS } = require("http");

//Setup Modules
const app = express();
// app.use(cors({
//     origin: "https://gamefolio.net",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// }));

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
auth(knex).initialize();

const userService = new UserService(knex)
app.use("/user", new UserRouter(userService, express).router())

const folioService = new FolioService(knex)
app.use("/folio", isLoggedIn, new FolioRouter(folioService, express).router())

const adminService = new AdminService(knex, folioService)
app.use("/admin", new AdminRouter(adminService, express).router())

const ethService = new EthService(knex)
app.use('/eth', new EthRouter(ethService, express).router())

// app.get("/getstock", (req,res) => {
//     const data = fs.readFileSync("./stockticker.json", "utf-8")
//     console.log(JSON.parse(data))
// })

//Route
// app.post("/auth/signup", async (req, res) => {
//   // const username = req.body.username;
//   // const password = req.body.password;
//   const { username, password } = req.body;
//   console.log(username, password);
//   let query = await knex("users").where({ username }).first();
//   const hashed = await bcrypt.hash(password, 10);
//   if (query == undefined) {
//     await knex("users").insert({ username, password: hashed });
//     res.json("signup complete");
//   } else {
//     res.sendStatus(401);
//   }
// });

// app.post("/auth/login", async (req, res) => {
//   const { username, password } = req.body;

//   let user = await knex("users").where({ username }).first();

//   if (user) {
//     let result = await bcrypt.compare(password, user.password);

//     if (result) {
//       const payload = {
//         id: user.id,
//         username: user.username,
//       };
//       const token = jwt.sign(payload, process.env.JWT_SECRET);
//       res.json({ token });
//     } else {
//       res.sendStatus(401);
//     }
//   }
// });

// app.get("/todo", async (req, res) => {
//   let token = req.headers.authorization;
//   token = token.replace("Bearer ", "");
//   let verify = jwt.verify(token, process.env.JWT_SECRET);
//   if (verify) {
//     res.json({
//       todo: ["get bottle of water", "water plants", "eat breakfast"],
//     });
//   } else {
//     res.sendStatus(401);
//   }
// });

app.listen(3030, () => console.log("Listening to port 3030"));