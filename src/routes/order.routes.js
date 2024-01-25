const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const orderRoutes = Router();

const OrderController = require("../controllers/OrderController");
const orderController = new OrderController();

orderRoutes.use(ensureAuthenticated);
orderRoutes.post("/", orderController.create);

module.exports = orderRoutes;