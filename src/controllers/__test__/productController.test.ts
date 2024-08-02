import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
    //?Probado Validacion
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    //?Probado EndPoint
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
