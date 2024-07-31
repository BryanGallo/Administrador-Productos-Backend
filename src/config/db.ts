import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
// Verificar que la variable de entorno se haya cargado correctamente
if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL no está definida en las variables de entorno"
    );
}

const db = new Sequelize(process.env.DATABASE_URL,{
    // para generar el modelo y las columnas __dirname(propio de nodejs)
    models: [__dirname + "/../models/**/*.ts"], // Ruta a los modelos de Sequelize
});

export default db;
