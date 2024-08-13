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
 *                  description: The auto-generated id of the product
 *              name:
 *                  type: string
 *                  description: The name of the product
 *              price:
 *                  type: number
 *                  description: The price of the product
 *              availability:
 *                  type: boolean
 *                  description: The availability of the product
 *          required:
 *              - name
 *              - price
 *          example:
 *              id: 1
 *              name: Product 1
 *              price: 100
 *              availability: true
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
