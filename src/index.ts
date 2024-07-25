import server from "./server";

const port = 4000;

server.listen(port, () => {
    console.log(`Conexion por el puerto ${port}`);
});
