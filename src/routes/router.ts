import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createProduct } from "../controllers/productController";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola desde Get");
});

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
        .custom((value) => value <= 0)
        .withMessage("El precio no puede ser menor a 0")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacio"),
    handleInputErrors,
    createProduct
);

export default router;
