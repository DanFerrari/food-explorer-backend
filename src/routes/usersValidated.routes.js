const { Router } = require("express");
const usersValidatedRoutes = Router();

const usersValidatedController = require("../controllers/UsersValidatedController");

usersValidatedRoutes.post("/", usersValidatedController.index);

module.exports = usersValidatedRoutes;
