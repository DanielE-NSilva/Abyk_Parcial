const bcrypt = require('bcryptjs')

const encrypt = async(TextPlain) =>{
    return await bcrypt.hash(TextPlain,10)
}

const compare = async(passwordPlain, HashPassword) =>{
    return await bcrypt.compare(passwordPlain,HashPassword)
}

module.exports = {encrypt, compare}