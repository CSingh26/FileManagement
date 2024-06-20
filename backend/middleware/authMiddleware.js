const jwt = require('jsonwebtoken')

require('dotenv').config({ path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'}) //configure your env and enter approraite path

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            message: 'No token ,authorization denied'
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_KEY)
        req.user = tokenDecode.user
        next()
    } catch (err) {
        res.status(401).json({
            message: 'Token is not valid'
        })
    }
}