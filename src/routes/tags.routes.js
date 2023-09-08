const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const tagsRoutes = Router();

const tagsController = new TagsController()



//using post method passing the rout address which is '/'
// and calling the notesControle class function
tagsRoutes.get('/', ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes;