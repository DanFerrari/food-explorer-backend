const { Router } = require("express")
const dishRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../configs/uploads")
const upload = multer(uploadConfig.MULTER_DISH)

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishControllers = require("../controllers/dishControllers")
const imageController = require("../controllers/imageController")

dishRoutes.get("/", dishControllers.index)

dishRoutes.get("/:id", dishControllers.show)

dishRoutes.post(
  "/",
  
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  dishControllers.create
)

dishRoutes.put(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  dishControllers.update
)

dishRoutes.delete(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  dishControllers.delete
)

dishRoutes.patch(
  "/image_dish/:dish_id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  upload.single("image"),
  imageController.update
)

module.exports = dishRoutes
