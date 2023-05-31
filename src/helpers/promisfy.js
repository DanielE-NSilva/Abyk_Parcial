const { promisify } = require('util')

const Promisify = (tex1,tex2,tex3) =>{
    return  promisify(tex1)(tex2, tex3)
}

module.exports = {Promisify}