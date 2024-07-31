import express from "express";
import router from "./routes/router";
import db from "./config/db";

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log("Conexion a la base de datos exitosa");
    } catch (error) {
        console.log(error);
        console.log('Error al conectar a la bdd');
    }
}

connectDB()

const server = express();

server.use("/api/products", router);

export default server;
