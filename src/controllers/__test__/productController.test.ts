import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
    //?Pruebas Validacion objeto vacio
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    //?Pruebas Validacion si envia un texto a diferencia de numero
    it("should validate that the price is a number and greather than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Testing",
            price: "Hola",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(200);
        expect(response.body.errors).not.toHaveLength(3);
    });

    //?Pruebas Validacion si envia 0 o menor
    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Testing",
            price: 0,
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body.errors).not.toHaveLength(2);
    });

    //?Pruebas EndPoint
    it("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Testing",
            price: 324.5,
            description: "Monito Gaming 120HZ 1ms ",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("error");
    });
});

describe("GET /api/products", () => {
    it("should chck if api/products url exists", async () => {
        const response = await request(server).get("/api/products");
        3;
        expect(response.status).not.toBe(404);
    });
    it("Get a JSON response with products", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.headers["content-type"]).not.toMatch(/text/);
        expect(response.body).not.toHaveProperty("errors");
        expect(response.body.data).not.toHaveLength(2);
    });
});