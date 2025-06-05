const TABLA = "autenticacion"
const bcrypt = require("bcrypt");
const auth = require("../../autenticacion")

module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if (!db){
        db = require("../../DB/mysql")
    }

    async function login(usuario,password){
        const data = await db.query(TABLA,{usuario:usuario});

        return bcrypt.compare(password, data.password)
            .then(result => {
                if(result){
                    //GENERAR UN TOKEN
                    return auth.asignarToken({...data})

                }else{
                    throw new Error("INFO INVALIDA")
                }
            })
    }


    async function agregar(data) {
        const authData = {
            id: data.id,
        }

        if (data.usuario){
            authData.usuario = data.usuario
        }

        if (data.password){
            authData.password = await bcrypt.hash(data.password.toString(),5);
        }
        return db.agregar(TABLA, authData)
    }

    return {agregar,login}
}

//este archivo tiene toda la logica que se hacen con sql para la base de datos y demas asi funcionan todos los modulos de la aplicacion