import express from "express";
import colors from "colors";
import router from "./routes/router";
import db from "./config/db";

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.cyan.italic("Conexion a la base de datos exitosa"));
    } catch (error) {
        // console.log(error);
        console.log(colors.red.italic("Error al conectar a la bdd"));
    }
}

connectDB();

//Instancia de Express
const server = express();

server.use(express.json());

server.use("/api/products", router);


// server.get("/api", (req, res) => {
//     res.json({ msg: "API funcionando" });
// });

export default server;
