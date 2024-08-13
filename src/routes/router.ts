import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateAvailability,
    deleteProduct,
} from "../controllers/productController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product auto-generated id
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The name of the product
 *                  example: Monitor Curvo LG 49 pulgadas
 *              price:
 *                  type: number
 *                  description: The price of the product
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The availability of the product
 *                  example: true
 *          required:
 *              - name
 *              - price
 *          example:
 *              id: 1
 *              name: Monitor Curvo LG 49 pulgadas
 *              price: 300
 *              availability: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

router.get(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
);

// router.post("/", createProduct);

//Validacion con express-validator en el router
//Router no es asyncrono asi que no usamos check usamos body
router.post(
    "/",
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric()
        .withMessage("Valor no válido")
        .custom((value) => value > 0)
        .withMessage("El precio no puede ser menor o igual a 0")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacio"),
    handleInputErrors,
    createProduct
);

router.put(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric()
        .withMessage("Valor no válido")
        .custom((value) => value > 0)
        .withMessage("El precio no puede ser menor o igual a 0")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacio"),
    body("availability").isBoolean().withMessage("Valor no válido"),
    handleInputErrors,
    updateProduct
);

router.patch(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    updateAvailability
);

router.delete(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct
);

export default router;
