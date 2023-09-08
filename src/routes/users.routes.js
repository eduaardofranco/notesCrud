const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const userRoutes = Router();

const userController = new UserController()



//using post method passing the rout address which is '/'
// and calling the userControle class function
userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)

module.exports = userRoutes;