const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError('Jwt Token not informed', 401)
    }

    //get barear token from header and split in the backspace
    //assign this token to the token variable
    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id),
        }

        return next()
    } catch {
        throw new AppError('JWT Token invalid', 401)
    }
}

module.exports = ensureAuthenticated;