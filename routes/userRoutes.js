const express = require("express");
const app = express();
const routes = express.Router();
const userController = require("../controller/userController");
// all api routes start here
routes.post("/add", userController.addUser);
routes.get("/getAllUsers", userController.getAllUsersDetails);
routes.get("/getById/:id", userController.getUserDetailsById);
routes.put("/updateUser/:id", userController.updateUser);
routes.delete("/deleteUser/:id", userController.deleteUser);

module.exports = routes;
