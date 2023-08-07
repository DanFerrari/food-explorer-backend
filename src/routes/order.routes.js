const { Router } = require("express");

const orderRoutes = Router();

const OrderController = require("../controllers/OrderController");
const orderController = new OrderController();

orderRoutes.post("/", orderController.create);

module.exports = orderRoutes;