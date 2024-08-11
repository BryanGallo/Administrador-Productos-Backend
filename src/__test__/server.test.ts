//*esta disponible de forma global sin importar
// describe("Nuestro primer test", () => {
//     //? se puede usar it y test,cabe recalcar que it es un alias de test
//     it("Debe revisar que 1+1 seas 2", () => {
//         //?habilitado forma global
//         expect(1 + 1).toBe(2);
//     });
//     it("Deber revisar q 1 +1 no sea 3", () => {
//         expect(1 + 1).not.toBe(3);
//     });
// });

import request from "supertest";
import server from "../server";
import { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
    it("Should send back a json response", async () => {
        //? Codigo que debe cumplir
        const res = await request(server).get("/api");
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.msg).toBe("API funcionando");
        //Observar la cabecera
        console.log(res.headers);
        //obtener el contenido de body
        console.log(res.body);

        //? Codigo que no debe cumplirse
        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe("api funcionando");
    });
});

//Mock Tecnica para las pruebas para simular el comportamietno de ciertos modulos en este entorno

jest.mock("../config/db");

describe("ConnectDB", () => {
    it("Should connect to the database", async () => {
        // spyOn crea una funcion en el ambiente del mock
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(
            new Error("Error al conectar a la bdd")
        );
        const consoleSpy = jest.spyOn(console, "log");

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error al conectar a la BD"));
    });
});
