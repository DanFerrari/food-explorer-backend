const { Router} = require("express");

const foodRoutes = Router();

const FoodController = require("../controllers/FoodController");

const foodController = new FoodController();


foodRoutes.post("/", foodController.create);

module.exports = foodRoutes;

