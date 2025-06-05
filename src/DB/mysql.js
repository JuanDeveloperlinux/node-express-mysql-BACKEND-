const mysql = require("mysql");
const config = require("../config");

console.log(config.mysql.host, config.mysql.user,config.mysql.password,config.mysql.database);

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function connectMysql(){
    connection = mysql.createConnection(dbconfig)
    connection.connect(function(err){
        if(err){
            console.log("db error",err)
            setTimeout(connectMysql,200)
        }else{
            console.log("db connection connected")
        }
    })

    connection.on('error', function(err){
        console.log("db error",err)
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            connectMysql()
        }else{
            throw err;
        }
    })
}

connectMysql()

function todos(tabla){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (err, result) => {
             return err ?
                 reject(err):
                resolve(result) //funciona como un return que mira que all este bien
        })
    })
}

function uno(tabla,id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (err, result) => {
            return err ?
                reject(err):
                resolve(result)//funciona como un return que mira que all este bien
        })
    })
}

function eliminar(tabla,data){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${tabla} WHERE id = ?`,data.id ,(err, result) => {
            return err ?
                reject(err):
                resolve(result)//funciona como un return que mira que all este bien
        })
    })
}
function agregar(tabla,data){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data] ,(err, result) => {
            return err ?
                reject(err):
                resolve(result)//funciona como un return que mira que all este bien
        })
    })
}

function query(tabla,consulta){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE  ?`,consulta ,(err, result) => {
            return err ?
                reject(err):
                resolve(result[0]) //funciona como un return que mira que all este bien
        })
    })
}



module.exports={
    todos,uno,agregar,eliminar,query
};

//conecta la base de datos y define cada metodo con SQL para realizar las consultas en la base de datos 