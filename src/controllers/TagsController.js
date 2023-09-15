const knex = require("../database/knex");

class TagsController {
    async index(request, response) {
        const user_id  = request.user.id;

        const tags = await knex("tags")
        .where({ user_id})
        //groupby name only show once tags with same name
        .groupBy("name")

        return response.json(tags)
    }
}

module.exports = TagsController;