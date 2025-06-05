const express = require("express");
const respuestas = require("../../red/respuestas");
const controlador = require("./index");

const router = express.Router();

router.get("/login",login)

async function login (req, res,next) {
    try {
        const token = await controlador.login(req.body.usuario,req.body.password);
        respuestas.success(req, res, token, 200)
    } catch (err) {
        next(err)
    }
}

module.exports = router;
// esto lo que hace es exportar el router con las rutas y la funcionalidad de los métodos que tienen la logica en el controlador