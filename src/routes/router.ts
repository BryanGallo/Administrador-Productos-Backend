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
 *              description:
 *                  type: string
 *                  description: Description of the product
 *                  example: Monitor Gaming 120HZ 1ms
 *              availability:
 *                  type: boolean
 *                  description: The availability of the product
 *                  example: true
 *          required:
 *              - name
 *              - price
 *              - description
 *          example:
 *              id: 1
 *              name: Monitor Curvo LG 49 pulgadas
 *              price: 300
 *              description: Monitor Gaming 120HZ 1ms
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

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     description: Return a product by id (unique)
 *     parameters:
 *       - in: path
 *         name: id Product
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the product to retrive
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No existe el producto
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID no válido
 */

router.get(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
);

//*Recuerda en schema(linea 136) hay 2 opciones usar  $ref: '#/components/schemas/Product'
//*Lo que tomara la base del Schema creado al inicio para dar un ejemplo de properties(linea 158)
//* o como en este caso que no se usa y se indica las propiedades a enviar manualmente(linea 140 - 152) 
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Returns a new record in database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  description: The name of the product
 *                  example: "Monitor Curvo LG 49 pulgadas"
 *               price:
 *                  type: number
 *                  description: The price of the product
 *                  example: 300
 *               description:
 *                  type: string
 *                  description: Description of the product
 *                  example: "Monitor Gaming 120HZ 1ms"
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         oneOf:
 *                           - example: "El precio debe ser mayor a 0 o El nombre del producto no puede ir vacio "
 */

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

/** 
* @swagger
* /api/products/{id}:
*   put:
*     summary: Update a product with user input
*     tags: [Products]
*     description: Return the Updated product
*     parameters:
*       - in: path
*         name: id Product
*         schema:
*           type: integer
*         required: true
*         description: The id of the product to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Product'
*     responses:
*       200:
*         description: Successful response
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       msg:
*                         type: string
*                         oneOf:
*                           - example: "El precio debe ser mayor a 0 o El nombre del producto no puede ir vacio "
*       404:
*         description: Product not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: No existe el producto
*/

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

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update the availability of a product
 *     tags: [Products]
 *     description: Return the Updated product
 *     parameters:
 *       - in: path
 *         name: id Product
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 description: The availability of the product
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Valor no válido"
 *        404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No existe el producto
 */

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
