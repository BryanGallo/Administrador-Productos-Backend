import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";
import colors from "colors";

const createProduct = async (req: Request, res: Response) => {
    console.log(req.body);

    const { name } = req.body;

    //Validacion
    await check("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio")
        .run(req);

    await check("price")
        .isNumeric()
        .withMessage("Valor no válido")
        //*reglas personalizadas
        // .custom((value) => {
        //     //value es el valor que ingresamos
        //     if (value <= 0) {
        //         return false;
        //     }
        // })
        // .withMessage("El precio no puede ser menor a 0")
        //*con return implicito para reducir codigo
        .custom((value) => value <= 0)
        .withMessage("El precio no puede ser menor a 0")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacio")
        .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    //*Forma 1 de insertar usando new
    // const product = new Product(req.body);
    // console.log(colors.magenta(`${product}`));
    // const savedProduct = await product.save();
    // res.status(200).json({
    //     msg: `Se creo el producto ${name} exitosamente`,
    //     data: savedProduct,
    // });

    //*Forma 2 de insertar usando create
    const product = await Product.create(req.body);
    console.log(colors.magenta(`${product}`));

    res.status(200).json({
        msg: `Se creo el producto ${name} exitosamente`,
        data: product,
    });
};

export { createProduct };
