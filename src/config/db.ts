import { Sequelize } from "sequelize";

const db = new Sequelize(
    "postgresql://rest_api_node_typescript_bxyg_user:3dw609JR25LgYJxQBVvcw7wnvLtBSbKC@dpg-cqkrslogph6c738k9bg0-a.oregon-postgres.render.com/rest_api_node_typescript_bxyg?ssl=true",
    //segunda opcion para el error de conexion de bbd
    // {
    //     dialectOptions: {
    //         ssl: {
    //             require: false,
    //         },
    //     },
    // }
);

export default db;
