const jwt = require('jsonwebtoken')
config = require('../config')
const secret = config.jwt.secret

function asignarToken(data){
    return jwt.sign(data, secret)
}

module.exports = {
    asignarToken
}