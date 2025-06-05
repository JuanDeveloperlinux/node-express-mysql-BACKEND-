const TABLA = "usuarios"
const auth = require("../auth")

module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if (!db){
        db = require("../../DB/mysql")
    }


    function todos() {
        return db.todos(TABLA)
    }

    function uno(id) {
        return db.uno(TABLA, id)
    }

    function eliminar(body) {
        return db.eliminar(TABLA, body)
    }

    async function agregar(body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo,
        }
        const respuesta = await db.agregar(TABLA, usuario)

        let insertId = 0;
        if(body.id===0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id;
        }

        let respuesta2= '';
        if(body.usuario || body.password){
          respuesta2 = await  auth.agregar({
                id:insertId,
                usuario: body.usuario,
                password: body.password,
            })
        }
        return respuesta2
    }

    return {todos,uno,eliminar,agregar}
}

//activa las funciones que estan definidas en mysql generales y
//  las que necesite modificar las modifica para este modulo
// y devuelve todas las funciones para este modulo para que despues en el archivo de rutas se mezclen cada una con su ruta especifica