const {Router} = require("express");

const IngredientController = require("../controllers/IngredientsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientController();

ingredientsRoutes.get("/", ensureAuthenticated, ingredientsController.index);

module.exports = ingredientsRoutes;