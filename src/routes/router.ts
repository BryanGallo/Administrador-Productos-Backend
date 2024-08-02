import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateAvailability,
} from "../controllers/productController";

const router = Router();

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
        .custom((value) => value >= 0)
        .withMessage("El precio no puede ser menor a 0")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacio"),
    handleInputErrors,
    createProduct
);

router.put(
    "/:id",
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric()
        .withMessage("Valor no válido")
        .custom((value) => value >= 0)
        .withMessage("El precio no puede ser menor a 0")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacio"),
    body("availability").isBoolean().withMessage("Valor no válido"),
    handleInputErrors,
    updateProduct
);

router.patch("/:id", updateAvailability);

export default router;
