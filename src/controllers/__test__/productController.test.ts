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

describe("GET /api/products/:id", () => {
    it("should return a 404 response for a non-existent product", async () => {
        const productId = 99;
        const response = await request(server).get(
            `/api/products/${productId}`
        );
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe(
            `No existe un producto con el id ${productId}`
        );
    });

    it("shold check a valid ID in the URL", async () => {
        const productId = "abc";
        const response = await request(server).get(
            `/api/products/${productId}`
        );
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("get a JSON response for a single product", async () => {
        const productId = 1;
        const response = await request(server).get(
            `/api/products/${productId}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toBeTruthy();
    });
});

describe("PUT /api/products/:id", () => {
    it("shold check a valid ID in the URL", async () => {
        const productId = "abc";
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor SAMSUNG 24 pulgadas ",
                price: 600,
                description: "Monitor S Gaming 120HZ 1ms ",
                availability: true,
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("should display validation error messages when updating a product", async () => {
        const productId = 1;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should validate that the price is greater than 0", async () => {
        const productId = 1;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor SAMSUNG 24 pulgadas ",
                price: -600,
                description: "Monitor S Gaming 120HZ 1ms ",
                availability: true,
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe(
            "El precio no puede ser menor o igual a 0"
        );

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should return a 404 response for a non-existent product", async () => {
        const productId = 200;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor SAMSUNG 24 pulgadas ",
                price: 600,
                description: "Monitor S Gaming 120HZ 1ms ",
                availability: true,
            });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("No existe un producto con el id 200");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should update an existing product with valid data", async () => {
        const productId = 1;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor SAMSUNG 24 pulgadas ",
                price: 600,
                description: "Monitor S Gaming 120HZ 1ms ",
                availability: true,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toBeTruthy();

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("DELET /api/products/:id", () => {
    it("shold check a valid ID in the URL", async () => {
        const productId = "abc";
        const response = await request(server).delete(
            `/api/products/${productId}`
        );
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
    });

    it("should return a 404 response for a non-existent product", async () => {
        const productId = 300;
        const response = await request(server).delete(
            `/api/products/${productId}`
        );
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe(
            `No existe un producto con el id ${productId}`
        );

        expect(response.status).not.toBe(200);
    });

    it("should delete a product", async () => {
        const productId = 1;
        const response = await request(server).delete(
            `/api/products/${productId}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("msg");
        expect(response.body.msg).toBe("Producto eliminado correctamente");

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("error");
    });
});
