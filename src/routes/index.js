const {Router} = require("express");

const usersValidatedRoutes = require("./usersValidated.routes");
const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishRoutes = require("./dish.Routes");
const favoriteRoutes = require("./favorite.routes");
const orderRoutes = require("./order.routes");


const routes = Router();


routes.use("/favorite", favoriteRoutes);
routes.use("/validated", usersValidatedRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dish", dishRoutes);
routes.use("/order", orderRoutes);


module.exports = routes;