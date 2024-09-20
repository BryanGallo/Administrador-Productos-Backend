import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./routes/router";
import db from "./config/db";

export async function connectDB() {
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

//* Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        console.log(origin);

        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
};
//* Usamos use se ejecuta en todo tipo de peticion por ello lo usamos
server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));

server.use("/api/products", router);

//Documentation
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// server.get("/api", (req, res) => {
//     res.json({ msg: "API funcionando" });
// });

export default server;
