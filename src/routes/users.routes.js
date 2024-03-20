const { Router } = require("express");
const usersRoutes = Router();

const multer = require("multer");
const uploadConfig = require("../configs/uploads");
const upload = multer(uploadConfig.MULTER);


const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const userControllers = require("../controllers/usersControllers");


usersRoutes.post(  "/",  userControllers.create);
usersRoutes.get("/", ensureAuthenticated, userControllers.show);
usersRoutes.get(  "/:user_id",  ensureAuthenticated,  verifyUserAuthorization(["admin"]),  userControllers.index);
usersRoutes.put("/", ensureAuthenticated, userControllers.update);

usersRoutes.delete(  "/",  ensureAuthenticated,  verifyUserAuthorization(["admin"]),  userControllers.delete);


module.exports = usersRoutes;
