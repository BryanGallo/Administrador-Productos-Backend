import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations realated to products.",
            },
        ],
        info: {
            title: "Products API Node.js - Express - Typescript",
            version: "1.0.0",
            description: "API for managing products.",
        },
    },
    // si tienes diferentes rutas 
    // apis: ["./src/routes/*.ts","./src/routes*"],
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
