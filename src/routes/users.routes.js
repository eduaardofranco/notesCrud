const { Router } = require("express");
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UserController = require("../controllers/UserController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UserController()
const userAvatarController = new UserAvatarController()




//using post method passing the rout address which is '/'
// and calling the userControle class function
userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = userRoutes;