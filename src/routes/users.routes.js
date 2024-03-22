const { Router } = require("express");
const usersRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const userController = require("../controllers/UsersController");


usersRoutes.post("/", userController.create);
usersRoutes.get("/", ensureAuthenticated, userController.show);
usersRoutes.get( "/:user_id",  ensureAuthenticated,  verifyUserAuthorization(["admin"]),  userController.index);
// usersRoutes.put("/", ensureAuthenticated, userController.update);


// usersRoutes.delete("/",  ensureAuthenticated,  verifyUserAuthorization(["admin"]),  userController.delete);


module.exports = usersRoutes;
