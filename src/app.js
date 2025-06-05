const express = require("express");
const config = require("./config");
const clientes = require("./modulos/clientes/rutas");
const usuarios = require("./modulos/usuarios/rutas");
const autenticacion = require("./modulos/auth/rutas");
const morgan = require("morgan");
const error = require("./red/errors");

const app = express();
//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//configuracion
app.set("port",config.app.port)

//rutas
app.use("/api/clientes",clientes)
app.use("/api/usuarios",usuarios)
app.use("/api/auth",autenticacion)

app.use(error)

module.exports = app;