const express = require("express");
const respuestas = require("../../red/respuestas");
const controlador = require("./index");

const router = express.Router();

//rutas
router.get("/:id",uno)
router.get("/",todos)
router.post("/",agregar)
router.put("/",eliminar)

//funcionalidad
async function todos (req, res,next) {
    try{
    const items = await controlador.todos();
    respuestas.success(req,res,items,200)
    }catch (err){
        next(err)
    }
}

async  function uno (req, res,next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err)
    }
}
async  function agregar (req, res,next) {
    try {
        const items = await controlador.agregar(req.body);
        if(req.body.id === 0){
            mensaje = "ITEM GUARDADO"
        }else{
            mensaje = "ITEM ACTUALIZADO"
        }
        respuestas.success(req, res, mensaje, 201)

    } catch (err) {
        next(err)
    }
}

async  function eliminar (req, res,next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuestas.success(req, res, "ITEM ELIMINADO", 200)
    } catch (err) {
        next(err)
    }
}


module.exports = router;

//define las rutas con el router de express y le da a cada una la funcion que debe tomar