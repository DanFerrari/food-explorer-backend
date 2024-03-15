const { Router} = require("express");
const  multer = require("multer");
const uploadConfig = require("../configs/upload");

const dishRoutes = Router();
const DishController = require("../controllers/DishController");
const dishController = new DishController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);




dishRoutes.post("/", dishController.create);

module.exports = foodRoutes;

