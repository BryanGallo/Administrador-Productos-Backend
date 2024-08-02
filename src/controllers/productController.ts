import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

const createProduct = async (req: Request, res: Response) => {
    console.log(req.body);

    const { name } = req.body;

    //*Forma 1 de insertar usando new
    const product = new Product(req.body);
    console.log(colors.magenta(`${product}`));
    const savedProduct = await product.save();
    res.status(200).json({
        msg: `Se creo el producto ${name} exitosamente`,
        data: savedProduct,
    });
};

export { createProduct };
