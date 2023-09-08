const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const notesRoutes = Router();

const notesController = new NotesController()

//apply the middle authentication to all notes routes
notesRoutes.use(ensureAuthenticated)


//using post method passing the rout address which is '/'
// and calling the notesControle class function
notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes;