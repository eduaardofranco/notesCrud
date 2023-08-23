const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController()



//using post method passing the rout address which is '/'
// and calling the notesControle class function
tagsRoutes.get('/:user_id', tagsController.index)

module.exports = tagsRoutes;