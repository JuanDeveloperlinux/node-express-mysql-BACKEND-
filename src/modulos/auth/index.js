const db = require("../../DB/mysql")
const ctrl = require("./controlador")

module.exports = ctrl(db)

// esto lo que hace es exportar la base de datos con los metodos del controlador y asi funcionan todos los modulos
// de la aplicacion, inyectando la base de datos en el controlador
// de esta manera se puede cambiar la base de datos sin afectar el controlador