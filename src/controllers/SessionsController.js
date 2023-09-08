const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')
const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {
    async create(request, response) {
        
        const { email, password } = request.body

        //use knex to acess users table in the database
        //filter user by its email
        const user = await knex("users").where({ email }).first()

        //if user does not exists, return an error
        if(!user) {
            throw new AppError('E-mail or password incorrect', 401)
        }

        //compare the passward given by the user and the one in the database
        const passwordMatched = await compare(password, user.password)

        // if password doesnt match, return error
        if(!passwordMatched) {
            throw new AppError('E-mail or password incorrect', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        //sign is a method from jsonwebtoken
        //here we pass the user id, secret and expiresIn, which we had defined in authConfig file
        //the empty braces is any aditional information, in this case we dont have any
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token })
 
    }
}

module.exports = SessionsController;