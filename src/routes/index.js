const { Router } = require("express");

const usersRouter =  require("./users.routes");
const foodRouter = require("./food.routes");
const orderRouter = require("./order.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/food", foodRouter);
routes.use("/order", orderRouter);

module.exports = routes;