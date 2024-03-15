const { Router } = require("express");

const usersRouter =  require("./users.routes");
const dishRouter = require("./dish.routes");
const orderRouter = require("./order.routes");
const sessionsRouter = require("./sessions.routes");
const ingredientsRouter = require("./ingredients.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dish", foodRouter);
routes.use("/order", orderRouter);
routes.use("/ingredients",ingredientsRouter);

module.exports = routes;