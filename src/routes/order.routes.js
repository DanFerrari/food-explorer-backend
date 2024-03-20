const { Router } = require("express")
const orderRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const orderController = require("../controllers/OrderController")

orderRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["customer"]), orderController.create)
orderRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["customer", "admin"]), orderController.index)
orderRoutes.get("/:id", ensureAuthenticated, verifyUserAuthorization(["customer", "admin"]), orderController.show)
orderRoutes.patch("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), orderController.update)


module.exports = orderRoutes
