const db = require("../../DB/mysql")
const ctrl = require("./controlador")

module.exports = ctrl(db)

//lo unico que hace esto es combinar la base de datos con el controlador
// que aplica las funciones definidas en el archivo mysql que esta en DB
// osea le da las funciones a el objeto de la base de datos